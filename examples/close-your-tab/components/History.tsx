import React from 'react';
import { Calendar, DollarSign, Beer } from 'lucide-react';
import { TabSession } from '../types';

interface HistoryProps {
  history: TabSession[];
}

export const History: React.FC<HistoryProps> = ({ history }) => {
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );

  return (
    <div className="flex flex-col h-full p-6 animate-fade-in">
      <header className="mb-6 mt-4">
        <h1 className="text-3xl font-bold text-white mb-2">History</h1>
        <p className="text-slate-400">Your past nights out.</p>
      </header>

      <div className="flex-1 overflow-y-auto -mx-6 px-6 pb-24">
        {sortedHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 border-2 border-dashed border-slate-800 rounded-xl mt-4">
            <Beer size={48} className="mb-4 opacity-20" />
            <p>No tabs closed yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedHistory.map((session) => (
              <div key={session.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{session.venueName}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                      <Calendar size={12} />
                      {new Date(session.startTime).toLocaleDateString(undefined, {
                        weekday: 'short', month: 'short', day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">
                      ${(session.totalAmount || 0).toFixed(2)}
                    </div>
                    {session.tipAmount && session.tipAmount > 0 && (
                       <div className="text-xs text-slate-500">
                         + ${(session.tipAmount).toFixed(2)} tip
                       </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-slate-800/50">
                    <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                        <Beer size={14} className="text-amber-500" />
                        <span className="font-semibold text-slate-300">{session.drinks.reduce((a,b) => a + b.count, 0)}</span>
                        <span className="text-xs">drinks</span>
                    </div>
                    {session.endTime && (
                      <div className="text-xs text-slate-500 ml-auto">
                        Duration: {Math.round((new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 60000)} min
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};