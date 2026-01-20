import { beforeEach, describe, expect, test } from "bun:test";
import { useTabStore, type Tab } from "@/store/useTabStore";

describe("useTabStore", () => {
	beforeEach(() => {
		// Reset store to initial state before each test
		useTabStore.setState({
			activeTab: null,
			history: [],
			favoriteVenueIds: [],
			settings: {
				detectionRadius: 100,
				quietHoursStart: "23:00",
				quietHoursEnd: "07:00",
			},
		});
	});

	describe("activeTab management", () => {
		test("should set active tab", () => {
			const tab: Tab = {
				id: "1",
				venueName: "Test Bar",
				startTime: Date.now(),
				location: { latitude: 40.7128, longitude: -74.006 },
			};

			useTabStore.getState().setActiveTab(tab);
			expect(useTabStore.getState().activeTab).toEqual(tab);
		});

		test("should clear active tab", () => {
			const tab: Tab = {
				id: "1",
				venueName: "Test Bar",
				startTime: Date.now(),
				location: { latitude: 40.7128, longitude: -74.006 },
			};

			useTabStore.getState().setActiveTab(tab);
			useTabStore.getState().setActiveTab(null);
			expect(useTabStore.getState().activeTab).toBeNull();
		});
	});

	describe("history management", () => {
		test("should add tab to history", () => {
			const tab: Tab = {
				id: "1",
				venueName: "Test Bar",
				startTime: Date.now() - 3600000,
				endTime: Date.now(),
				totalAmount: 45.0,
				location: { latitude: 40.7128, longitude: -74.006 },
			};

			useTabStore.getState().addToHistory(tab);
			expect(useTabStore.getState().history).toHaveLength(1);
			expect(useTabStore.getState().history[0]).toEqual(tab);
		});

		test("should prepend new tabs to history", () => {
			const tab1: Tab = {
				id: "1",
				venueName: "First Bar",
				startTime: Date.now() - 7200000,
				endTime: Date.now() - 3600000,
				totalAmount: 30.0,
				location: { latitude: 40.7128, longitude: -74.006 },
			};

			const tab2: Tab = {
				id: "2",
				venueName: "Second Bar",
				startTime: Date.now() - 3600000,
				endTime: Date.now(),
				totalAmount: 45.0,
				location: { latitude: 40.7129, longitude: -74.007 },
			};

			useTabStore.getState().addToHistory(tab1);
			useTabStore.getState().addToHistory(tab2);

			expect(useTabStore.getState().history).toHaveLength(2);
			expect(useTabStore.getState().history[0].id).toBe("2"); // Most recent first
			expect(useTabStore.getState().history[1].id).toBe("1");
		});
	});

	describe("favorites management", () => {
		test("should add venue to favorites", () => {
			useTabStore.getState().toggleFavorite("place_123");
			expect(useTabStore.getState().favoriteVenueIds).toContain("place_123");
			expect(useTabStore.getState().isFavorite("place_123")).toBe(true);
		});

		test("should remove venue from favorites", () => {
			useTabStore.getState().toggleFavorite("place_123");
			useTabStore.getState().toggleFavorite("place_123");
			expect(useTabStore.getState().favoriteVenueIds).not.toContain("place_123");
			expect(useTabStore.getState().isFavorite("place_123")).toBe(false);
		});

		test("should handle multiple favorites", () => {
			useTabStore.getState().toggleFavorite("place_1");
			useTabStore.getState().toggleFavorite("place_2");
			useTabStore.getState().toggleFavorite("place_3");

			expect(useTabStore.getState().favoriteVenueIds).toHaveLength(3);
			expect(useTabStore.getState().isFavorite("place_1")).toBe(true);
			expect(useTabStore.getState().isFavorite("place_2")).toBe(true);
			expect(useTabStore.getState().isFavorite("place_3")).toBe(true);
		});
	});

	describe("settings management", () => {
		test("should update detection radius", () => {
			useTabStore.getState().updateSettings({ detectionRadius: 150 });
			expect(useTabStore.getState().settings.detectionRadius).toBe(150);
		});

		test("should update quiet hours", () => {
			useTabStore.getState().updateSettings({
				quietHoursStart: "22:00",
				quietHoursEnd: "08:00",
			});
			expect(useTabStore.getState().settings.quietHoursStart).toBe("22:00");
			expect(useTabStore.getState().settings.quietHoursEnd).toBe("08:00");
		});

		test("should preserve other settings when updating one", () => {
			const originalRadius = useTabStore.getState().settings.detectionRadius;
			useTabStore.getState().updateSettings({ quietHoursStart: "21:00" });
			expect(useTabStore.getState().settings.detectionRadius).toBe(originalRadius);
		});
	});

	describe("initial state", () => {
		test("should have correct default values", () => {
			const state = useTabStore.getState();
			expect(state.activeTab).toBeNull();
			expect(state.history).toEqual([]);
			expect(state.favoriteVenueIds).toEqual([]);
			expect(state.settings.detectionRadius).toBe(100);
			expect(state.settings.quietHoursStart).toBe("23:00");
			expect(state.settings.quietHoursEnd).toBe("07:00");
		});
	});
});
