import api from '@/lib/api';
import { AdminUserResponse, AdminAnalyticsResponse, ModelInfo } from '@/types/admin';
import { PaginatedScans } from '@/types/scan';

export const adminService = {
  getUsers: async (page = 1, limit = 10): Promise<AdminUserResponse> => {
    return api.get(`/admin/users?page=${page}&limit=${limit}`);
  },

  getAllScans: async (page = 1, limit = 10, filters?: Record<string, string>): Promise<PaginatedScans> => {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    return api.get(`/admin/scans?${params.toString()}`);
  },

  getModelInfo: async (): Promise<{ success: boolean; data: ModelInfo }> => {
    return api.get('/admin/model');
  },

  getAnalytics: async (): Promise<AdminAnalyticsResponse> => {
    return api.get('/admin/analytics');
  }
};
