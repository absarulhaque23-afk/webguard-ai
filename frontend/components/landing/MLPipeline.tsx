'use client';

import { motion } from 'framer-motion';
import { Database, Wrench, FlaskConical, Trophy, Rocket } from 'lucide-react';

export function MLPipeline() {
  const stages = [
    { icon: <Database className="w-5 h-5" />, title: 'Dataset', desc: '10,000+ synthetic URL samples' },
    { icon: <Wrench className="w-5 h-5" />, title: 'Feature Engineering', desc: '25 security features extracted' },
    { icon: <FlaskConical className="w-5 h-5" />, title: 'Model Training', desc: '3 models with cross-validation', highlight: true },
    { icon: <Trophy className="w-5 h-5" />, title: 'Evaluation', desc: 'F1 Score, ROC-AUC, Precision, Recall' },
    { icon: <Rocket className="w-5 h-5" />, title: 'Deployment', desc: 'FastAPI prediction service' },
  ];

  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            ML Pipeline Architecture
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            A transparent look at how our machine learning models are trained and deployed.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 lg:gap-2 max-w-6xl mx-auto">
          {stages.map((stage, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="flex-1 flex flex-col"
            >
              <div className={`h-full flex flex-col items-center text-center p-6 bg-gray-900/50 backdrop-blur-xl border ${stage.highlight ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.15)]' : 'border-gray-800'} rounded-2xl relative z-10`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${stage.highlight ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-300'}`}>
                  {stage.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{stage.title}</h3>
                <p className="text-sm text-gray-400">{stage.desc}</p>
                
                {stage.highlight && (
                  <div className="mt-4 flex flex-col gap-2 w-full">
                    <span className="text-xs font-semibold bg-gray-800 text-cyan-300 py-1 px-2 rounded">Logistic Regression</span>
                    <span className="text-xs font-semibold bg-gray-800 text-cyan-300 py-1 px-2 rounded">Random Forest</span>
                    <span className="text-xs font-semibold bg-gray-800 text-cyan-300 py-1 px-2 rounded">XGBoost</span>
                  </div>
                )}
              </div>
              
              {idx < stages.length - 1 && (
                <div className="hidden lg:flex flex-1 items-center justify-center -mx-4 z-0">
                  <div className="h-0.5 w-8 bg-gray-700 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-700"></div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
