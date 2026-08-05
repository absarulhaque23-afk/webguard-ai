import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950">
      <Navbar />
      <main className="flex-1 p-6 lg:p-12 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">How WebGuard AI Works</h1>
        
        <div className="grid gap-8">
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-semibold text-cyan-400 mb-4">1. URL Analysis</h3>
            <p className="text-gray-400">When a URL is submitted, we break it down into its constituent parts (protocol, domain, path, query). We look for suspicious patterns like IP address usage, excessive subdomains, or misleading characters.</p>
          </div>
          
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">2. Feature Extraction</h3>
            <p className="text-gray-400">Our engine extracts over 25 distinct features, including lexical properties, statistical metrics, and host-based indicators. We also safely fetch webpage headers to analyze content types and redirection chains without rendering malicious JavaScript.</p>
          </div>
          
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-semibold text-emerald-400 mb-4">3. ML Classification</h3>
            <p className="text-gray-400">The extracted feature vector is fed into an optimized XGBoost ensemble model. The model has been trained on hundreds of thousands of verified benign and malicious URLs to accurately classify unseen threats with high confidence.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
