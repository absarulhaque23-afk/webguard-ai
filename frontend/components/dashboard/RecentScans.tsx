'use client';

import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { formatDate, truncateUrl } from '@/lib/utils';
import type { ScanResult } from '@/types/scan';

interface RecentScansProps {
  scans: ScanResult[];
}

export function RecentScans({ scans }: RecentScansProps) {
  if (!scans || scans.length === 0) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl text-center">
        <h3 className="text-lg font-semibold text-white mb-4 text-left">Recent Scans</h3>
        <p className="text-gray-400 py-8">No scans yet. Start by scanning a URL.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl">
      <h3 className="text-lg font-semibold text-white mb-6">Recent Scans</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-sm">
              <th className="pb-3 font-medium">URL</th>
              <th className="pb-3 font-medium">Prediction</th>
              <th className="pb-3 font-medium">Risk Score</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {scans.slice(0, 5).map((scan, idx) => (
              <motion.tr 
                key={scan._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors"
              >
                <td className="py-4 text-gray-300 font-medium">{truncateUrl(scan.url, 40)}</td>
                <td className="py-4">
                  <Badge 
                    variant={scan.prediction === 'BENIGN' ? 'success' : scan.prediction === 'SUSPICIOUS' ? 'warning' : 'destructive'}
                  >
                    {scan.prediction}
                  </Badge>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${scan.riskScore < 30 ? 'bg-emerald-500' : scan.riskScore < 70 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        style={{ width: `${scan.riskScore}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400">{Math.round(scan.riskScore)}</span>
                  </div>
                </td>
                <td className="py-4 text-sm text-gray-400">{formatDate(scan.createdAt)}</td>
                <td className="py-4 text-right">
                  <Link href={`/scan/${scan._id}`} className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors">
                    <Eye className="w-4 h-4" />
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
