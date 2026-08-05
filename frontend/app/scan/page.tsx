'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { ScanForm } from '@/components/scan/ScanForm';
import { ScanProgress } from '@/components/scan/ScanProgress';
import { ScanResultDisplay } from '@/components/scan/ScanResult';
import { useScans } from '@/hooks/useScans';
import { ScanResult as IScanResult } from '@/types/scan';

export default function ScanPage() {
  const { scanUrl, loading } = useScans();
  const [result, setResult] = useState<IScanResult | null>(null);

  const handleScan = async (url: string) => {
    setResult(null);
    try {
      const data = await scanUrl(url);
      // Add a small artificial delay so the progress animation plays out nicely
      setTimeout(() => {
        setResult(data);
      }, 3000);
    } catch (error) {
      // Error handled by hook, maybe show toast
    }
  };

  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-gray-950">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-12">
              
              {!result && !loading && (
                <div className="pt-12">
                  <ScanForm onScan={handleScan} isLoading={loading} />
                </div>
              )}

              {loading && (
                <div className="pt-20">
                  <ScanProgress />
                </div>
              )}

              {result && !loading && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                  <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">Scan Analysis Complete</h1>
                    <button 
                      onClick={() => setResult(null)}
                      className="text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors"
                    >
                      Scan Another URL
                    </button>
                  </div>
                  <ScanResultDisplay result={result} />
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
