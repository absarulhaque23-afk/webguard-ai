'use client';

import { useEffect } from 'react';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { ScanChart } from '@/components/dashboard/ScanChart';
import { RiskDistribution } from '@/components/dashboard/RiskDistribution';
import { RecentScans } from '@/components/dashboard/RecentScans';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Spinner } from '@/components/ui/Spinner';
import { useDashboard } from '@/hooks/useDashboard';
import { useScans } from '@/hooks/useScans';

export default function DashboardPage() {
  const { stats, loading: statsLoading, error: statsError, fetchStats } = useDashboard();
  const { scans, loading: scansLoading, error: scansError, fetchScans } = useScans();

  useEffect(() => {
    fetchStats();
    fetchScans(1, 5);
  }, [fetchStats, fetchScans]);

  const loading = statsLoading || scansLoading;
  const error = statsError || scansError;

  // Derive chart data from stats
  const chartData = stats?.scansOverTime || [];
  const riskData = stats
    ? {
        benign: stats.benignCount,
        suspicious: stats.suspiciousCount,
        malicious: stats.maliciousCount,
      }
    : { benign: 0, suspicious: 0, malicious: 0 };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <Navbar />
        <div className="flex flex-1 pt-16">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-8 ml-0 lg:ml-64 transition-all overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Spinner />
                </div>
              ) : error ? (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl">
                  {error}
                </div>
              ) : (
                <>
                  {stats && <StatsOverview stats={stats} />}

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <ScanChart data={chartData} />
                    </div>
                    <div className="lg:col-span-1">
                      <RiskDistribution data={riskData} />
                    </div>
                  </div>

                  <RecentScans scans={scans} />
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
