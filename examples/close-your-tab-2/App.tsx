import React, { useState, useEffect } from 'react';
import { ViewState, TabSession, Venue, TabStatus } from './types';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { History } from './components/History';
import { Stats } from './components/Stats';
import { VenueList } from './components/VenueList';
import { Settings } from './components/Settings';
import { suggestDrinkPrice } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('MAP');
  const [activeTab, setActiveTab] = useState<TabSession | null>(null);

  // Modal states
  const [isVenueListOpen, setIsVenueListOpen] = useState(false);
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);

  const [history, setHistory] = useState<TabSession[]>(() => {
    const saved = localStorage.getItem('cyt_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist history
  useEffect(() => {
    localStorage.setItem('cyt_history', JSON.stringify(history));
  }, [history]);

  // Persist active tab
  useEffect(() => {
    const savedTab = localStorage.getItem('cyt_active_tab');
    if (savedTab) {
      setActiveTab(JSON.parse(savedTab));
    }
  }, []);

  useEffect(() => {
    if (activeTab) {
      localStorage.setItem('cyt_active_tab', JSON.stringify(activeTab));
    } else {
      localStorage.removeItem('cyt_active_tab');
    }
  }, [activeTab]);

  const handleStartTab = async (venue: Venue) => {
    const estimatedPrice = await suggestDrinkPrice(venue.name);

    const newTab: TabSession = {
      id: Date.now().toString(),
      venueName: venue.name,
      startTime: new Date().toISOString(),
      status: TabStatus.OPEN,
      items: [{
         id: 'init-drink',
         name: 'Drink 1',
         count: 1,
         price: estimatedPrice
      }],
    };
    setActiveTab(newTab);
    setIsVenueListOpen(false);
    setView('MAP');
  };

  const handleAddItem = (name: string, price: number) => {
    if (!activeTab) return;
    const updatedTab = {
      ...activeTab,
      items: [
        ...activeTab.items,
        {
          id: Date.now().toString(),
          name,
          count: 1,
          price
        }
      ]
    };
    setActiveTab(updatedTab);
  };

  const handleUpdateItemCount = (itemId: string, delta: number) => {
    if (!activeTab) return;
    const updatedItems = activeTab.items
      .map(item => item.id === itemId ? { ...item, count: item.count + delta } : item)
      .filter(item => item.count > 0);
    setActiveTab({ ...activeTab, items: updatedItems });
  };

  // Quick add drink from bottom sheet (uses default price from first item)
  const handleQuickAddDrink = () => {
    if (!activeTab) return;
    const defaultPrice = activeTab.items[0]?.price || 12;
    handleAddItem('Drink', defaultPrice);
  };

  const handleCloseTab = (total: number, tip: number) => {
    if (!activeTab) return;

    const closedTab: TabSession = {
      ...activeTab,
      endTime: new Date().toISOString(),
      status: TabStatus.CLOSED,
      totalAmount: total,
      tipAmount: tip
    };

    setHistory((prev) => [closedTab, ...prev]);
    setActiveTab(null);
    setIsSheetExpanded(false);
    setView('HISTORY');
  };

  const handleFabClick = () => {
    if (activeTab) {
      // Toggle sheet expansion instead of navigating
      setIsSheetExpanded(!isSheetExpanded);
      setView('MAP'); // Ensure we're on map view
    } else {
      setIsVenueListOpen(true);
    }
  };

  const handleNavClick = (newView: ViewState) => {
    setView(newView);
  };

  const handleResetData = () => {
    if(confirm("Are you sure? This cannot be undone.")) {
        setHistory([]);
        setActiveTab(null);
        localStorage.removeItem('cyt_history');
        localStorage.removeItem('cyt_active_tab');
        setView('MAP');
    }
  };

  // Main Content Renderer
  const renderMainView = () => {
    return (
      <>
        {/* Map View - Always mounted but hidden if not active to preserve map state */}
        <div className={`absolute inset-0 ${view !== 'MAP' ? 'invisible' : 'visible'}`}>
            <Home
                activeTab={activeTab}
                onStartTab={handleStartTab}
                hasActiveTab={!!activeTab}
                onAddDrink={handleQuickAddDrink}
                onAddItem={handleAddItem}
                onUpdateItemCount={handleUpdateItemCount}
                onCloseTab={handleCloseTab}
                isSheetExpanded={isSheetExpanded}
                onSheetExpandedChange={setIsSheetExpanded}
            />
        </div>

        {view === 'HISTORY' && (
            <div className="absolute inset-0 bg-slate-950 z-20 overflow-hidden pb-20">
                <History history={history} />
            </div>
        )}

        {view === 'STATS' && (
            <div className="absolute inset-0 bg-slate-950 z-20 overflow-hidden pb-20">
                <Stats history={history} />
            </div>
        )}

        {view === 'SETTINGS' && (
            <div className="absolute inset-0 bg-slate-950 z-20 overflow-hidden pb-20">
                <Settings onResetData={handleResetData} />
            </div>
        )}
      </>
    );
  };

  return (
    <div className="h-screen w-full bg-slate-950 text-slate-50 flex justify-center">
      <div className="w-full max-w-md h-full bg-slate-950 relative shadow-2xl overflow-hidden flex flex-col">
        
        {/* Main View Area */}
        <main className="flex-1 relative overflow-hidden">
             {renderMainView()}
        </main>
        
        {/* Navigation Dock - Always visible */}
        <Navigation
            currentView={view}
            onNavigate={handleNavClick}
            hasActiveTab={!!activeTab}
            onFabClick={handleFabClick}
        />

        {/* Venue List Modal */}
        <VenueList 
            isOpen={isVenueListOpen} 
            onClose={() => setIsVenueListOpen(false)} 
            onSelectVenue={handleStartTab}
        />

      </div>
    </div>
  );
};

export default App;