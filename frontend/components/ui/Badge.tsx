'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface BadgeProps extends HTMLMotionProps<"div"> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'info';
  pulse?: boolean;
  children?: React.ReactNode;
}

export function Badge({ className, variant = 'default', pulse, children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-gray-800 text-gray-300 border-gray-700',
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    destructive: 'bg-red-500/10 text-red-500 border-red-500/20',
    info: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20'
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        pulse && 'animate-pulse-glow',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
