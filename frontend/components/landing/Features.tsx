'use client';

import { motion } from 'framer-motion';
import { Search, Brain, ShieldCheck, BarChart3, Eye, TrendingUp } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Search className="w-6 h-6 text-cyan-400" />,
      bg: 'bg-cyan-500/20',
      title: 'Deep URL Analysis',
      desc: 'Comprehensive analysis of URL structure, domain patterns, and 25+ security indicators'
    },
    {
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      bg: 'bg-purple-500/20',
      title: 'ML-Powered Detection',
      desc: 'XGBoost, Random Forest, and Logistic Regression models trained on thousands of samples'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
      bg: 'bg-green-500/20',
      title: 'Safe Webpage Analysis',
      desc: 'Controlled HTTP analysis without executing untrusted JavaScript code'
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
      bg: 'bg-blue-500/20',
      title: 'Risk Scoring Engine',
      desc: 'Comprehensive 0-100 risk score with confidence metrics and threat level classification'
    },
    {
      icon: <Eye className="w-6 h-6 text-amber-400" />,
      bg: 'bg-amber-500/20',
      title: 'Explainable AI',
      desc: 'Transparent predictions with feature importance and human-readable explanations'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-rose-400" />,
      bg: 'bg-rose-500/20',
      title: 'Analytics Dashboard',
      desc: 'Track scan history, monitor threat trends, and visualize security insights'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="features" className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Powerful Security Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Equipped with state-of-the-art tools to dissect, analyze, and neutralize web-based threats in real-time.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feat, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 transition-all hover:border-cyan-500/50 group"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feat.bg} group-hover:scale-110 transition-transform duration-300`}>
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
