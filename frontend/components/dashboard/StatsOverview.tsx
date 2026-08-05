'use client';

import { StatsCard } from '@/components/ui/StatsCard';
import { Shield, AlertTriangle, XCircle, CheckCircle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsOverviewProps {
  stats: {
    totalScans: number;
    benignCount: number;
    suspiciousCount: number;
    maliciousCount: number;
    averageRiskScore: number;
  };
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
    >
      <motion.div variants={item}>
        <StatsCard 
          title="Total Scans" 
          value={stats.totalScans} 
          icon={<Activity className="w-5 h-5 text-blue-400" />} 
        />
      </motion.div>
      <motion.div variants={item}>
        <StatsCard 
          title="Safe (Benign)" 
          value={stats.benignCount} 
          icon={<CheckCircle className="w-5 h-5 text-emerald-400" />} 
        />
      </motion.div>
      <motion.div variants={item}>
        <StatsCard 
          title="Suspicious" 
          value={stats.suspiciousCount} 
          icon={<AlertTriangle className="w-5 h-5 text-amber-400" />} 
        />
      </motion.div>
      <motion.div variants={item}>
        <StatsCard 
          title="Malicious" 
          value={stats.maliciousCount} 
          icon={<XCircle className="w-5 h-5 text-rose-400" />} 
        />
      </motion.div>
      <motion.div variants={item}>
        <StatsCard 
          title="Avg Risk Score" 
          value={Math.round(stats.averageRiskScore)} 
          icon={<Shield className="w-5 h-5 text-cyan-400" />} 
        />
      </motion.div>
    </motion.div>
  );
}
