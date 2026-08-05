from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class PredictionRequest(BaseModel):
    url: str

class FeatureResponse(BaseModel):
    features: Dict[str, float]

class PredictionResponse(BaseModel):
    prediction: str
    riskScore: int = Field(ge=0, le=100)
    confidence: float = Field(ge=0.0, le=1.0)
    riskLevel: str
    reasons: List[str]
    features: Dict[str, float]
    featureImportance: Dict[str, float]
    modelVersion: str
    disclaimer: str
