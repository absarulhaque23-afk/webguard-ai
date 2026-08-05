'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScanResult as IScanResult } from '@/types/scan';
import { getPredictionColor, getRiskColor, formatConfidence } from '@/lib/utils';
import { ShieldAlert, ShieldCheck, AlertTriangle, ExternalLink, Clock, Server } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { RiskGauge } from './RiskGauge';

interface ScanResultProps {
  result: IScanResult;
}

export function ScanResultDisplay({ result }: ScanResultProps) {
  const isMalicious = result.prediction === 'MALICIOUS';
  const isSuspicious = result.prediction === 'SUSPICIOUS';
  const isBenign = result.prediction === 'BENIGN';

  const MainIcon = isBenign ? ShieldCheck : isSuspicious ? AlertTriangle : ShieldAlert;
  const colorClass = getPredictionColor(result.prediction);

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      {/* Overview Card */}
      <Card className={`relative overflow-hidden border-t-4 ${isBenign ? 'border-t-emerald-500' : isSuspicious ? 'border-t-amber-500' : 'border-t-red-500'}`}>
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <MainIcon className={`w-48 h-48 ${isBenign ? 'text-emerald-500' : isSuspicious ? 'text-amber-500' : 'text-red-500'}`} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 relative z-10">
          <div className="flex-1 space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Badge variant={isBenign ? 'success' : isSuspicious ? 'warning' : 'destructive'} className="text-sm px-3 py-1">
                  {result.prediction}
                </Badge>
                <Badge variant="default">{formatConfidence(result.confidence)} Confidence</Badge>
              </div>
              <h2 className="text-2xl font-bold text-white break-all flex items-center">
                {result.url}
                <a href={result.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-gray-500 hover:text-cyan-400">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                <div className="flex items-center text-sm text-gray-400 mb-1">
                  <Server className="w-4 h-4 mr-2" />
                  Model Used
                </div>
                <div className="font-medium">{result.modelVersion || 'XGBoost ensemble'}</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                <div className="flex items-center text-sm text-gray-400 mb-1">
                  <Clock className="w-4 h-4 mr-2" />
                  Scan Duration
                </div>
                <div className="font-medium">{result.scanDuration}ms</div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-64 flex flex-col items-center justify-center border-l-0 md:border-l border-gray-800 pt-6 md:pt-0 md:pl-8">
            <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Risk Score</h3>
            <RiskGauge score={result.riskScore} />
            <div className="mt-4">
              <Badge className={getRiskColor(result.riskLevel)}>{result.riskLevel} RISK</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Reasons / Findings */}
      {(result.reasons && result.reasons.length > 0) && (
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
            Key Findings
          </h3>
          <ul className="space-y-3">
            {result.reasons.map((reason, idx) => (
              <li key={idx} className="flex items-start bg-gray-800/30 p-3 rounded-lg border border-gray-700/50">
                <span className="text-red-400 mr-3 mt-0.5">•</span>
                <span className="text-gray-300">{reason}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Webpage Info if available */}
      {result.webpageAnalysis && (
        <Card>
           <h3 className="text-lg font-semibold text-white mb-4">Webpage Analysis</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="p-3 bg-gray-800/50 rounded-lg">
               <div className="text-xs text-gray-500">Status Code</div>
               <div className="text-lg text-white font-mono">{result.webpageAnalysis.statusCode}</div>
             </div>
             <div className="p-3 bg-gray-800/50 rounded-lg">
               <div className="text-xs text-gray-500">Redirects</div>
               <div className="text-lg text-white font-mono">{result.webpageAnalysis.redirectCount}</div>
             </div>
             <div className="p-3 bg-gray-800/50 rounded-lg">
               <div className="text-xs text-gray-500">Iframes</div>
               <div className="text-lg text-white font-mono">{result.webpageAnalysis.numIframes}</div>
             </div>
             <div className="p-3 bg-gray-800/50 rounded-lg">
               <div className="text-xs text-gray-500">Password Forms</div>
               <div className="text-lg text-white font-mono">{result.webpageAnalysis.hasPasswordInput ? 'Yes' : 'No'}</div>
             </div>
           </div>
        </Card>
      )}
    </div>
  );
}
