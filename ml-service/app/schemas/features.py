from pydantic import BaseModel
from typing import Dict

class FeatureExtractionResponse(BaseModel):
    features: Dict[str, float]
