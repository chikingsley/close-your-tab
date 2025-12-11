import React, { useState, useEffect, useRef } from 'react';
import {
  X, Clock, DollarSign, Plus, ChevronUp, ChevronDown,
  Beer, Wine, Martini, Flame, UtensilsCrossed, MoreHorizontal,
  Trash2, CheckCircle2, GripHorizontal, Camera, Sparkles, HelpCircle
} from 'lucide-react';
import { TabSession, TabItem } from '../types';

interface TabSheetProps {
  session: TabSession;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onClose: () => void;
  onAddItem: (item: Omit<TabItem, 'id' | 'addedAt'>) => void;
  onRemoveItem: (itemId: string) => void;
  onCloseTab: (total: number, tip: number) => void;
  onUpdateItemPrice?: (itemId: string, price: number) => void;
}

// Quick add categories - no default prices, will use venue memory or 0
const QUICK_ADD_ITEMS = [
  { name: 'Beer', category: 'beer' as const, icon: Beer, color: 'amber' },
  { name: 'Wine', category: 'wine' as const, icon: Wine, color: 'rose' },
  { name: 'Cocktail', category: 'cocktail' as const, icon: Martini, color: 'purple' },
  { name: 'Shot', category: 'shot' as const, icon: Flame, color: 'orange' },
  { name: 'Food', category: 'food' as const, icon: UtensilsCrossed, color: 'green' },
  { name: 'Other', category: 'other' as const, icon: MoreHorizontal, color: 'slate' },
];

// Venue price memory helpers
const getVenuePriceKey = (venueName: string) => `cyt_prices_${venueName.toLowerCase().replace(/\s+/g, '_')}`;

interface VenuePriceMemory {
  [itemName: string]: { price: number; count: number; lastUsed: string };
}

