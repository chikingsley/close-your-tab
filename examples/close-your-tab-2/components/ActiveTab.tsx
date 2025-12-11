import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Minus, ChevronDown, Camera, Receipt, 
  CreditCard, Clock, Trash2, Save 
} from 'lucide-react';
import { TabSession, TabItem } from '../types';

interface ActiveTabProps {
  session: TabSession;
  onAddItem: (name: string, price: number) => void;
  onUpdateItemCount: (itemId: string, delta: number) => void;
  onCloseTab: (total: number, tip: number) => void;
  onDismiss: () => void;
}

export const ActiveTab: React.FC<ActiveTabProps> = ({
  session,
  onAddItem,
  onUpdateItemCount,
  onCloseTab,
  onDismiss
}) => {
  const [elapsed, setElapsed] = useState<string>('00:00:00');
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [viewState, setViewState] = useState<'LIST' | 'RECEIPT_SCAN' | 'PAYMENT'>('LIST');
  
  // Payment State
  const [tipPercentage, setTipPercentage] = useState<number>(18);
  const [customTip, setCustomTip] = useState<string>('');

  // Timer
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

  // Calculations
  const subtotal = session.items.reduce((acc, item) => acc + (item.price * item.count), 0);
  const tax = subtotal * 0.08; // Mock tax
  const total = subtotal + tax;
  
  const tipAmount = customTip 
    ? parseFloat(customTip) || 0 
    : total * (tipPercentage / 100);
    
  const finalTotal = total + tipAmount;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;
    onAddItem(newItemName, parseFloat(newItemPrice));
    setNewItemName('');
    setNewItemPrice('');
    setIsAdding(false);
  };

  const handleScanReceiptMock = () => {
    // Mock AI Receipt Scanning
    setViewState('RECEIPT_SCAN');
    setTimeout(() => {
        // Mock adding items
        onAddItem("Tito's Vodka", 12.00);
        onAddItem("Club Soda", 4.00);
        onAddItem("Nachos", 16.50);
        setViewState('LIST');
    }, 2000);
  };

  // Views
  if (viewState === 'RECEIPT_SCAN') {
      return (
          <div className="flex flex-col h-full items-center justify-center p-6 text-center animate-pulse">
              <Camera size={64} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white">Scanning Receipt...</h3>
              <p className="text-slate-400">AI is analyzing your tab</p>
          </div>
      );
  }

  if (viewState === 'PAYMENT') {
      return (
        <div className="flex flex-col h-full bg-slate-900 relative">
             <div className="p-4 border-b border-slate-800 flex items-center">
                <button onClick={() => setViewState('LIST')} className="p-2 hover:bg-slate-800 rounded-full">
                    <ChevronDown className="rotate-90 text-slate-400" />
                </button>
                <h2 className="text-lg font-bold text-white mx-auto">Close Tab</h2>
                <div className="w-10" /> 
             </div>
             
             <div className="flex-1 p-6 overflow-y-auto">
                <div className="bg-slate-800/50 rounded-2xl p-6 mb-8">
                    <div className="flex justify-between mb-2 text-slate-400">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4 text-slate-400">
                        <span>Tax (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-slate-700 mb-4" />
                    <div className="flex justify-between text-2xl font-bold text-white">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <h3 className="text-slate-400 font-bold uppercase text-xs tracking-wider mb-4">Add Tip</h3>
                <div className="grid grid-cols-4 gap-3 mb-6">
                    {[15, 18, 20].map(pct => (
                        <button
                            key={pct}
                            onClick={() => { setTipPercentage(pct); setCustomTip(''); }}
                            className={`py-3 rounded-xl font-bold transition-all ${
                                tipPercentage === pct && !customTip
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                        >
                            {pct}%
                        </button>
                    ))}
                    <input 
                        type="number" 
                        placeholder="Custom"
                        value={customTip}
                        onChange={(e) => setCustomTip(e.target.value)}
                        className={`bg-slate-800 rounded-xl px-2 text-center text-white font-bold focus:ring-2 focus:ring-blue-500 outline-none ${customTip ? 'ring-2 ring-blue-500' : ''}`}
                    />
                </div>
                
                <div className="flex justify-between items-center mb-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                    <span className="text-blue-400 font-bold">Tip Amount</span>
                    <span className="text-xl font-bold text-blue-400">${tipAmount.toFixed(2)}</span>
                </div>

             </div>

             <div className="p-6 bg-slate-900 border-t border-slate-800 safe-area-bottom">
                 <button 
                    onClick={() => onCloseTab(finalTotal, tipAmount)}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-2xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3"
                 >
                    <CreditCard size={24} />
                    Pay ${finalTotal.toFixed(2)}
                 </button>
             </div>
        </div>
      );
  }

  // LIST VIEW (Default)
  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-t-3xl shadow-2xl overflow-hidden">
      {/* Header / Drag Handle */}
      <div 
        className="w-full bg-slate-900 pt-3 pb-4 px-6 border-b border-slate-800 flex items-center justify-between cursor-pointer"
        onClick={onDismiss}
      >
         <div className="flex items-center gap-4">
             <button className="p-2 -ml-2 hover:bg-slate-800 rounded-full text-slate-400">
                 <ChevronDown />
             </button>
             <div>
                 <h2 className="font-bold text-xl text-white leading-tight">{session.venueName}</h2>
                 <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                    <Clock size={12} />
                    {elapsed}
                 </div>
             </div>
         </div>
         <div className="text-right">
             <div className="text-xs text-slate-500 font-bold uppercase">Current</div>
             <div className="text-xl font-bold text-blue-400">${subtotal.toFixed(2)}</div>
         </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {session.items.length === 0 ? (
             <div className="text-center py-12 text-slate-500 flex flex-col items-center">
                 <Receipt size={48} className="mb-4 opacity-20" />
                 <p>No items yet.</p>
                 <p className="text-sm">Add a drink or scan a receipt.</p>
             </div>
        ) : (
            session.items.map((item) => (
                <div key={item.id} className="bg-slate-800/50 rounded-xl p-4 flex items-center justify-between animate-fade-in">
                    <div className="flex-1">
                        <div className="font-bold text-white">{item.name}</div>
                        <div className="text-sm text-slate-400">${item.price.toFixed(2)}</div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-slate-900 rounded-lg p-1 border border-slate-700">
                            <button 
                                onClick={() => onUpdateItemCount(item.id, -1)}
                                className="p-2 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors"
                            >
                                {item.count === 1 ? <Trash2 size={16} className="text-red-400"/> : <Minus size={16} />}
                            </button>
                            <span className="w-8 text-center font-mono font-bold text-white">{item.count}</span>
                            <button 
                                onClick={() => onUpdateItemCount(item.id, 1)}
                                className="p-2 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))
        )}
        
        {/* Add Item Form (Inline) */}
        {isAdding ? (
            <form onSubmit={handleAddItem} className="bg-slate-800 rounded-xl p-4 border border-blue-500/30 animate-fade-in">
                <div className="flex gap-3 mb-3">
                    <input
                        autoFocus
                        type="text"
                        placeholder="Item Name (e.g. Vodka Soda)"
                        value={newItemName}
                        onChange={e => setNewItemName(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={newItemPrice}
                        onChange={e => setNewItemPrice(e.target.value)}
                        className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div className="flex gap-3">
                    <button 
                        type="button" 
                        onClick={() => setIsAdding(false)}
                        className="flex-1 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm font-semibold"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20"
                    >
                        Add Item
                    </button>
                </div>
            </form>
        ) : (
            <button 
                onClick={() => setIsAdding(true)}
                className="w-full py-3 border-2 border-dashed border-slate-700 text-slate-500 rounded-xl font-semibold hover:bg-slate-800 hover:border-slate-600 hover:text-slate-300 transition-all flex items-center justify-center gap-2"
            >
                <Plus size={18} />
                Add Custom Item
            </button>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-3 safe-area-bottom">
          <button 
            onClick={handleScanReceiptMock}
            className="flex-1 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors flex flex-col items-center justify-center gap-1"
          >
             <Camera size={20} className="text-blue-400" />
             <span className="text-xs uppercase tracking-wider">Scan Receipt</span>
          </button>
          <button 
            onClick={() => setViewState('PAYMENT')}
            className="flex-[2] py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors flex flex-col items-center justify-center gap-1 shadow-lg shadow-white/5"
          >
             <CreditCard size={20} className="text-slate-900" />
             <span className="text-xs uppercase tracking-wider">Close Tab</span>
          </button>
      </div>
    </div>
  );
};
