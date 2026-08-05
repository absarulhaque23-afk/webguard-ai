'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { StatsCard } from '@/components/ui/StatsCard';
import { adminService } from '@/services/adminService';
import { DashboardStats } from '@/types/dashboard';
import { Users, Database, ShieldAlert, Activity } from 'lucide-react';
import { Spinner } from '@/components/ui/Spinner';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<(DashboardStats & { totalUsers: number }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await adminService.getAnalytics();
        if (response.success) setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch admin stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <AuthGuard adminOnly>
      <div className="flex min-h-screen flex-col bg-gray-950">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Admin Console</h1>
                <p className="text-gray-400">System-wide overview and management.</p>
              </div>

              {loading ? (
                <div className="flex justify-center py-20"><Spinner size="xl" /></div>
              ) : stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatsCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={<Users className="h-5 w-5" />}
                  />
                  <StatsCard
                    title="System Total Scans"
                    value={stats.totalScans}
                    icon={<Database className="h-5 w-5" />}
                  />
                  <StatsCard
                    title="Global Malicious Hits"
                    value={stats.maliciousCount}
                    icon={<ShieldAlert className="h-5 w-5" />}
                    className="border-red-500/20"
                  />
                  <StatsCard
                    title="Avg System Risk"
                    value={stats.averageRiskScore}
                    icon={<Activity className="h-5 w-5" />}
                  />
                </div>
              ) : (
                <div className="text-gray-500">No data available</div>
              )}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
