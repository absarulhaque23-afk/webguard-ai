'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/Card';
import { User, Mail, Calendar, Shield } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-gray-950">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-3xl font-bold text-white mb-6">Your Profile</h1>
              
              <Card className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center border-4 border-gray-700 shadow-xl">
                    <User className="w-16 h-16 text-gray-500" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-6 w-full">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                    <div className="flex items-center text-gray-400">
                      <Mail className="w-4 h-4 mr-2" />
                      {user.email}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                      <div className="flex items-center text-sm text-gray-400 mb-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        Member Since
                      </div>
                      <div className="font-medium text-white">{formatDate(user.createdAt)}</div>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                      <div className="flex items-center text-sm text-gray-400 mb-1">
                        <Shield className="w-4 h-4 mr-2" />
                        Role
                      </div>
                      <div className="font-medium">
                        <Badge variant={user.role === 'ADMIN' ? 'warning' : 'info'}>
                          {user.role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
