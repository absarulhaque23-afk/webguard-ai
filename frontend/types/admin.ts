import { User } from './auth';
import { ScanResult } from './scan';
import { DashboardStats } from './dashboard';

export interface AdminUserResponse {
  success: boolean;
  data: {
    users: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AdminAnalyticsResponse {
  success: boolean;
  data: DashboardStats & { totalUsers: number };
}

export interface ModelInfo {
  algorithm: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  confusionMatrix: number[][];
  trainingDate: string;
  featuresCount: number;
}