const getVenuePrices = (venueName: string): VenuePriceMemory => {
  try {
    const saved = localStorage.getItem(getVenuePriceKey(venueName));
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const saveVenuePrice = (venueName: string, itemName: string, price: number) => {
  const prices = getVenuePrices(venueName);
  const existing = prices[itemName];
  prices[itemName] = {
    price,
    count: (existing?.count || 0) + 1,
    lastUsed: new Date().toISOString(),
  };
  localStorage.setItem(getVenuePriceKey(venueName), JSON.stringify(prices));
};

// Mock receipt data for demo
const MOCK_RECEIPT_ITEMS = [
  { name: 'IPA Draft', price: 9.00, category: 'beer' as const },
  { name: 'House Red', price: 12.00, category: 'wine' as const },
  { name: 'Margarita', price: 14.00, category: 'cocktail' as const },
  { name: 'Tequila Shot', price: 8.00, category: 'shot' as const },
  { name: 'Nachos', price: 16.00, category: 'food' as const },
];

export const TabSheet: React.FC<TabSheetProps> = ({
  session,
  isExpanded,
  onToggleExpand,
  onClose,
  onAddItem,
  onRemoveItem,
  onCloseTab,
  onUpdateItemPrice,
}) => {
  const [elapsedDisplay, setElapsedDisplay] = useState("00:00:00");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCloseForm, setShowCloseForm] = useState(false);
  const [showReceiptScan, setShowReceiptScan] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState<typeof MOCK_RECEIPT_ITEMS | null>(null);
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TabItem['category']>('other');
  const [finalAmount, setFinalAmount] = useState('');
  const [tipAmount, setTipAmount] = useState('');
  const [venuePrices, setVenuePrices] = useState<VenuePriceMemory>({});
  const sheetRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load venue prices on mount
  useEffect(() => {
    setVenuePrices(getVenuePrices(session.venueName));
  }, [session.venueName]);

  // Timer
  useEffect(() => {
    const updateElapsed = () => {
      const diff = new Date().getTime() - new Date(session.startTime).getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setElapsedDisplay(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };
    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [session.startTime]);

  // Calculate totals
  const items = session.items || [];
  const knownPriceItems = items.filter(item => item.price > 0);
  const unknownPriceItems = items.filter(item => item.price === 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const hasUnknownPrices = unknownPriceItems.length > 0;

  // Get suggested price from venue memory
  const getSuggestedPrice = (itemName: string): number | null => {
    const memory = venuePrices[itemName];
    return memory?.price || null;
  };

  // Quick add handler - adds with price 0 (unknown) unless we have venue memory
  const handleQuickAdd = (quickItem: typeof QUICK_ADD_ITEMS[0]) => {
    const suggestedPrice = getSuggestedPrice(quickItem.name);
    onAddItem({
      name: quickItem.name,
      price: suggestedPrice || 0, // 0 means unknown
      quantity: 1,
      category: quickItem.category,
    });
  };

  // Custom add handler - price is optional
  const handleCustomAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const price = customPrice ? parseFloat(customPrice) : 0;
    onAddItem({
      name: customName.trim(),
      price,
      quantity: 1,
      category: selectedCategory,
    });

    setCustomName('');
    setCustomPrice('');
    setShowAddForm(false);
  };

  // Mock receipt scanning
  const handleScanReceipt = () => {
    setIsScanning(true);
    setScannedItems(null);

    // Simulate AI processing delay
    setTimeout(() => {
      setIsScanning(false);
      setScannedItems(MOCK_RECEIPT_ITEMS);
    }, 2000);
  };

  // Apply scanned items to update prices
  const handleApplyScannedPrices = () => {
    if (!scannedItems) return;

    // Save prices to venue memory
    scannedItems.forEach(scanned => {
      saveVenuePrice(session.venueName, scanned.name, scanned.price);
    });

    // Update venue prices state
    setVenuePrices(getVenuePrices(session.venueName));

    // Match scanned items with current tab items and update prices
    // In real app, this would use AI matching
    items.forEach(item => {
      if (item.price === 0) {
        const match = scannedItems.find(s =>
          s.category === item.category ||
          s.name.toLowerCase().includes(item.name.toLowerCase()) ||
          item.name.toLowerCase().includes(s.name.toLowerCase())
        );
        if (match && onUpdateItemPrice) {
          onUpdateItemPrice(item.id, match.price);
        }
      }
    });

    setShowReceiptScan(false);
    setScannedItems(null);
  };

  // Add scanned item directly
  const handleAddScannedItem = (scannedItem: typeof MOCK_RECEIPT_ITEMS[0]) => {
    saveVenuePrice(session.venueName, scannedItem.name, scannedItem.price);
    setVenuePrices(getVenuePrices(session.venueName));
    onAddItem({
      name: scannedItem.name,
      price: scannedItem.price,
      quantity: 1,
      category: scannedItem.category,
    });
  };

  // Close tab handler
  const handleCloseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = parseFloat(finalAmount) || totalAmount;
    const tip = parseFloat(tipAmount) || 0;
    onCloseTab(total, tip);
  };

  // Get category icon
  const getCategoryIcon = (category: TabItem['category']) => {
    const item = QUICK_ADD_ITEMS.find(i => i.category === category);
    return item?.icon || MoreHorizontal;
  };

  return (
    <div
      ref={sheetRef}
      className={`absolute bottom-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
        isExpanded ? 'h-[75%]' : 'h-auto'
      }`}
    >
      {/* Backdrop when expanded */}
      {isExpanded && (
        <div
          className="absolute inset-0 -top-[100vh] bg-black/40 backdrop-blur-sm"
          onClick={onToggleExpand}
        />
      )}

      {/* Sheet Content */}
      <div className={`relative bg-slate-900 border-t border-slate-700 rounded-t-3xl shadow-2xl ${
        isExpanded ? 'h-full' : ''
      }`}>
        {/* Drag Handle */}
        <div
          className="flex justify-center pt-3 pb-2 cursor-pointer"
          onClick={onToggleExpand}
        >
          <div className="w-12 h-1 bg-slate-600 rounded-full" />
        </div>

        {/* Header - Always visible */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Pulsing indicator */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <div>
                <h3 className="text-white font-bold text-sm">{session.venueName}</h3>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <Clock size={10} />
                  <span className="font-mono">{elapsedDisplay}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-slate-500">Running Total</div>
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-lg font-bold text-green-400">${totalAmount.toFixed(2)}</span>
                  {hasUnknownPrices && (
                    <span className="text-amber-400 text-xs flex items-center gap-0.5" title={`${unknownPriceItems.length} items without price`}>
                      <HelpCircle size={12} />
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={onToggleExpand}
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </button>
            </div>
          </div>

          {/* Quick Stats Bar - Collapsed view */}
          {!isExpanded && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span className="font-medium">{itemCount} items</span>
              </div>
              <button
                onClick={onToggleExpand}
                className="flex items-center gap-1 text-blue-400 text-sm font-medium"
              >
                <Plus size={14} />
                Add Item
              </button>
            </div>
          )}
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="flex flex-col h-[calc(100%-100px)] overflow-hidden">
            {showCloseForm ? (
              /* Close Tab Form */
              <div className="flex-1 p-4 overflow-y-auto">
                <h3 className="text-lg font-bold text-white mb-4">Close Your Tab</h3>
                <form onSubmit={handleCloseSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                      Final Amount ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={finalAmount}
                      onChange={(e) => setFinalAmount(e.target.value)}
                      placeholder={totalAmount.toFixed(2)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xl text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                      Tip Amount ($)
                    </label>
                    <div className="flex gap-2 mb-2">
                      {[15, 18, 20, 25].map(pct => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => {
                            const base = parseFloat(finalAmount) || totalAmount;
                            setTipAmount((base * pct / 100).toFixed(2));
                          }}
                          className="flex-1 py-2 bg-slate-800 rounded-lg text-sm text-slate-300 hover:bg-slate-700"
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
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCloseForm(false)}
                      className="flex-1 py-3 rounded-xl text-slate-400 font-medium hover:bg-slate-800"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={18} />
                      Close Tab
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                {/* Smart Suggestions from Venue Memory */}
                {Object.keys(venuePrices).length > 0 && (
                  <div className="px-4 py-3 border-b border-slate-800 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
                    <div className="flex items-center gap-2 text-xs text-purple-300 uppercase font-bold mb-2">
                      <Sparkles size={12} />
                      Previously at {session.venueName}
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                      {Object.entries(venuePrices)
                        .sort((a, b) => b[1].count - a[1].count)
                        .slice(0, 5)
                        .map(([name, data]) => (
                          <button
                            key={name}
                            onClick={() => {
                              const category = QUICK_ADD_ITEMS.find(q =>
                                name.toLowerCase().includes(q.name.toLowerCase())
                              )?.category || 'other';
                              onAddItem({ name, price: data.price, quantity: 1, category });
                            }}
                            className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-slate-800/80 rounded-lg hover:bg-slate-700 transition-all"
                          >
                            <span className="text-sm text-white">{name}</span>
                            <span className="text-xs text-green-400 font-medium">${data.price.toFixed(2)}</span>
                            {data.count > 1 && (
                              <span className="text-[10px] text-slate-500">×{data.count}</span>
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Quick Add Buttons */}
                <div className="px-4 py-3 border-b border-slate-800">
                  <div className="text-xs text-slate-500 uppercase font-bold mb-2">Quick Add</div>
                  <div className="grid grid-cols-6 gap-2">
                    {QUICK_ADD_ITEMS.map((item) => {
                      const suggestedPrice = getSuggestedPrice(item.name);
                      return (
                        <button
                          key={item.category}
                          onClick={() => handleQuickAdd(item)}
                          className={`flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all active:scale-95 relative`}
                        >
                          <item.icon size={18} className={`text-${item.color}-400`} />
                          <span className="text-[10px] text-slate-400">{item.name}</span>
                          {suggestedPrice ? (
                            <span className="text-[8px] text-green-400">${suggestedPrice}</span>
                          ) : (
                            <span className="text-[8px] text-slate-600">?</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Add Form */}
                {showAddForm && (
                  <div className="px-4 py-3 border-b border-slate-800 bg-slate-800/50">
                    <form onSubmit={handleCustomAdd} className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customName}
                          onChange={(e) => setCustomName(e.target.value)}
                          placeholder="Item name..."
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          autoFocus
                        />
                        <input
                          type="number"
                          step="0.01"
                          value={customPrice}
                          onChange={(e) => setCustomPrice(e.target.value)}
                          placeholder="$0.00"
                          className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="px-4 py-2 text-slate-400 text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!customName.trim() || !customPrice}
                          className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium"
                        >
                          Add Item
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Receipt Scan UI */}
                {showReceiptScan && (
                  <div className="px-4 py-3 border-b border-slate-800 bg-gradient-to-b from-blue-900/30 to-slate-900">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Camera size={16} className="text-blue-400" />
                        Scan Receipt
                      </h4>
                      <button
                        onClick={() => { setShowReceiptScan(false); setScannedItems(null); }}
                        className="text-slate-400 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {isScanning ? (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-slate-400 text-sm">AI is reading your receipt...</p>
                      </div>
                    ) : scannedItems ? (
                      <div className="space-y-3">
                        <p className="text-xs text-slate-400">Found {scannedItems.length} items on receipt:</p>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {scannedItems.map((scanned, idx) => {
                            const Icon = getCategoryIcon(scanned.category);
                            return (
                              <div
                                key={idx}
                                className="flex items-center gap-3 p-2 bg-slate-800 rounded-lg"
                              >
                                <Icon size={14} className="text-slate-400" />
                                <span className="flex-1 text-sm text-white">{scanned.name}</span>
                                <span className="text-green-400 text-sm font-medium">${scanned.price.toFixed(2)}</span>
                                <button
                                  onClick={() => handleAddScannedItem(scanned)}
                                  className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded"
                                >
                                  Add
                                </button>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => setScannedItems(null)}
                            className="flex-1 py-2 text-slate-400 text-sm hover:text-white"
                          >
                            Re-scan
                          </button>
                          <button
                            onClick={handleApplyScannedPrices}
                            className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-white text-sm rounded-lg font-medium flex items-center justify-center gap-2"
                          >
                            <Sparkles size={14} />
                            Match & Update Prices
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs text-slate-400">
                          Take a photo of your receipt to auto-fill prices and remember them for next time.
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          onChange={handleScanReceipt}
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full py-4 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-colors flex flex-col items-center gap-2"
                        >
                          <Camera size={24} />
                          <span className="text-sm">Take Photo or Upload</span>
                        </button>
                        <button
                          onClick={handleScanReceipt}
                          className="w-full py-2 text-xs text-slate-500 hover:text-blue-400"
                        >
                          Demo: Use sample receipt
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Items List */}
                <div className="flex-1 overflow-y-auto px-4 py-2">
                  {items.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <Beer size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No items yet</p>
                      <p className="text-xs">Tap quick add or add custom item</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {items.map((item) => {
                        const Icon = getCategoryIcon(item.category);
                        const hasUnknownPrice = item.price === 0;
                        return (
                          <div
                            key={item.id}
                            className={`flex items-center gap-3 p-3 rounded-xl group ${
                              hasUnknownPrice ? 'bg-amber-900/20 border border-amber-800/30' : 'bg-slate-800/50'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                              <Icon size={16} className="text-slate-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-white text-sm font-medium truncate">{item.name}</div>
                              <div className="text-slate-500 text-xs">
                                {hasUnknownPrice ? (
                                  <span className="text-amber-400 flex items-center gap-1">
                                    <HelpCircle size={10} />
                                    Price unknown
                                  </span>
                                ) : (
                                  <>{item.quantity > 1 ? `${item.quantity} × ` : ''}${item.price.toFixed(2)}</>
                                )}
                              </div>
                            </div>
                            <div className={`font-medium ${hasUnknownPrice ? 'text-amber-400' : 'text-white'}`}>
                              {hasUnknownPrice ? '?' : `$${(item.price * item.quantity).toFixed(2)}`}
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="p-1 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        );
                      })}

                      {/* Scan Receipt CTA if there are unknown prices */}
                      {hasUnknownPrices && !showReceiptScan && (
                        <button
                          onClick={() => setShowReceiptScan(true)}
                          className="w-full mt-3 py-3 border border-dashed border-amber-600/50 rounded-xl text-amber-400 hover:bg-amber-900/20 transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Camera size={16} />
                          Scan receipt to fill prices
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-slate-800 bg-slate-900/80 backdrop-blur">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowAddForm(!showAddForm)}
                      className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors text-sm"
                    >
                      <Plus size={16} />
                      Custom
                    </button>
                    <button
                      onClick={() => setShowReceiptScan(!showReceiptScan)}
                      className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors text-sm"
                    >
                      <Camera size={16} />
                      Receipt
                    </button>
                    <button
                      onClick={() => setShowCloseForm(true)}
                      className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm"
                    >
                      <DollarSign size={16} />
                      Close
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
