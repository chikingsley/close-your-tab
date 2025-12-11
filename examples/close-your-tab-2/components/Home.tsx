import React, { useEffect, useRef, useState } from 'react';
import { Plus, Minus, CreditCard, Trash2, ChevronDown } from 'lucide-react';
import { Venue, TabSession } from '../types';

// Declare google global
declare var google: any;

interface HomeProps {
  activeTab: TabSession | null;
  onStartTab: (venue: Venue) => void;
  hasActiveTab: boolean;
  onAddDrink: () => void;
  onAddItem: (name: string, price: number) => void;
  onUpdateItemCount: (itemId: string, delta: number) => void;
  onCloseTab: (total: number, tip: number) => void;
  isSheetExpanded: boolean;
  onSheetExpandedChange: (expanded: boolean) => void;
}

const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#1e293b" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#334155" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1e293b" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#94a3b8" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0f172a" }],
  },
];

export const MOCK_VENUES: Venue[] = [
  { id: '1', name: "O'Malley's Pub", address: '123 Main St', type: 'Irish Pub', distance: '50m', lat: 37.7879, lng: -122.4075 },
  { id: '2', name: "The Blue Light", address: '45 Union St', type: 'Cocktail Bar', distance: '120m', lat: 37.7865, lng: -122.4090 },
  { id: '3', name: "Dives & Co.", address: '88 Market St', type: 'Dive Bar', distance: '300m', lat: 37.7885, lng: -122.4100 },
  { id: '4', name: "Rooftop 99", address: '99 2nd St', type: 'Lounge', distance: '0.4km', lat: 37.7850, lng: -122.4060 },
];

