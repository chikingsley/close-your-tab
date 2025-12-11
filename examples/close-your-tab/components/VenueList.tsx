import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Venue } from '../types';
import { MOCK_VENUES } from './Home';

interface VenueListProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVenue: (venue: Venue) => void;
}

export const VenueList: React.FC<VenueListProps> = ({ isOpen, onClose, onSelectVenue }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredVenues = MOCK_VENUES.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 rounded-t-3xl border-t border-slate-800 p-6 h-[80%] shadow-2xl flex flex-col">
        
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-bold text-white">Select Venue</h2>
           <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
             <X size={20} />
           </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Search places..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none placeholder:text-slate-600"
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {filteredVenues.map((venue) => (
            <button
              key={venue.id}
              onClick={() => onSelectVenue(venue)}
              className="w-full bg-slate-800/50 hover:bg-slate-800 border border-slate-800/50 p-4 rounded-xl flex items-center justify-between group transition-all text-left"
            >
              <div>
                <h3 className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                  {venue.name}
                </h3>
                <div className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                  <span>{venue.type}</span>
                  <span className="w-1 h-1 bg-slate-600 rounded-full" />
                  <span>{venue.distance}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};