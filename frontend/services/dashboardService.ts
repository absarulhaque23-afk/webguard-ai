import api from '@/lib/api';
import { DashboardStats } from '@/types/dashboard';

export const dashboardService = {
  getStats: async (): Promise<{ success: boolean; data: DashboardStats }> => {
    return api.get('/dashboard/stats');
  }
};
