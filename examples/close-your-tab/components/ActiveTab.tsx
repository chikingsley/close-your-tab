import React, { useState, useEffect } from 'react';
import { Plus, Minus, Clock, DollarSign, Beer, CheckCircle2 } from 'lucide-react';
import { TabSession } from '../types';

interface ActiveTabProps {
  session: TabSession;
  onAddDrink: () => void;
  onRemoveDrink: () => void;
  onCloseTab: (total: number, tip: number) => void;
  onUpdatePrice: (price: number) => void;
}

export const ActiveTab: React.FC<ActiveTabProps> = ({
  session,
  onAddDrink,
  onRemoveDrink,
  onCloseTab,
  onUpdatePrice
}) => {
  const [elapsed, setElapsed] = useState<string>('00:00:00');
  const [isClosing, setIsClosing] = useState(false);
  const [finalAmount, setFinalAmount] = useState<string>('');
  const [tipAmount, setTipAmount] = useState<string>('');

  // Calculate generic total based on drink count and estimated price
  // In a real app, each drink might have a specific price
  const drinkCount = session.drinks.reduce((acc, d) => acc + d.count, 0);
  const currentEstPrice = session.drinks[0]?.priceEstimate || 12;
  const estimatedTotal = drinkCount * currentEstPrice;

  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(session.startTime).getTime();
      const now = new Date().getTime();
      const diff = now - start;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setElapsed(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [session.startTime]);

  const handleCloseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = parseFloat(finalAmount) || estimatedTotal;
    const tip = parseFloat(tipAmount) || 0;
    onCloseTab(total, tip);
  };

  if (isClosing) {
    return (
      <div className="flex flex-col h-full p-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Close Tab</h2>
        <p className="text-slate-400 mb-8">Time to pay up at {session.venueName}.</p>

        <form onSubmit={handleCloseSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Final Tab Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={finalAmount}
              onChange={(e) => setFinalAmount(e.target.value)}
              placeholder={estimatedTotal.toFixed(2)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-2xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              autoFocus
            />
            <p className="text-xs text-slate-500 mt-2 text-right">
              Estimated: ${estimatedTotal.toFixed(2)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Tip Amount ($)
            </label>
            <div className="flex gap-2 mb-2">
               {[15, 18, 20].map(pct => (
                 <button 
                  key={pct}
                  type="button"
                  onClick={() => {
                     const amt = (parseFloat(finalAmount || estimatedTotal.toString()) * (pct/100)).toFixed(2);
                     setTipAmount(amt);
                  }}
                  className="flex-1 py-2 bg-slate-800 rounded-lg text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                 >
                   {pct}%
                 </button>
               ))}
            </div>
            <input
              type="number"
              step="0.01"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={() => setIsClosing(false)}
              className="flex-1 py-4 rounded-xl text-slate-400 font-semibold hover:bg-slate-900 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all flex justify-center items-center gap-2"
            >
              <CheckCircle2 size={20} />
              Confirm Paid
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Background Pulse Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header Info */}
      <div className="p-6 text-center z-10">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-green-500/20">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Tab Active
        </div>
        <h1 className="text-3xl font-bold text-white mb-1 truncate">{session.venueName}</h1>
        <div className="flex items-center justify-center gap-2 text-slate-400 font-mono text-sm">
          <Clock size={14} />
          <span>{elapsed}</span>
        </div>
      </div>

      {/* Main Counter */}
      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <div className="mb-2 text-slate-400 text-sm font-medium tracking-wide">TOTAL DRINKS</div>
        <div className="text-[8rem] font-bold text-white leading-none tracking-tighter tabular-nums drop-shadow-2xl">
          {drinkCount}
        </div>
        
        <div className="flex items-center gap-8 mt-8">
          <button
            onClick={onRemoveDrink}
            disabled={drinkCount === 0}
            className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <Minus size={24} />
          </button>
          <button
            onClick={onAddDrink}
            className="w-24 h-24 rounded-full bg-blue-600 shadow-xl shadow-blue-900/40 flex items-center justify-center text-white hover:bg-blue-500 transition-all active:scale-90 active:shadow-inner"
          >
            <Plus size={40} />
          </button>
        </div>
      </div>

      {/* Estimates */}
      <div className="p-6 z-10 bg-slate-900/50 backdrop-blur-lg border-t border-slate-800">
        <div className="flex justify-between items-center mb-6">
           <div>
             <label className="text-xs text-slate-500 uppercase font-bold">Est. Price / Drink</label>
             <div className="flex items-center gap-1 text-slate-300 cursor-pointer group" onClick={() => {
                const newPrice = prompt("Update price estimate per drink:", currentEstPrice.toString());
                if (newPrice) onUpdatePrice(parseFloat(newPrice));
             }}>
                <DollarSign size={14} className="text-slate-500"/>
                <span className="text-lg font-semibold group-hover:text-blue-400 transition-colors">{currentEstPrice}</span>
             </div>
           </div>
           <div className="text-right">
              <label className="text-xs text-slate-500 uppercase font-bold">Running Total</label>
              <div className="text-2xl font-bold text-blue-400">${estimatedTotal.toFixed(2)}</div>
           </div>
        </div>

        <button
          onClick={() => setIsClosing(true)}
          className="w-full py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group"
        >
          <Beer size={18} className="group-hover:rotate-12 transition-transform"/>
          Close Tab
        </button>
      </div>
    </div>
  );
};