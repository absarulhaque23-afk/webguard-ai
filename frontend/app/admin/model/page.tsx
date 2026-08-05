'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { adminService } from '@/services/adminService';
import { ModelInfo } from '@/types/admin';
import { Spinner } from '@/components/ui/Spinner';
import { Card } from '@/components/ui/Card';
import { Server, Activity, FileText } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminModelPage() {
  const [model, setModel] = useState<ModelInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await adminService.getModelInfo();
        if (response.success) setModel(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchModel();
  }, []);

  return (
    <AuthGuard adminOnly>
      <div className="flex min-h-screen flex-col bg-gray-950">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-6">
              <h1 className="text-3xl font-bold text-white mb-2">Model Metrics</h1>
              
              {loading ? (
                <div className="flex justify-center py-20"><Spinner /></div>
              ) : model ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Server className="mr-2 h-5 w-5 text-cyan-500" />
                      Model Details
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between border-b border-gray-800 pb-2">
                        <span className="text-gray-400">Algorithm</span>
                        <span className="font-medium">{model.algorithm}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-800 pb-2">
                        <span className="text-gray-400">Last Trained</span>
                        <span className="font-medium">{formatDate(model.trainingDate)}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-800 pb-2">
                        <span className="text-gray-400">Features Count</span>
                        <span className="font-medium">{model.featuresCount}</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Activity className="mr-2 h-5 w-5 text-emerald-500" />
                      Performance Metrics
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between border-b border-gray-800 pb-2">
                        <span className="text-gray-400">Accuracy</span>
                        <span className="font-medium text-emerald-400">{(model.accuracy * 100).toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-800 pb-2">
                        <span className="text-gray-400">Precision</span>
                        <span className="font-medium">{(model.precision * 100).toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-800 pb-2">
                        <span className="text-gray-400">Recall</span>
                        <span className="font-medium">{(model.recall * 100).toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-800 pb-2">
                        <span className="text-gray-400">F1 Score</span>
                        <span className="font-medium">{(model.f1Score * 100).toFixed(2)}%</span>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : (
                <div className="text-gray-500">Model data not available.</div>
              )}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
