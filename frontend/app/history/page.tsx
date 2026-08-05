'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useScans } from '@/hooks/useScans';
import { formatDate, getPredictionColor, formatConfidence } from '@/lib/utils';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { Spinner } from '@/components/ui/Spinner';
import { ScanResult as IScanResult } from '@/types/scan';

export default function HistoryPage() {
  const { scans, loading, total, fetchScans } = useScans();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchScans(page, 10, filter);
  }, [page, filter, fetchScans]);

  const columns = [
    {
      header: 'URL',
      accessorKey: 'url',
      cell: (item: IScanResult) => (
        <div className="max-w-xs truncate" title={item.url}>{item.url}</div>
      )
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
      header: 'Risk Score',
      accessorKey: 'riskScore',
      cell: (item: IScanResult) => (
        <div className="font-medium">{item.riskScore}/100</div>
      )
    },
    {
      header: 'Confidence',
      accessorKey: 'confidence',
      cell: (item: IScanResult) => (
        <div>{formatConfidence(item.confidence)}</div>
      )
    },
    {
      header: 'Date',
      accessorKey: 'createdAt',
      cell: (item: IScanResult) => (
        <div className="text-gray-400">{formatDate(item.createdAt)}</div>
      )
    },
    {
      header: 'Action',
      accessorKey: '_id',
      cell: (item: IScanResult) => (
        <Link href={`/scan/${item._id}`}>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      )
    }
  ];

  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-gray-950">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Scan History</h1>
                  <p className="text-gray-400">View and manage your previous URL scans.</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <select 
                    className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5 outline-none"
                    value={filter}
                    onChange={(e) => { setFilter(e.target.value); setPage(1); }}
                  >
                    <option value="">All Predictions</option>
                    <option value="BENIGN">Benign</option>
                    <option value="SUSPICIOUS">Suspicious</option>
                    <option value="MALICIOUS">Malicious</option>
                  </select>
                </div>
              </div>

              {loading && (scans?.length ?? 0) === 0 ? (
                <div className="flex justify-center py-20"><Spinner /></div>
              ) : (
                <>
                  <DataTable data={scans ?? []} columns={columns} />
                  
                  {/* Basic Pagination Controls */}
                  <div className="flex justify-between items-center py-4 text-sm text-gray-400">
                    <div>Total: {total} scans</div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={page === 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                      >
                        Previous
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={(scans?.length ?? 0) < 10}
                        onClick={() => setPage(p => p + 1)}
                      >
                        Next
                      </Button>
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
