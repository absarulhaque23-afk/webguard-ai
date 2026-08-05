'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { DataTable } from '@/components/ui/DataTable';
import { adminService } from '@/services/adminService';
import { User } from '@/types/auth';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await adminService.getUsers(page, 15);
        if (response.success) {
          setUsers(response.data.users);
          setTotal(response.data.total);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page]);

  const columns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    {
      header: 'Role',
      accessorKey: 'role',
      cell: (item: User) => (
        <Badge variant={item.role === 'ADMIN' ? 'warning' : 'default'}>
          {item.role}
        </Badge>
      )
    },
    {
      header: 'Joined',
      accessorKey: 'createdAt',
      cell: (item: User) => <span className="text-gray-400">{formatDate(item.createdAt)}</span>
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
              <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
              
              {loading && users.length === 0 ? (
                <div className="flex justify-center py-20"><Spinner /></div>
              ) : (
                <>
                  <DataTable data={users} columns={columns} />
                  <div className="flex justify-between items-center py-4 text-sm text-gray-400">
                    <div>Total Users: {total}</div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
                      <Button variant="outline" size="sm" disabled={users.length < 15} onClick={() => setPage(p => p + 1)}>Next</Button>
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
