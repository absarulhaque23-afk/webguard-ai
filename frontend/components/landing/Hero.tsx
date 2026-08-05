'use client';

import { motion } from 'framer-motion';
import { Shield, Scan, Zap, BarChart3, Lock } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 pt-20">
      {/* Animated cyber grid background */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
        }}
      />
      
      {/* Floating glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse z-0 pointer-events-none" />

      <motion.div 
        className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 border border-cyan-500/30 backdrop-blur-md">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <span className="text-cyan-400 text-sm font-medium tracking-wide">Next-Gen Threat Detection Engine is Live</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight max-w-4xl">
          AI-Powered <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Malicious Webpage Detection
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          Analyze URLs in real-time with our advanced machine learning models. We extract over 25 structural and semantic features to protect you from phishing, malware, and cyber threats before they strike.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-2">
            <Scan className="w-5 h-5" />
            Scan a URL
          </Link>
          <Link href="#how-it-works" className="px-8 py-4 rounded-xl bg-gray-900/50 border border-gray-700 text-white font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center backdrop-blur-sm">
            Learn How It Works
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full">
          <div className="flex items-center justify-center gap-3 bg-gray-900/40 border border-gray-800/50 p-4 rounded-2xl backdrop-blur-md">
            <div className="p-2 bg-blue-500/20 rounded-lg"><Scan className="w-6 h-6 text-blue-400" /></div>
            <span className="text-gray-300 font-medium">25+ Features Analyzed</span>
          </div>
          <div className="flex items-center justify-center gap-3 bg-gray-900/40 border border-gray-800/50 p-4 rounded-2xl backdrop-blur-md">
            <div className="p-2 bg-purple-500/20 rounded-lg"><Zap className="w-6 h-6 text-purple-400" /></div>
            <span className="text-gray-300 font-medium">3 ML Models</span>
          </div>
          <div className="flex items-center justify-center gap-3 bg-gray-900/40 border border-gray-800/50 p-4 rounded-2xl backdrop-blur-md">
            <div className="p-2 bg-cyan-500/20 rounded-lg"><BarChart3 className="w-6 h-6 text-cyan-400" /></div>
            <span className="text-gray-300 font-medium">Real-time Analysis</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
