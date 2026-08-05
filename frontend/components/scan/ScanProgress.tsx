'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

const steps = [
  'Validating URL structure',
  'Extracting lexical features',
  'Analyzing webpage content',
  'Running ML classification model',
  'Generating risk assessment'
];

export function ScanProgress() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Simulate step progression for better UX during loading
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1500); // Advance step every 1.5s roughly

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-gray-900/50 rounded-2xl border border-gray-800 backdrop-blur-sm">
      <h3 className="text-lg font-medium text-white mb-6 text-center animate-pulse">
        Analyzing Target URL...
      </h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isComplete = index < activeStep;
          const isActive = index === activeStep;
          const isPending = index > activeStep;

          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isPending ? 0.4 : 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                {isComplete ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 text-cyan-500 animate-spin" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-700" />
                )}
              </div>
              <span className={`text-sm font-medium ${isActive ? 'text-cyan-400' : isComplete ? 'text-gray-300' : 'text-gray-600'}`}>
                {step}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
