import React from 'react';
import { History, BarChart3, Plus, Beer, Map, Settings, List } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  hasActiveTab: boolean;
  onFabClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentView, 
  onNavigate, 
  hasActiveTab,
  onFabClick 
}) => {
  
  const NavItem = ({ view, icon: Icon, label }: { view: ViewState, icon: any, label: string }) => (
    <button
      onClick={() => onNavigate(view)}
      className={`flex flex-col items-center justify-center space-y-1 w-full transition-all ${
        currentView === view ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      <Icon size={24} strokeWidth={currentView === view ? 2.5 : 2} />
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 pb-safe relative h-20">
        <div className="grid grid-cols-5 h-full items-center px-2 relative">
          
          {/* 1. Map */}
          <NavItem view="MAP" icon={Map} label="Map" />

          {/* 2. History */}
          <NavItem view="HISTORY" icon={History} label="History" />

          {/* 3. Center FAB Space */}
          <div className="flex justify-center items-center -mt-6">
             <button
              onClick={onFabClick}
              className={`
                w-14 h-14 rounded-full shadow-lg flex items-center justify-center border-4 border-slate-950 transition-all active:scale-95
                ${hasActiveTab 
                  ? 'bg-amber-500 hover:bg-amber-400 shadow-amber-500/30' 
                  : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30'
                }
              `}
            >
              {hasActiveTab ? (
                <Beer size={24} className="text-white animate-pulse" fill="currentColor" fillOpacity={0.2} />
              ) : (
                <Plus size={28} className="text-white" />
              )}
            </button>
          </div>

          {/* 4. Insights */}
          <NavItem view="STATS" icon={BarChart3} label="Insights" />

          {/* 5. Settings */}
          <NavItem view="SETTINGS" icon={Settings} label="Settings" />

        </div>
      </div>
    </div>
  );
};