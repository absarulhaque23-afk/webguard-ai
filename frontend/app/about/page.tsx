import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950">
      <Navbar />
      <main className="flex-1 p-6 lg:p-12 max-w-4xl mx-auto text-gray-300">
        <h1 className="text-4xl font-bold text-white mb-8">About WebGuard AI</h1>
        
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            WebGuard AI is a cutting-edge cybersecurity platform designed to protect users from malicious webpages, phishing attacks, and deceptive URLs using advanced machine learning.
          </p>
          <p>
            By combining static code analysis, structural URL feature extraction, and high-performance ML models like XGBoost, we provide near-instantaneous risk assessments without needing to execute untrusted code on your machine.
          </p>
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Our Mission</h2>
          <p>
            To democratize access to enterprise-grade web threat intelligence. We believe that everyone should be able to safely browse the internet without falling victim to sophisticated phishing campaigns.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
