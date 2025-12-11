import React, { useState, useEffect } from 'react';
import { ViewState, TabSession, Venue, TabStatus, TabItem } from './types';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { History } from './components/History';
import { Stats } from './components/Stats';
import { VenueList } from './components/VenueList';
import { Settings } from './components/Settings';
import { TabSheet } from './components/TabSheet';
import { suggestDrinkPrice } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('MAP');
  const [activeTab, setActiveTab] = useState<TabSession | null>(null);
  const [isTabSheetExpanded, setIsTabSheetExpanded] = useState(false);

  // Modal states
  const [isVenueListOpen, setIsVenueListOpen] = useState(false);

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
    const newTab: TabSession = {
      id: Date.now().toString(),
      venueName: venue.name,
      startTime: new Date().toISOString(),
      status: TabStatus.OPEN,
      drinks: [], // Legacy, keeping for compatibility
      items: [], // New item-based system
    };
    setActiveTab(newTab);
    setIsVenueListOpen(false);
    setIsTabSheetExpanded(true); // Open the sheet when starting a tab
  };

  // New item-based handlers
  const handleAddItem = (item: Omit<TabItem, 'id' | 'addedAt'>) => {
    if (!activeTab) return;

    const newItem: TabItem = {
      ...item,
      id: Date.now().toString(),
      addedAt: new Date().toISOString(),
    };

    setActiveTab({
      ...activeTab,
      items: [...(activeTab.items || []), newItem],
    });
  };

  const handleRemoveItem = (itemId: string) => {
    if (!activeTab) return;

    setActiveTab({
      ...activeTab,
      items: (activeTab.items || []).filter(item => item.id !== itemId),
    });
  };

  const handleUpdateItemPrice = (itemId: string, price: number) => {
    if (!activeTab) return;

    setActiveTab({
      ...activeTab,
      items: (activeTab.items || []).map(item =>
        item.id === itemId ? { ...item, price } : item
      ),
    });
  };

  // Legacy handlers for backwards compatibility
  const handleAddDrink = () => {
    if (!activeTab) return;
    const updatedTab = {
      ...activeTab,
      drinks: [
        ...activeTab.drinks,
        {
          id: Date.now().toString(),
          name: 'Drink',
          count: 1,
          priceEstimate: activeTab.drinks[0]?.priceEstimate || 12
        }
      ]
    };
    setActiveTab(updatedTab);
  };

  const handleRemoveDrink = () => {
    if (!activeTab || activeTab.drinks.length === 0) return;
    const updatedDrinks = [...activeTab.drinks];
    updatedDrinks.pop();
    setActiveTab({ ...activeTab, drinks: updatedDrinks });
  };

  const handleUpdatePrice = (newPrice: number) => {
      if(!activeTab) return;
      const updatedDrinks = activeTab.drinks.map(d => ({ ...d, priceEstimate: newPrice }));
      setActiveTab({ ...activeTab, drinks: updatedDrinks });
  }

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
    setIsTabSheetExpanded(false);
    setView('HISTORY');
  };

  const handleFabClick = () => {
    if (activeTab) {
      // Toggle sheet expansion instead of going to full screen view
      setIsTabSheetExpanded(!isTabSheetExpanded);
      setView('MAP'); // Make sure we're on map view
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
                onViewActiveTab={() => setIsTabSheetExpanded(true)}
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

        {/* Navigation Dock */}
        <Navigation
            currentView={view}
            onNavigate={handleNavClick}
            hasActiveTab={!!activeTab}
            onFabClick={handleFabClick}
        />

        {/* Tab Sheet - Overlay on map when there's an active tab */}
        {activeTab && view === 'MAP' && (
          <TabSheet
            session={activeTab}
            isExpanded={isTabSheetExpanded}
            onToggleExpand={() => setIsTabSheetExpanded(!isTabSheetExpanded)}
            onClose={() => setIsTabSheetExpanded(false)}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onCloseTab={handleCloseTab}
            onUpdateItemPrice={handleUpdateItemPrice}
          />
        )}

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