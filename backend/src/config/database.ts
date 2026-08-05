import mongoose from 'mongoose';
import { config } from './environment';
import { logger } from '../utils/logger';

export const connectDB = async (retries = 3, delay = 5000): Promise<void> => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(config.MONGODB_URI);
      logger.info('Successfully connected to MongoDB');
      return;
    } catch (error) {
      logger.error(`MongoDB connection attempt ${i + 1} failed:`, error);
      if (i < retries - 1) {
        logger.info(`Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  logger.error('Failed to connect to MongoDB after maximum retries. Exiting...');
  process.exit(1);
};
