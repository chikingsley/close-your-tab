export enum TabStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface TabItem {
  id: string;
  name: string;
  count: number;
  price: number;
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
  items: TabItem[];
  totalAmount?: number;
  tipAmount?: number;
  notes?: string;
}

export interface TabContextType {
  activeTab: TabSession | null;
  history: TabSession[];
  startTab: (venue: Venue) => void;
  closeTab: (total: number, tip: number) => void;
  addItem: (name: string, price: number) => void;
  updateItemCount: (itemId: string, delta: number) => void;
}

export type ViewState = 'MAP' | 'HISTORY' | 'STATS' | 'SETTINGS' | 'ACTIVE_TAB_VIEW';