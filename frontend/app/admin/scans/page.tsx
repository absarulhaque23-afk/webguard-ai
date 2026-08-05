'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { DataTable } from '@/components/ui/DataTable';
import { adminService } from '@/services/adminService';
import { ScanResult as IScanResult } from '@/types/scan';
import { Badge } from '@/components/ui/Badge';
import { formatDate, getPredictionColor, getRiskColor } from '@/lib/utils';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';

export default function AdminScansPage() {
  const [scans, setScans] = useState<IScanResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchScans = async () => {
      setLoading(true);
      try {
        const response = await adminService.getAllScans(page, 15);
        if (response.success) {
          setScans(response.data.scans);
          setTotal(response.data.total);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchScans();
  }, [page]);

  const columns = [
    { 
      header: 'URL', 
      accessorKey: 'url',
      cell: (item: IScanResult) => <div className="max-w-[200px] truncate" title={item.url}>{item.url}</div>
    },
    { 
      header: 'User ID', 
      accessorKey: 'userId',
      cell: (item: IScanResult) => <div className="text-xs text-gray-500 font-mono">{item.userId.substring(0, 8)}...</div>
    },
    {
      header: 'Prediction',
      accessorKey: 'prediction',
      cell: (item: IScanResult) => (
        <Badge className={getPredictionColor(item.prediction)}>
          {item.prediction}
        </Badge>
      )
    },
    {
      header: 'Risk',
      accessorKey: 'riskLevel',
      cell: (item: IScanResult) => (
        <Badge className={getRiskColor(item.riskLevel)}>
          {item.riskLevel} ({item.riskScore})
        </Badge>
      )
    },
    {
      header: 'Date',
      accessorKey: 'createdAt',
      cell: (item: IScanResult) => <span className="text-gray-400 text-xs">{formatDate(item.createdAt)}</span>
    }
  ];

  return (
    <AuthGuard adminOnly>
      <div className="flex min-h-screen flex-col bg-gray-950">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-6">
              <h1 className="text-3xl font-bold text-white mb-2">System Wide Scans</h1>
              
              {loading && scans.length === 0 ? (
                <div className="flex justify-center py-20"><Spinner /></div>
              ) : (
                <>
                  <DataTable data={scans} columns={columns} />
                  <div className="flex justify-between items-center py-4 text-sm text-gray-400">
                    <div>Total Scans: {total}</div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
                      <Button variant="outline" size="sm" disabled={scans.length < 15} onClick={() => setPage(p => p + 1)}>Next</Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