export const Home: React.FC<HomeProps> = ({
  activeTab,
  onStartTab,
  hasActiveTab,
  onAddDrink,
  onAddItem,
  onUpdateItemCount,
  onCloseTab,
  isSheetExpanded,
  onSheetExpandedChange
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any | null>(null);
  const [overlays, setOverlays] = useState<any[]>([]);

  // Live Timer State
  const [timerStr, setTimerStr] = useState("0:00");
  const [currentCost, setCurrentCost] = useState(0);

  // Close tab form state
  const [showCloseForm, setShowCloseForm] = useState(false);
  const [tipPercentage, setTipPercentage] = useState<number>(18);
  const [customTip, setCustomTip] = useState<string>('');

  // Timer Effect
  useEffect(() => {
    if (!activeTab) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const start = new Date(activeTab.startTime).getTime();
      const diff = now - start;

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      if (h > 0) {
        setTimerStr(`${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      } else {
        setTimerStr(`${m}:${s.toString().padStart(2, '0')}`);
      }
    };

    const cost = activeTab.items.reduce((acc, item) => acc + (item.count * item.price), 0);
    setCurrentCost(cost);

    const interval = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(interval);
  }, [activeTab]);

  // Reset close form when sheet collapses
  useEffect(() => {
    if (!isSheetExpanded) {
      setShowCloseForm(false);
    }
  }, [isSheetExpanded]);

  // Initialize Map & Overlays
  useEffect(() => {
    if (mapRef.current && !map) {
      if (typeof google === 'undefined' || !google.maps) return;

      const sf = { lat: 37.7879, lng: -122.4075 };

      const newMap = new google.maps.Map(mapRef.current, {
        center: sf,
        zoom: 17,
        styles: MAP_STYLES,
        disableDefaultUI: true,
        clickableIcons: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      setMap(newMap);

      // --- Custom Overlay Class ---
      class CustomMarker extends google.maps.OverlayView {
        position: any;
        containerDiv: HTMLDivElement;
        venue: Venue;
        isActive: boolean;
        anyTabActive: boolean;

        constructor(venue: Venue, isActive: boolean, anyTabActive: boolean) {
          super();
          this.position = new google.maps.LatLng(venue.lat, venue.lng);
          this.venue = venue;
          this.isActive = isActive;
          this.anyTabActive = anyTabActive;

          this.containerDiv = document.createElement('div');
          this.containerDiv.className = 'venue-marker-container';
          // Set z-index: active markers should be on top
          this.containerDiv.style.zIndex = isActive ? '1000' : '1';

          this.updateContent();
          CustomMarker.preventMapHitsAndGesturesFrom(this.containerDiv);
        }

        updateContent() {
          const activeClass = this.isActive ? 'active-venue' : '';
          const dimmedClass = this.anyTabActive && !this.isActive ? 'dimmed' : '';

          let buttonHtml = '';
          if (this.isActive) {
            buttonHtml = `
              <div class="venue-action-btn active" style="background: #22c55e; color: white;">
                <span style="display: inline-block; width: 6px; height: 6px; background: white; border-radius: 50%; margin-right: 4px;"></span>
                Live
              </div>`;
          } else if (this.anyTabActive) {
            buttonHtml = `
              <div class="venue-action-btn disabled" style="background: #334155; color: #64748b; cursor: not-allowed; font-size: 10px;">
                Tab Open Elsewhere
              </div>`;
          } else {
            buttonHtml = `
              <div class="venue-action-btn" id="btn-${this.venue.id}" style="background: #d97706; color: white;">
                Open
              </div>`;
          }

          this.containerDiv.innerHTML = `
            <div class="venue-chip ${activeClass} ${dimmedClass}">
                <div class="venue-name">${this.venue.name}</div>
                ${buttonHtml}
            </div>
            <div class="venue-marker-arrow ${activeClass}"></div>
          `;

          if (!this.isActive && !this.anyTabActive) {
            const btn = this.containerDiv.querySelector(`#btn-${this.venue.id}`);
            if (btn) {
              btn.addEventListener('click', (e) => {
                e.stopPropagation();
                onStartTab(this.venue);
              });
            }
          }
        }

        onAdd() {
          const panes = this.getPanes();
          panes.overlayMouseTarget.appendChild(this.containerDiv);
        }

        draw() {
          const overlayProjection = this.getProjection();
          const xy = overlayProjection.fromLatLngToDivPixel(this.position);
          if (xy) {
            this.containerDiv.style.left = xy.x + 'px';
            this.containerDiv.style.top = xy.y + 'px';
          }
        }

        onRemove() {
          if (this.containerDiv.parentElement) {
            this.containerDiv.parentElement.removeChild(this.containerDiv);
          }
        }
      }

      // --- User Location Overlay ---
      class UserMarker extends google.maps.OverlayView {
        position: any;
        div: HTMLDivElement | null = null;

        constructor(lat: number, lng: number) {
          super();
          this.position = new google.maps.LatLng(lat, lng);
        }
        onAdd() {
          this.div = document.createElement('div');
          this.div.innerHTML = '<div class="user-location-marker"></div><div class="user-location-pulse"></div>';
          this.getPanes().overlayMouseTarget.appendChild(this.div);
        }
        draw() {
          const proj = this.getProjection();
          const xy = proj.fromLatLngToDivPixel(this.position);
          if (this.div && xy) {
            this.div.style.position = 'absolute';
            this.div.style.left = xy.x + 'px';
            this.div.style.top = xy.y + 'px';
          }
        }
        onRemove() {
          this.div?.parentNode?.removeChild(this.div);
        }
      }

      const userMarker = new UserMarker(sf.lat, sf.lng);
      userMarker.setMap(newMap);

      (window as any).CustomMarkerClass = CustomMarker;
    }
  }, [mapRef]);

  // Handle Venues & Overlays Update
  useEffect(() => {
    if (!map || !(window as any).CustomMarkerClass) return;

    overlays.forEach(o => o.setMap(null));

    const MarkerClass = (window as any).CustomMarkerClass;
    const newOverlays: any[] = [];

    MOCK_VENUES.forEach(venue => {
      const isActive = activeTab?.venueName === venue.name;
      const marker = new MarkerClass(venue, isActive, hasActiveTab);
      marker.setMap(map);
      newOverlays.push(marker);
    });

    setOverlays(newOverlays);
  }, [map, activeTab, hasActiveTab]);

  // Calculate totals for close form
  const subtotal = currentCost;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const tipAmount = customTip ? parseFloat(customTip) || 0 : total * (tipPercentage / 100);
  const finalTotal = total + tipAmount;
  const itemCount = activeTab?.items.reduce((acc, item) => acc + item.count, 0) || 0;

  const handleCloseTabSubmit = () => {
    onCloseTab(finalTotal, tipAmount);
    setShowCloseForm(false);
  };

  return (
    <div className="relative h-full w-full bg-slate-950">
      {/* Map Element */}
      <div ref={mapRef} className="w-full h-full block" />

      {/* Top Overlay: Context */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 pt-10 pointer-events-none flex justify-center">
        <div className="bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-700/50 shadow-lg flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-300 tracking-widest uppercase">
            Exploring Nearby
          </span>
        </div>
      </div>

      {/* Backdrop when sheet is expanded */}
      {isSheetExpanded && activeTab && (
        <div
          className="absolute inset-0 bg-black/50 z-30 animate-fade-in"
          onClick={() => onSheetExpandedChange(false)}
        />
      )}

      {/* Active Tab Bottom Sheet */}
      {activeTab && (
        <div
          className={`absolute left-0 right-0 z-40 transition-all duration-300 ease-out ${
            isSheetExpanded ? 'bottom-20 max-h-[70%]' : 'bottom-20'
          }`}
        >
          <div className="bg-slate-900 border-t border-slate-700 rounded-t-3xl shadow-2xl shadow-black/50 flex flex-col max-h-full">
            {/* Drag Handle */}
            <div
              onClick={() => onSheetExpandedChange(!isSheetExpanded)}
              className="flex justify-center pt-3 pb-2 cursor-pointer shrink-0"
            >
              <div className="w-10 h-1 bg-slate-600 rounded-full" />
            </div>

            {/* Header - Always visible */}
            <div className="px-5 pb-4 shrink-0">
              <div
                className="flex justify-between items-start cursor-pointer"
                onClick={() => onSheetExpandedChange(!isSheetExpanded)}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    </div>
                    <h3 className="font-bold text-white text-base truncate max-w-[160px]">
                      {activeTab.venueName}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold font-mono text-slate-300 tracking-tight">{timerStr}</span>
                    <span className="text-sm text-slate-500">{itemCount} items</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Running</div>
                    <div className="text-2xl font-bold text-green-400">${currentCost.toFixed(2)}</div>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-slate-500 transition-transform ${isSheetExpanded ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>

              {/* Collapsed Actions */}
              {!isSheetExpanded && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); onAddDrink(); }}
                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Add Drink
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onSheetExpandedChange(true); setShowCloseForm(true); }}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard size={18} />
                    Close Tab
                  </button>
                </div>
              )}
            </div>

            {/* Expanded Content */}
            {isSheetExpanded && (
              <div className="flex-1 overflow-y-auto px-5 pb-5">
                {showCloseForm ? (
                  /* Close Tab Form */
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Close Your Tab</h3>

                    <div className="bg-slate-800/50 rounded-2xl p-4">
                      <div className="flex justify-between mb-2 text-slate-400 text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-3 text-slate-400 text-sm">
                        <span>Tax (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="h-px bg-slate-700 mb-3" />
                      <div className="flex justify-between text-xl font-bold text-white">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-400 font-bold uppercase text-xs tracking-wider block mb-3">Add Tip</label>
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {[15, 18, 20, 25].map(pct => (
                          <button
                            key={pct}
                            onClick={() => { setTipPercentage(pct); setCustomTip(''); }}
                            className={`py-2 rounded-xl font-bold transition-all text-sm ${
                              tipPercentage === pct && !customTip
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                          >
                            {pct}%
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        placeholder="Custom tip amount"
                        value={customTip}
                        onChange={(e) => setCustomTip(e.target.value)}
                        className="w-full bg-slate-800 rounded-xl px-4 py-3 text-white font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <div className="flex justify-between items-center mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                        <span className="text-blue-400 font-semibold text-sm">Tip Amount</span>
                        <span className="text-lg font-bold text-blue-400">${tipAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setShowCloseForm(false)}
                        className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-xl font-semibold"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleCloseTabSubmit}
                        className="flex-[2] py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                      >
                        <CreditCard size={18} />
                        Pay ${finalTotal.toFixed(2)}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Items List View */
                  <div className="space-y-4">
                    {/* Items */}
                    <div>
                      <label className="text-slate-400 font-bold uppercase text-xs tracking-wider block mb-3">Your Tab</label>
                      {activeTab.items.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                          <p>No items yet</p>
                          <p className="text-sm">Add a drink to get started</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {activeTab.items.map((item) => (
                            <div key={item.id} className="bg-slate-800/50 rounded-xl p-3 flex items-center justify-between">
                              <div className="flex-1">
                                <div className="font-semibold text-white">{item.name}</div>
                                <div className="text-sm text-slate-400">${item.price.toFixed(2)}</div>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="flex items-center bg-slate-900 rounded-lg border border-slate-700">
                                  <button
                                    onClick={() => onUpdateItemCount(item.id, -1)}
                                    className="p-2 hover:bg-slate-800 rounded-l-lg text-slate-400 hover:text-white transition-colors"
                                  >
                                    {item.count === 1 ? <Trash2 size={14} className="text-red-400" /> : <Minus size={14} />}
                                  </button>
                                  <span className="w-8 text-center font-mono font-bold text-white text-sm">{item.count}</span>
                                  <button
                                    onClick={() => onUpdateItemCount(item.id, 1)}
                                    className="p-2 hover:bg-slate-800 rounded-r-lg text-slate-400 hover:text-white transition-colors"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={onAddDrink}
                        className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus size={18} />
                        Add Drink
                      </button>
                      <button
                        onClick={() => setShowCloseForm(true)}
                        className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <CreditCard size={18} />
                        Close Tab
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Helper text if no active tab */}
      {!activeTab && (
        <div className="absolute bottom-24 w-full text-center z-0 pointer-events-none opacity-50">
          <p className="text-xs text-slate-500 bg-black/20 inline-block px-3 py-1 rounded-full backdrop-blur-sm">
            Tap "Open" on a venue to start
          </p>
        </div>
      )}
    </div>
  );
};
