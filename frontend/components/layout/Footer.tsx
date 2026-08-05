import React from 'react';
import Link from 'next/link';
import { Shield, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-cyan-500" />
              <span className="text-lg font-bold text-white">WebGuard AI</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              Advanced machine learning platform for detecting malicious webpages, phishing attacks, and suspicious URLs in real-time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/how-it-works" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">How it Works</Link></li>
              <li><Link href="/scan" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Scan URL</Link></li>
              <li><Link href="/dashboard" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} WebGuard AI. All rights reserved.
          </p>
          <div className="text-xs text-amber-500/80 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
            Disclaimer: AI predictions are not definitive security verdicts.
          </div>
        </div>
      </div>
    </footer>
  );
}
