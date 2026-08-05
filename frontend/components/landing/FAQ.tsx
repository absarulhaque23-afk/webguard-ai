'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How does WebGuard AI detect malicious URLs?',
    a: 'WebGuard AI extracts 25+ features from URL structure and analyzes them using machine learning models trained on thousands of samples. The system uses XGBoost, Random Forest, and Logistic Regression to classify URLs as Benign, Suspicious, or Malicious.'
  },
  {
    q: 'What machine learning models are used?',
    a: 'We compare three models — Logistic Regression, Random Forest, and XGBoost — using cross-validation and select the best performer based on F1 Score, Precision, Recall, and ROC-AUC metrics.'
  },
  {
    q: 'Is my submitted URL data stored?',
    a: 'Yes, scan results are stored in your account history so you can review past analyses. Your data is secured and only accessible to you.'
  },
  {
    q: 'Can WebGuard AI guarantee a URL is safe?',
    a: 'No. WebGuard AI provides AI-based predictions that are probabilistic in nature. The system can produce false positives and false negatives. Always exercise caution and use additional security measures.'
  },
  {
    q: 'What features does the ML model analyze?',
    a: 'The model analyzes URL length, hostname entropy, number of subdomains, presence of IP addresses, suspicious keywords, HTTPS usage, special characters, query parameters, and many more structural features.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-gray-950 relative z-10">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden"
            >
              <button 
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-white text-lg">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-cyan-500" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5 text-gray-400"
                  >
                    <p className="border-t border-gray-800 pt-4">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
