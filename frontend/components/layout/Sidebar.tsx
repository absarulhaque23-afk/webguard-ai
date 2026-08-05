'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Search, 
  History, 
  User, 
  Settings, 
  Users, 
  Database,
  BarChart
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { isAdmin } = useAuth();

  const userLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Scan URL', href: '/scan', icon: Search },
    { name: 'History', href: '/history', icon: History },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const adminLinks = [
    { name: 'Admin Console', href: '/admin', icon: Settings },
    { name: 'Manage Users', href: '/admin/users', icon: Users },
    { name: 'All Scans', href: '/admin/scans', icon: Database },
    { name: 'Model Metrics', href: '/admin/model', icon: BarChart },
  ];

  const NavItem = ({ item }: { item: { name: string; href: string; icon: React.ElementType } }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    return (
      <Link href={item.href}>
        <div className={cn(
          "flex items-center px-4 py-3 rounded-xl mb-2 transition-all duration-200 group",
          isActive 
            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
            : "text-gray-400 hover:bg-gray-800/50 hover:text-white border border-transparent"
        )}>
          <Icon className={cn(
            "h-5 w-5 mr-3 transition-colors",
            isActive ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300"
          )} />
          <span className="font-medium text-sm">{item.name}</span>
        </div>
      </Link>
    );
  };

  return (
    <aside className="w-64 flex-shrink-0 min-h-[calc(100vh-4rem)] border-r border-gray-800 bg-gray-950 p-4 hidden md:block">
      <div className="space-y-8">
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">
            Menu
          </h4>
          <nav>
            {userLinks.map((item) => <NavItem key={item.name} item={item} />)}
          </nav>
        </div>

        {isAdmin && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">
              Administration
            </h4>
            <nav>
              {adminLinks.map((item) => <NavItem key={item.name} item={item} />)}
            </nav>
          </div>
        )}
      </div>
    </aside>
  );
}
