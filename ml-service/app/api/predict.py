from fastapi import APIRouter, HTTPException, Depends
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.schemas.features import FeatureExtractionResponse
from features.url_features import URLFeatureExtractor
from features.feature_names import FEATURE_NAMES
from app.core.config import settings
import joblib
import os
import numpy as np

router = APIRouter()
extractor = URLFeatureExtractor()

# Global model variables
model = None
scaler = None
metadata = None

def get_models():
    global model, scaler, metadata
    if model is None:
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        model_path = os.path.join(base_dir, settings.MODEL_PATH)
        scaler_path = os.path.join(base_dir, settings.SCALER_PATH)
        meta_path = os.path.join(base_dir, settings.MODEL_METADATA_PATH)
        
        if not os.path.exists(model_path):
            raise HTTPException(status_code=503, detail="Model not trained yet")
            
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        
        import json
        if os.path.exists(meta_path):
            with open(meta_path, 'r') as f:
                metadata = json.load(f)
        else:
            metadata = {'training_date': 'unknown'}
            
    return model, scaler, metadata

def calculate_risk_level(score: int) -> str:
    if score <= 30:
        return "LOW"
    elif score <= 60:
        return "MEDIUM"
    elif score <= 80:
        return "HIGH"
    else:
        return "CRITICAL"

def generate_reasons(features: dict) -> list:
    reasons = []
    if features.get('url_length', 0) > 75:
        reasons.append("Unusually long URL detected")
    if features.get('has_ip_address', 0) == 1:
        reasons.append("IP address used instead of domain name")
    if features.get('has_suspicious_keywords', 0) == 1:
        reasons.append("Suspicious keywords detected in URL")
    if features.get('num_subdomains', 0) > 3:
        reasons.append("Excessive number of subdomains")
    if features.get('has_at_symbol', 0) == 1:
        reasons.append("@ symbol detected in URL (potential redirect trick)")
    if features.get('suspicious_tld', 0) == 1:
        reasons.append("Suspicious top-level domain")
    if features.get('is_https', 1) == 0:
        reasons.append("URL does not use HTTPS encryption")
    if features.get('num_encoded_chars', 0) > 3:
        reasons.append("Multiple encoded characters detected")
    if features.get('hostname_entropy', 0) > 4.0:
        reasons.append("High entropy in hostname (randomized characters)")
    if features.get('is_shortened_url', 0) == 1:
        reasons.append("URL shortening service detected")
    return reasons

@router.post("/extract-features", response_model=FeatureExtractionResponse)
def extract_features_api(req: PredictionRequest):
    features = extractor.extract(req.url)
    return FeatureExtractionResponse(features=features)

@router.post("/predict", response_model=PredictionResponse)
def predict_api(req: PredictionRequest):
    m, s, meta = get_models()
    
    features = extractor.extract(req.url)
    feature_vector = [features.get(f, 0.0) for f in FEATURE_NAMES]
    
    # Scale
    X_scaled = s.transform([feature_vector])
    
    # Predict
    pred_class = m.predict(X_scaled)[0] # 0, 1, 2
    probs = m.predict_proba(X_scaled)[0]
    
    if pred_class == 0:
        prediction = "BENIGN"
        confidence = probs[0]
        riskScore = int((1 - confidence) * 30)
    elif pred_class == 1:
        prediction = "SUSPICIOUS"
        confidence = probs[1]
        riskScore = 31 + int(probs[1] * 29) + int(probs[2] * 40)
        if riskScore > 60: riskScore = 60
    else:
        prediction = "MALICIOUS"
        confidence = probs[2]
        riskScore = 61 + int(probs[2] * 39)
        if riskScore > 100: riskScore = 100
        
    riskLevel = calculate_risk_level(riskScore)
    reasons = generate_reasons(features)
    
    # Feature Importance
    feature_importance = {}
    if hasattr(m, 'feature_importances_'):
        importances = m.feature_importances_
        for idx, imp in enumerate(importances):
            feature_importance[FEATURE_NAMES[idx]] = float(imp)
    elif hasattr(m, 'coef_'):
        importances = m.coef_[0]
        for idx, imp in enumerate(importances):
            feature_importance[FEATURE_NAMES[idx]] = float(abs(imp))
            
    return PredictionResponse(
        prediction=prediction,
        riskScore=riskScore,
        confidence=float(confidence),
        riskLevel=riskLevel,
        reasons=reasons,
        features=features,
        featureImportance=feature_importance,
        modelVersion=meta.get('training_date', 'unknown'),
        disclaimer="Predictions are based on a machine learning model and may not be 100% accurate."
    )
