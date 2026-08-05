'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface RiskDistributionProps {
  data: {
    benign: number;
    suspicious: number;
    malicious: number;
  };
}

export function RiskDistribution({ data }: RiskDistributionProps) {
  const chartData = [
    { name: 'Benign', value: data.benign, color: '#10b981' },
    { name: 'Suspicious', value: data.suspicious, color: '#f59e0b' },
    { name: 'Malicious', value: data.malicious, color: '#ef4444' }
  ].filter(item => item.value > 0);

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

  if (total === 0) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 h-[400px] flex items-center justify-center backdrop-blur-xl">
        <p className="text-gray-400">No data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 h-[400px] backdrop-blur-xl flex flex-col relative">
      <h3 className="text-lg font-semibold text-white mb-2">Risk Distribution</h3>
      <div className="flex-1 w-full h-full min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#f3f4f6' }}
            />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '14px', color: '#9ca3af' }}/>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
          <div className="text-center">
            <span className="text-3xl font-bold text-white block">{total}</span>
            <span className="text-xs text-gray-400">Total</span>
          </div>
        </div>
      </div>
    </div>
  );
}
