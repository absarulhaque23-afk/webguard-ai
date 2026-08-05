'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { ScanResultDisplay } from '@/components/scan/ScanResult';
import { scanService } from '@/services/scanService';
import { ScanResult as IScanResult } from '@/types/scan';
import { Spinner } from '@/components/ui/Spinner';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ScanDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [result, setResult] = useState<IScanResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScan = async () => {
      try {
        const response = await scanService.getScanById(id);
        if (response.success) {
          setResult(response.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load scan details');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchScan();
    }
  }, [id]);

  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-gray-950">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Link href="/history" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to History
                </Link>
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <Spinner size="xl" />
                </div>
              ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl flex items-center text-red-400">
                  <AlertTriangle className="w-6 h-6 mr-3" />
                  {error}
                </div>
              ) : result ? (
                <ScanResultDisplay result={result} />
              ) : (
                <div className="text-center text-gray-500 py-20">Scan not found.</div>
              )}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
