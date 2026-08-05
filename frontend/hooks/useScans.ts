'use client';

import { useState, useCallback } from 'react';
import { ScanResult } from '@/types/scan';
import { scanService } from '@/services/scanService';

export function useScans() {
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchScans = useCallback(async (page = 1, limit = 10, prediction?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await scanService.getScans(page, limit, prediction);

      console.log('SCANS API RESPONSE:', response);

      if (response.success) {
        setScans(response.data ?? []);
        setTotal(response.pagination?.total ?? 0);
      } else {
        setScans([]);
        setTotal(0);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch scans');
    } finally {
      setLoading(false);
    }
  }, []);

  const scanUrl = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await scanService.createScan(url);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to scan URL');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { scans, loading, error, total, fetchScans, scanUrl };
}
