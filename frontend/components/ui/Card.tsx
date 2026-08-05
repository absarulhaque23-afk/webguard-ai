'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: 'default' | 'bordered' | 'highlighted';
  children?: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-900/50 backdrop-blur-xl border-gray-800',
      bordered: 'bg-gray-900/30 backdrop-blur-md border-gray-700',
      highlighted: 'bg-gradient-to-b from-gray-900/80 to-gray-900/40 backdrop-blur-xl border-cyan-500/30 shadow-lg shadow-cyan-500/10'
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          'rounded-2xl border p-6',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';
