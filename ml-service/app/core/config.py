from pydantic.v1 import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "WebGuard AI ML Service"
    ML_SERVICE_PORT: int = 8000
    MODEL_PATH: str = "models/trained/best_model.joblib"
    SCALER_PATH: str = "models/trained/scaler.joblib"
    FEATURE_NAMES_PATH: str = "models/trained/feature_names.json"
    MODEL_METADATA_PATH: str = "models/trained/model_metadata.json"

settings = Settings()
