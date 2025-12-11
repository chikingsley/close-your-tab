import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Tab {
	id: string;
	venueName: string;
	venuePlaceId?: string;
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
	favoriteVenueIds: string[]; // Google Place IDs
	settings: {
		detectionRadius: number; // in meters
		quietHoursStart: string; // HH:mm
		quietHoursEnd: string; // HH:mm
	};
	setActiveTab: (tab: Tab | null) => void;
	addToHistory: (tab: Tab) => void;
	toggleFavorite: (placeId: string) => void;
	isFavorite: (placeId: string) => boolean;
	updateSettings: (settings: Partial<TabState["settings"]>) => void;
}

export const useTabStore = create<TabState>()(
	persist(
		(set, get) => ({
			activeTab: null,
			history: [],
			favoriteVenueIds: [],
			settings: {
				detectionRadius: 100,
				quietHoursStart: "23:00",
				quietHoursEnd: "07:00",
			},
			setActiveTab: (tab) => set({ activeTab: tab }),
			addToHistory: (tab) =>
				set((state) => ({ history: [tab, ...state.history] })),
			toggleFavorite: (placeId) =>
				set((state) => ({
					favoriteVenueIds: state.favoriteVenueIds.includes(placeId)
						? state.favoriteVenueIds.filter((id) => id !== placeId)
						: [...state.favoriteVenueIds, placeId],
				})),
			isFavorite: (placeId) => get().favoriteVenueIds.includes(placeId),
			updateSettings: (newSettings) =>
				set((state) => ({ settings: { ...state.settings, ...newSettings } })),
		}),
		{
			name: "tab-storage",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
