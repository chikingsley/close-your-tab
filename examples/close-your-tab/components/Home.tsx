import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { MapPin, Clock, ArrowRight, Beer, DollarSign, UtensilsCrossed, Hotel, X, Layers, Map, Satellite } from 'lucide-react';
import { Venue, TabSession } from '../types';

// Declare google global to avoid TS errors
declare var google: any;

interface HomeProps {
  activeTab: TabSession | null;
  onStartTab: (venue: Venue) => void;
  onViewActiveTab: () => void;
}

type VenueFilter = 'all' | 'bar' | 'restaurant' | 'hotel';
type MapStyle = 'dark' | 'satellite';

// Dark Mode Map Style - Clean version hiding all POIs except our custom markers
const MAP_STYLES_DARK = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  // Hide ALL points of interest (businesses, attractions, etc)
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  // Hide transit stations
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  // Keep parks but subtle
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { color: "#263c3f" }],
  },
  // Hide park labels
  {
    featureType: "poi.park",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  // Roads
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  // Hide road icons (highway shields, etc)
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  // Water
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
  // Administrative labels (city names, etc) - keep but subtle
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  // Hide neighborhood labels
  {
    featureType: "administrative.neighborhood",
    stylers: [{ visibility: "off" }],
  },
];

// Satellite style - also hide POIs
const MAP_STYLES_SATELLITE = [
  // Hide ALL points of interest
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  // Hide transit
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  // Hide road icons
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
];

// Mock venues with coordinates (Around SF Union Square for demo)
// Added category field for filtering
export const MOCK_VENUES: (Venue & { category: VenueFilter })[] = [
  { id: '1', name: "O'Malley's Pub", address: '123 Main St', type: 'Irish Pub', distance: '50m', lat: 37.7879, lng: -122.4075, category: 'bar' },
  { id: '2', name: "The Blue Light", address: '45 Union St', type: 'Cocktail Bar', distance: '120m', lat: 37.7865, lng: -122.4090, category: 'bar' },
  { id: '3', name: "Dives & Co.", address: '88 Market St', type: 'Dive Bar', distance: '300m', lat: 37.7885, lng: -122.4100, category: 'bar' },
  { id: '4', name: "Rooftop 99", address: '99 2nd St', type: 'Lounge', distance: '0.4km', lat: 37.7850, lng: -122.4060, category: 'bar' },
  { id: '5', name: "The Grand Hotel", address: '200 Powell St', type: 'Hotel Bar', distance: '0.2km', lat: 37.7872, lng: -122.4082, category: 'hotel' },
  { id: '6', name: "Bistro 55", address: '55 Geary St', type: 'Restaurant', distance: '0.3km', lat: 37.7860, lng: -122.4070, category: 'restaurant' },
  { id: '7', name: "Sake House", address: '78 Sutter St', type: 'Restaurant', distance: '0.35km', lat: 37.7890, lng: -122.4065, category: 'restaurant' },
];

