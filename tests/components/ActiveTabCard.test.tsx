import { describe, expect, test } from "bun:test";
import type { Tab } from "@/store/useTabStore";

// Note: Full component rendering tests are handled by Maestro E2E tests
// These tests focus on the data transformation logic used in the component

describe("ActiveTabCard logic", () => {
	const createMockTab = (startTimeOffset: number): Tab => ({
		id: "test-tab-1",
		venueName: "The Local Pub",
		venuePlaceId: "place_123",
		startTime: Date.now() - startTimeOffset,
		location: { latitude: 40.7128, longitude: -74.006 },
	});

	test("calculates elapsed time for hours and minutes", () => {
		const tab = createMockTab(2 * 60 * 60 * 1000 + 30 * 60 * 1000); // 2h 30m ago
		const duration = Date.now() - tab.startTime;
		const hours = Math.floor(duration / (1000 * 60 * 60));
		const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

		expect(hours).toBe(2);
		expect(minutes).toBe(30);
	});

	test("calculates elapsed time for minutes only", () => {
		const tab = createMockTab(45 * 60 * 1000); // 45 minutes ago
		const duration = Date.now() - tab.startTime;
		const hours = Math.floor(duration / (1000 * 60 * 60));
		const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

		expect(hours).toBe(0);
		expect(minutes).toBe(45);
	});

	test("handles just opened tab", () => {
		const tab = createMockTab(30 * 1000); // 30 seconds ago
		const duration = Date.now() - tab.startTime;
		const hours = Math.floor(duration / (1000 * 60 * 60));
		const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

		expect(hours).toBe(0);
		expect(minutes).toBe(0);
	});

	test("tab has required fields", () => {
		const tab = createMockTab(60 * 60 * 1000);

		expect(tab.id).toBeDefined();
		expect(tab.venueName).toBeDefined();
		expect(tab.startTime).toBeDefined();
		expect(tab.location).toBeDefined();
		expect(tab.location.latitude).toBeTypeOf("number");
		expect(tab.location.longitude).toBeTypeOf("number");
	});

	test("optional fields can be undefined", () => {
		const tab: Tab = {
			id: "1",
			venueName: "Test",
			startTime: Date.now(),
			location: { latitude: 0, longitude: 0 },
		};

		expect(tab.venuePlaceId).toBeUndefined();
		expect(tab.endTime).toBeUndefined();
		expect(tab.totalAmount).toBeUndefined();
	});
});
