import pytest
from fastapi.testclient import TestClient
import sys
import os
from unittest.mock import patch, MagicMock

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app.main import app

client = TestClient(app)

@patch('app.api.predict.get_models')
def test_predict_benign(mock_get_models):
    # Mock model
    mock_model = MagicMock()
    mock_model.predict.return_value = [0]
    mock_model.predict_proba.return_value = [[0.9, 0.05, 0.05]]
    mock_model.feature_importances_ = [0.1] * 25
    
    # Mock scaler
    mock_scaler = MagicMock()
    mock_scaler.transform.return_value = [[0] * 25]
    
    # Mock metadata
    mock_meta = {'training_date': '2023-01-01'}
    
    mock_get_models.return_value = (mock_model, mock_scaler, mock_meta)
    
    response = client.post("/predict", json={"url": "https://google.com"})
    assert response.status_code == 200
    data = response.json()
    
    assert data['prediction'] == "BENIGN"
    assert data['riskLevel'] == "LOW"
    assert data['confidence'] == 0.9
    assert 'features' in data
    assert 'featureImportance' in data
