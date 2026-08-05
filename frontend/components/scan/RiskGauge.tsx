'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface RiskGaugeProps {
  score: number; // 0 to 100
  size?: number;
}

export function RiskGauge({ score, size = 160 }: RiskGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    let current = 0;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = score / steps;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [score]);

  // Determine color based on score
  let color = '#10b981'; // emerald-500
  let glowColor = 'rgba(16, 185, 129, 0.4)';
  if (score > 30) { color = '#f59e0b'; glowColor = 'rgba(245, 158, 11, 0.4)'; } // amber
  if (score > 60) { color = '#f97316'; glowColor = 'rgba(249, 115, 22, 0.4)'; } // orange
  if (score > 80) { color = '#ef4444'; glowColor = 'rgba(239, 68, 68, 0.4)'; } // red

  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Arc setup (3/4 of a circle)
  const arcLength = circumference * 0.75;
  const offset = circumference - (animatedScore / 100) * arcLength;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-[135deg]">
        {/* Background Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1e293b" // slate-800
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />
        {/* Progress Arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center mt-2">
        <span className="text-4xl font-bold text-white tracking-tighter" style={{ textShadow: `0 0 10px ${glowColor}` }}>
          {animatedScore}
        </span>
        <span className="text-xs text-gray-500 uppercase font-medium mt-1">/ 100</span>
      </div>
    </div>
  );
}
