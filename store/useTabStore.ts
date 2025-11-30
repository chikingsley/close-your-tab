import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Tab {
	id: string;
	venueName: string;
	startTime: number;
	endTime?: number;
	totalAmount?: number;
	location: {
		latitude: number;
		longitude: number;
	};
}

interface TabState {
	activeTab: Tab | null;
	history: Tab[];
	settings: {
		detectionRadius: number; // in meters
		quietHoursStart: string; // HH:mm
		quietHoursEnd: string; // HH:mm
	};
	setActiveTab: (tab: Tab | null) => void;
	addToHistory: (tab: Tab) => void;
	updateSettings: (settings: Partial<TabState["settings"]>) => void;
}

export const useTabStore = create<TabState>()(
	persist(
		(set) => ({
			activeTab: null,
			history: [],
			settings: {
				detectionRadius: 100,
				quietHoursStart: "23:00",
				quietHoursEnd: "07:00",
			},
			setActiveTab: (tab) => set({ activeTab: tab }),
			addToHistory: (tab) =>
				set((state) => ({ history: [tab, ...state.history] })),
			updateSettings: (newSettings) =>
				set((state) => ({ settings: { ...state.settings, ...newSettings } })),
		}),
		{
			name: "tab-storage",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