export const Home: React.FC<HomeProps> = ({ activeTab, onStartTab, onViewActiveTab }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowsRef = useRef<any[]>([]);
  const [venueFilter, setVenueFilter] = useState<VenueFilter>('all');
  const [mapStyle, setMapStyle] = useState<MapStyle>('dark');

  // Precise timer with seconds for mini widget - use a simple string state
  const [elapsedDisplay, setElapsedDisplay] = useState("00:00:00");

  useEffect(() => {
    if (!activeTab) {
      setElapsedDisplay("00:00:00");
      return;
    }

    const updateElapsed = () => {
      const diff = new Date().getTime() - new Date(activeTab.startTime).getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const h = hours.toString().padStart(2, '0');
      const m = minutes.toString().padStart(2, '0');
      const s = seconds.toString().padStart(2, '0');
      setElapsedDisplay(`${h}:${m}:${s}`);
    };

    updateElapsed(); // Initial call
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [activeTab?.startTime]); // Only depend on startTime, not entire activeTab

  // Memoize filtered venues to prevent recreation on every render
  const filteredVenues = useMemo(() => {
    return venueFilter === 'all'
      ? MOCK_VENUES
      : MOCK_VENUES.filter(v => v.category === venueFilter);
  }, [venueFilter]);

  // Memoize the active venue name to prevent unnecessary re-renders
  const activeVenueName = activeTab?.venueName;

  // Store user marker ref so we can update it
  const userMarkerRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      if (typeof google === 'undefined' || !google.maps) return;

      const sf = { lat: 37.7879, lng: -122.4075 };

      const newMap = new google.maps.Map(mapRef.current, {
        center: sf,
        zoom: 16,
        styles: MAP_STYLES_DARK,
        disableDefaultUI: true,
        zoomControl: false,
        clickableIcons: false, // Prevent clicking generic POIs
        mapTypeId: 'roadmap',
      });

      setMap(newMap);

      // User Marker
      userMarkerRef.current = new google.maps.Marker({
        position: sf,
        map: newMap,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#3b82f6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
        },
        title: "You are here",
        zIndex: 1000, // Keep user marker on top
      });

      newMap.addListener("click", () => {
         setSelectedVenue(null);
      });
    }
  }, [mapRef, map]);

  // Handle map style toggle
  useEffect(() => {
    if (!map) return;

    if (mapStyle === 'satellite') {
      map.setMapTypeId('hybrid'); // hybrid shows satellite with road labels
      map.setOptions({ styles: MAP_STYLES_SATELLITE });
    } else {
      map.setMapTypeId('roadmap');
      map.setOptions({ styles: MAP_STYLES_DARK });
    }
  }, [map, mapStyle]);

  // Update markers when map is ready, venues change, or filter changes
  useEffect(() => {
    if (!map) return;

    // Clear old markers and info windows
    markersRef.current.forEach(m => m.setMap(null));
    infoWindowsRef.current.forEach(iw => iw.close());

    const newMarkers: any[] = [];
    const newInfoWindows: any[] = [];

    // Get marker color based on category
    const getCategoryColor = (category: VenueFilter) => {
      switch (category) {
        case 'bar': return '#f59e0b'; // Amber
        case 'restaurant': return '#ec4899'; // Pink
        case 'hotel': return '#8b5cf6'; // Purple
        default: return '#f59e0b';
      }
    };

    filteredVenues.forEach((venue) => {
      const isActiveVenue = activeVenueName === venue.name;

      // Create custom marker with modern styling
      const marker = new google.maps.Marker({
        position: { lat: venue.lat, lng: venue.lng },
        map: map,
        icon: {
          path: 'M12 0C5.4 0 0 5.4 0 12c0 7.2 12 20 12 20s12-12.8 12-20c0-6.6-5.4-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z',
          fillColor: isActiveVenue ? '#22c55e' : getCategoryColor(venue.category),
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: isActiveVenue ? 1.5 : 1.2,
          anchor: new google.maps.Point(12, 32),
        },
        cursor: 'pointer',
      });

      // Create info window with venue name and Open Tab button
      const infoWindowContent = `
        <div style="
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          padding: 12px 16px;
          border-radius: 12px;
          min-width: 160px;
          font-family: system-ui, -apple-system, sans-serif;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          border: 1px solid rgba(148, 163, 184, 0.2);
        ">
          <div style="
            font-size: 14px;
            font-weight: 700;
            color: #f8fafc;
            margin-bottom: 4px;
          ">${venue.name}</div>
          <div style="
            font-size: 11px;
            color: #94a3b8;
            margin-bottom: 10px;
          ">${venue.type}</div>
          ${isActiveVenue ? `
            <div style="
              background: rgba(34, 197, 94, 0.2);
              border: 1px solid rgba(34, 197, 94, 0.4);
              border-radius: 8px;
              padding: 8px 12px;
              text-align: center;
              color: #22c55e;
              font-size: 12px;
              font-weight: 600;
            ">TAB ACTIVE</div>
          ` : activeVenueName ? `
            <div style="
              background: rgba(100, 116, 139, 0.2);
              border-radius: 8px;
              padding: 8px 12px;
              text-align: center;
              color: #64748b;
              font-size: 11px;
            ">Tab open elsewhere</div>
          ` : `
            <button
              onclick="window.openTabAt${venue.id}()"
              style="
                width: 100%;
                background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                color: white;
                border: none;
                padding: 10px 16px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 12px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                transition: all 0.2s;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
              "
              onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 6px 16px rgba(59, 130, 246, 0.5)';"
              onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.4)';"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 11h1a3 3 0 0 1 0 6h-1"/>
                <path d="M9 12v6"/>
                <path d="M13 12v6"/>
                <path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5z"/>
              </svg>
              Open Tab
            </button>
          `}
        </div>
      `;

      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
        pixelOffset: new google.maps.Size(0, -8),
        disableAutoPan: false,
      });

      // Add global function for the Open Tab button
      (window as any)[`openTabAt${venue.id}`] = () => {
        onStartTab(venue);
        infoWindow.close();
      };

      marker.addListener("click", () => {
        // Close all other info windows
        infoWindowsRef.current.forEach(iw => iw.close());
        infoWindow.open(map, marker);
        setSelectedVenue(venue);
        map.panTo({ lat: venue.lat, lng: venue.lng });
      });

      newMarkers.push(marker);
      newInfoWindows.push(infoWindow);
    });

    // Update refs (no re-render)
    markersRef.current = newMarkers;
    infoWindowsRef.current = newInfoWindows;

    // Cleanup global functions on unmount
    return () => {
      filteredVenues.forEach(venue => {
        delete (window as any)[`openTabAt${venue.id}`];
      });
    };
  }, [map, activeVenueName, venueFilter, filteredVenues, onStartTab]);

  // Derived state for the active tab calculation - support both old and new format
  const items = activeTab?.items || [];
  const currentCost = items.length > 0
    ? items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    : activeTab?.drinks.reduce((acc, d) => acc + (d.count * (d.priceEstimate || 0)), 0) || 0;
  const isActiveVenueSelected = activeTab && selectedVenue && activeTab.venueName === selectedVenue.name;

  // Get item count for display
  const itemCount = items.length > 0
    ? items.reduce((acc, item) => acc + item.quantity, 0)
    : activeTab?.drinks.length || 0;

  return (
    <div className="relative h-full w-full">
      {/* Header Overlay with Venue Filter */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 pt-12 pointer-events-none">
        <div className="flex items-center justify-between mb-3">
          <div className="pointer-events-auto bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/50">
            <h1 className="text-xs font-black text-slate-300 tracking-widest">MAP VIEW</h1>
          </div>

          {/* Map Style Toggle */}
          <button
            onClick={() => setMapStyle(mapStyle === 'dark' ? 'satellite' : 'dark')}
            className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all"
          >
            {mapStyle === 'dark' ? (
              <>
                <Satellite size={14} />
                <span className="text-xs font-medium">Satellite</span>
              </>
            ) : (
              <>
                <Map size={14} />
                <span className="text-xs font-medium">Map</span>
              </>
            )}
          </button>
        </div>

        {/* Venue Type Filter Buttons */}
        <div className="pointer-events-auto flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setVenueFilter('all')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              venueFilter === 'all'
                ? 'bg-white text-slate-900 shadow-lg'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
            }`}
          >
            <MapPin size={12} />
            All
          </button>
          <button
            onClick={() => setVenueFilter('bar')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              venueFilter === 'bar'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
            }`}
          >
            <Beer size={12} />
            Bars
          </button>
          <button
            onClick={() => setVenueFilter('restaurant')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              venueFilter === 'restaurant'
                ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
            }`}
          >
            <UtensilsCrossed size={12} />
            Restaurants
          </button>
          <button
            onClick={() => setVenueFilter('hotel')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              venueFilter === 'hotel'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
            }`}
          >
            <Hotel size={12} />
            Hotels
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full bg-slate-900 cursor-crosshair" id="map" />

      {/* Persistent Mini Active Tab Widget */}
      {activeTab && (
        <div
          onClick={onViewActiveTab}
          className="absolute top-36 right-4 z-30 cursor-pointer group"
        >
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl border border-green-500/40 rounded-2xl p-3 shadow-2xl shadow-green-900/20 min-w-[140px] transition-all duration-200 hover:scale-105 hover:border-green-400/60 hover:shadow-green-800/30">
            {/* Pulsing indicator */}
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold text-green-400 tracking-wider uppercase">Live Tab</span>
            </div>

            {/* Timer with seconds */}
            <div className="flex items-center gap-1.5 mb-2">
              <Clock size={12} className="text-slate-500" />
              <span className="text-lg font-mono font-bold text-white tracking-tight tabular-nums">
                {elapsedDisplay}
              </span>
            </div>

            {/* Price and items */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <DollarSign size={14} className="text-green-400" />
                <span className="text-lg font-bold text-green-400">{currentCost.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 text-xs">
                <Beer size={10} />
                <span>{itemCount}</span>
              </div>
            </div>

            {/* Venue name */}
            <div className="mt-2 pt-2 border-t border-slate-700/50">
              <span className="text-[10px] text-slate-500 truncate block max-w-[120px]">
                {activeTab.venueName}
              </span>
            </div>

            {/* Hover hint */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight size={12} className="text-green-400 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Card for Selected Venue */}
      {selectedVenue && (
        <div className="absolute bottom-24 left-4 right-4 z-20 animate-fade-in-up">
          <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 shadow-2xl">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedVenue.name}</h3>
                <p className="text-slate-400 text-sm flex items-center gap-1">
                  <MapPin size={12} /> {selectedVenue.address}
                </p>
              </div>
              <button
                onClick={() => setSelectedVenue(null)}
                className="text-slate-500 hover:text-slate-300 transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>

            {isActiveVenueSelected ? (
              // Active Tab State
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    TAB OPEN
                  </div>
                  <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Clock size={10} /> {elapsedDisplay}
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-bold">Current Tab</div>
                    <div className="text-2xl font-bold text-white">${currentCost.toFixed(2)}</div>
                  </div>
                  <button
                    onClick={onViewActiveTab}
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-lg flex items-center gap-1 transition-colors"
                  >
                    View Tab <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ) : (
              // Not Active State
              <div className="flex gap-3 mt-2">
                {activeTab ? (
                  <div className="flex-1 p-3 bg-slate-800 rounded-lg text-center text-xs text-slate-500">
                    You have an open tab at <strong>{activeTab.venueName}</strong>
                  </div>
                ) : (
                  <button
                    onClick={() => onStartTab(selectedVenue)}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-900/30 transition-all flex justify-center items-center gap-2 active:scale-98"
                  >
                    <Beer size={18} />
                    Open Tab Here
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};