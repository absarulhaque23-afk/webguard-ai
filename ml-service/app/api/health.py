from fastapi import APIRouter
import json
import os
from app.core.config import settings

router = APIRouter()

@router.get("/health")
def health_check():
    status = "healthy"
    version = "unknown"
    features_count = 0
    
    try:
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        meta_path = os.path.join(base_dir, settings.MODEL_METADATA_PATH)
        if os.path.exists(meta_path):
            with open(meta_path, 'r') as f:
                metadata = json.load(f)
                version = metadata.get('training_date', 'unknown')
        
        feature_names_path = os.path.join(base_dir, settings.FEATURE_NAMES_PATH)
        if os.path.exists(feature_names_path):
            with open(feature_names_path, 'r') as f:
                features_count = len(json.load(f))
                
    except Exception as e:
        status = f"unhealthy: {str(e)}"
        
    return {
        "status": status,
        "modelVersion": version,
        "featuresCount": features_count
    }
