import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Sparkles, TrendingUp, DollarSign } from 'lucide-react';
import { TabSession } from '../types';
import { analyzeSpendingHabits } from '../services/geminiService';

interface StatsProps {
  history: TabSession[];
}

export const Stats: React.FC<StatsProps> = ({ history }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Prepare chart data: Last 5 sessions
  const chartData = history
    .slice(0, 5)
    .reverse()
    .map(h => ({
      name: h.venueName.substring(0, 8) + (h.venueName.length > 8 ? '...' : ''),
      amount: h.totalAmount || 0,
      fullDate: new Date(h.startTime).toLocaleDateString()
    }));
  
  const totalSpent = history.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const avgSpent = history.length > 0 ? totalSpent / history.length : 0;

  const handleGetInsight = async () => {
    setLoading(true);
    const result = await analyzeSpendingHabits(history);
    setInsight(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full p-6 animate-fade-in pb-24 overflow-y-auto">
      <header className="mb-6 mt-4">
        <h1 className="text-3xl font-bold text-white mb-2">Insights</h1>
        <p className="text-slate-400">Spending habits & stats.</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-slate-500 text-xs font-bold uppercase mb-1 flex items-center gap-1">
             <DollarSign size={12}/> Total Spent
          </div>
          <div className="text-2xl font-bold text-white">${totalSpent.toFixed(0)}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-slate-500 text-xs font-bold uppercase mb-1 flex items-center gap-1">
             <TrendingUp size={12}/> Average Tab
          </div>
          <div className="text-2xl font-bold text-blue-400">${avgSpent.toFixed(0)}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-8">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Recent Tabs</h3>
        <div className="h-48 w-full">
            {history.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                    <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#64748b', fontSize: 10 }} 
                        axisLine={false}
                        tickLine={false} 
                    />
                    <YAxis hide />
                    <Tooltip 
                        cursor={{fill: '#1e293b'}}
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                    />
                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#3b82f6' : '#475569'} />
                        ))}
                    </Bar>
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-slate-600 text-sm">
                    No data available
                </div>
            )}
        </div>
      </div>

      {/* AI Insight */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl rounded-full opacity-50 pointer-events-none" />
        <div className="relative bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-amber-400" />
                <h3 className="text-lg font-bold text-white">Gemini Insights</h3>
            </div>
            
            {!insight ? (
                <div className="text-center py-4">
                    <p className="text-slate-400 text-sm mb-4">Get AI-powered analysis of your bar spending habits.</p>
                    <button 
                        onClick={handleGetInsight}
                        disabled={loading || history.length === 0}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full text-sm hover:opacity-90 disabled:opacity-50 transition-all"
                    >
                        {loading ? 'Thinking...' : 'Analyze My Habits'}
                    </button>
                    {history.length === 0 && <p className="text-xs text-red-400 mt-2">Need at least 1 closed tab.</p>}
                </div>
            ) : (
                <div className="animate-fade-in">
                    <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-purple-500 pl-4 py-1 italic">
                        "{insight}"
                    </p>
                    <button 
                        onClick={() => setInsight(null)}
                        className="text-xs text-slate-500 mt-4 hover:text-slate-300 underline"
                    >
                        Reset
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};