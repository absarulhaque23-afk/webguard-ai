'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { Card } from '@/components/ui/Card';

export default function AdminAnalyticsPage() {
  return (
    <AuthGuard adminOnly>
      <div className="flex min-h-screen flex-col bg-gray-950">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-6">
              <h1 className="text-3xl font-bold text-white mb-2">Advanced Analytics</h1>
              <Card className="h-96 flex items-center justify-center">
                <p className="text-gray-500">Analytics visualization coming soon.</p>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
