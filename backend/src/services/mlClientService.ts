import axios from 'axios';
import { config } from '../config/environment';
import { logger } from '../utils/logger';
import { AppError } from '../middlewares/errorHandler';

const apiClient = axios.create({
  baseURL: config.ML_SERVICE_URL,
  timeout: 10000,
});

export const predict = async (url: string) => {
  try {
    const response = await apiClient.post('/predict', { url });
    return response.data;
  } catch (error: any) {
    logger.error('ML Service predict error:', error.message);
    throw new AppError('Failed to analyze URL with ML service', 503);
  }
};

export const extractFeatures = async (url: string) => {
  try {
    const response = await apiClient.post('/extract-features', { url });
    return response.data;
  } catch (error: any) {
    logger.error('ML Service extract-features error:', error.message);
    throw new AppError('Failed to extract features', 503);
  }
};

export const healthCheck = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error: any) {
    logger.error('ML Service health check failed:', error.message);
    return { status: 'down', error: error.message };
  }
};
