'use client';

import { motion } from 'framer-motion';
import { Link2, Cpu, Shield, BarChart } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Link2 className="w-6 h-6 text-white" />,
      title: 'Submit URL',
      desc: 'Enter any suspicious URL you want to analyze',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      icon: <Cpu className="w-6 h-6 text-white" />,
      title: 'Feature Extraction',
      desc: '25+ security features are extracted from the URL structure',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: 'ML Analysis',
      desc: 'Multiple ML models analyze the features for threat patterns',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: <BarChart className="w-6 h-6 text-white" />,
      title: 'Risk Assessment',
      desc: 'Get a detailed risk score, prediction, and safety recommendations',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-950 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Our intelligent pipeline breaks down and analyzes threats in milliseconds.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 border-t-2 border-dashed border-gray-700 z-0" />
          
          {/* Connecting Line (Mobile) */}
          <div className="block md:hidden absolute left-8 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-gray-700 z-0" />

          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="flex flex-row md:flex-col items-center md:text-center gap-6 md:gap-4 flex-1"
              >
                <div className={`w-16 h-16 shrink-0 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg relative`}>
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-xs font-bold text-white">
                    {idx + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
