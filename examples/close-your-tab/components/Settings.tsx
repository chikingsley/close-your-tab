import React from 'react';
import { User, Bell, MapPin, Trash2, Shield, HelpCircle } from 'lucide-react';

interface SettingsProps {
  onResetData: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onResetData }) => {
  return (
    <div className="flex flex-col h-full p-6 animate-fade-in pb-24 overflow-y-auto">
       <header className="mb-6 mt-4">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your preferences.</p>
       </header>

       <div className="flex-1 space-y-8">
          {/* Profile Section */}
          <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
             <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-xl">
                <User size={28} />
             </div>
             <div>
                <h3 className="text-lg font-bold text-white">Guest User</h3>
                <p className="text-slate-400 text-sm">Free Edition</p>
             </div>
          </div>

          <div className="space-y-3">
             <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">App Preferences</h4>
             
             <button className="w-full flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors">
                <Bell size={20} className="text-slate-400" />
                <span className="flex-1 text-left">Notifications</span>
                <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded border border-blue-800">On</span>
             </button>
             
             <button className="w-full flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors">
                <MapPin size={20} className="text-slate-400" />
                <span className="flex-1 text-left">Location Permissions</span>
                <span className="text-xs text-slate-500">Allowed</span>
             </button>
          </div>

          <div className="space-y-3">
             <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Support & Privacy</h4>
             
             <button className="w-full flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors">
                <Shield size={20} className="text-slate-400" />
                <span className="flex-1 text-left">Privacy Policy</span>
             </button>

             <button className="w-full flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors">
                <HelpCircle size={20} className="text-slate-400" />
                <span className="flex-1 text-left">Help & Support</span>
             </button>
          </div>

          <div className="space-y-3">
             <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Danger Zone</h4>
             <button 
                onClick={onResetData}
                className="w-full flex items-center gap-4 p-4 bg-red-950/10 rounded-xl border border-red-900/30 text-red-400 hover:bg-red-950/30 transition-colors"
             >
                <Trash2 size={20} />
                <span className="flex-1 text-left">Reset All Data</span>
             </button>
          </div>
       </div>
       
       <div className="py-6 text-center text-xs text-slate-600 font-mono">
          Close Your Tab v0.3.0
       </div>
    </div>
  );
};