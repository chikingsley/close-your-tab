export enum TabStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface TabItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: 'beer' | 'wine' | 'cocktail' | 'shot' | 'food' | 'other';
  addedAt: string; // ISO timestamp
}

// Keep Drink for backwards compatibility
export interface Drink {
  id: string;
  name: string;
  count: number;
  priceEstimate: number;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  type: string;
  distance: string;
  lat: number;
  lng: number;
}

export interface TabSession {
  id: string;
  venueName: string;
  startTime: string; // ISO string
  endTime?: string; // ISO string
  status: TabStatus;
  drinks: Drink[]; // Legacy support
  items?: TabItem[]; // New item-based system
  totalAmount?: number;
  tipAmount?: number;
  notes?: string;
}

export interface TabContextType {
  activeTab: TabSession | null;
  history: TabSession[];
  startTab: (venue: Venue) => void;
  closeTab: (total: number, tip: number) => void;
  addDrink: () => void;
  removeDrink: () => void;
  updateDrinkPrice: (price: number) => void;
}

export type ViewState = 'MAP' | 'HISTORY' | 'STATS' | 'SETTINGS' | 'ACTIVE_TAB_VIEW';