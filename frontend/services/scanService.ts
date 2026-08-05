import api from '@/lib/api';
import { ScanRequest, ScanResult, PaginatedScans } from '@/types/scan';

export const scanService = {
  createScan: async (url: string): Promise<{ success: boolean; data: ScanResult }> => {
    return api.post('/scans', { url } as ScanRequest);
  },

  getScans: async (page = 1, limit = 10, prediction?: string): Promise<PaginatedScans> => {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    if (prediction) params.append('prediction', prediction);
    return api.get(`/scans?${params.toString()}`);
  },

  getScanById: async (id: string): Promise<{ success: boolean; data: ScanResult }> => {
    return api.get(`/scans/${id}`);
  },

  deleteScan: async (id: string): Promise<{ success: boolean }> => {
    return api.delete(`/scans/${id}`);
  }
};
