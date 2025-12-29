import { mock } from "bun:test";

// Note: @testing-library/jest-native matchers are Jest-specific
// Bun's test runner uses its own expect() implementation

// Mock react-native with react-native-web for testing
mock.module("react-native", () => require("react-native-web"));

// Mock expo-location
mock.module("expo-location", () => ({
	requestForegroundPermissionsAsync: mock(() =>
		Promise.resolve({ status: "granted" })
	),
	requestBackgroundPermissionsAsync: mock(() =>
		Promise.resolve({ status: "granted" })
	),
	getCurrentPositionAsync: mock(() =>
		Promise.resolve({
			coords: { latitude: 40.7128, longitude: -74.006 },
		})
	),
	startLocationUpdatesAsync: mock(() => Promise.resolve()),
	stopLocationUpdatesAsync: mock(() => Promise.resolve()),
	Accuracy: { Balanced: 3 },
}));

// Mock expo-notifications
mock.module("expo-notifications", () => ({
	requestPermissionsAsync: mock(() =>
		Promise.resolve({ status: "granted" })
	),
	getPermissionsAsync: mock(() =>
		Promise.resolve({ status: "granted" })
	),
	scheduleNotificationAsync: mock(() => Promise.resolve("notification-id")),
	cancelAllScheduledNotificationsAsync: mock(() => Promise.resolve()),
	setNotificationHandler: mock(),
}));

// Mock expo-task-manager
mock.module("expo-task-manager", () => ({
	defineTask: mock(),
	isTaskRegisteredAsync: mock(() => Promise.resolve(false)),
	unregisterTaskAsync: mock(() => Promise.resolve()),
}));

// Mock @react-native-async-storage/async-storage
mock.module("@react-native-async-storage/async-storage", () => ({
	default: {
		getItem: mock(() => Promise.resolve(null)),
		setItem: mock(() => Promise.resolve()),
		removeItem: mock(() => Promise.resolve()),
		clear: mock(() => Promise.resolve()),
	},
}));

// Mock react-native-reanimated
mock.module("react-native-reanimated", () => {
	const React = require("react");
	return {
		default: {
			createAnimatedComponent: (Component: React.ComponentType) => Component,
			call: () => {},
			Value: class {
				constructor(val: number) {}
			},
		},
		useSharedValue: (initial: unknown) => ({ value: initial }),
		useAnimatedStyle: () => ({}),
		withTiming: (val: unknown) => val,
		withSpring: (val: unknown) => val,
		Easing: {
			linear: (t: number) => t,
			ease: (t: number) => t,
			quad: (t: number) => t * t,
			out: (fn: (t: number) => number) => fn,
			in: (fn: (t: number) => number) => fn,
		},
		interpolate: () => 0,
		Extrapolation: { CLAMP: "clamp" },
	};
});

// Mock @gorhom/bottom-sheet
mock.module("@gorhom/bottom-sheet", () => {
	const React = require("react");
	const RNW = require("react-native-web");

	return {
		default: React.forwardRef(({ children }: { children: React.ReactNode }, ref: unknown) =>
			React.createElement(RNW.View, { testID: "bottom-sheet" }, children)
		),
		BottomSheetView: ({ children }: { children: React.ReactNode }) =>
			React.createElement(RNW.View, { testID: "bottom-sheet-view" }, children),
		BottomSheetScrollView: ({ children }: { children: React.ReactNode }) =>
			React.createElement(RNW.ScrollView, { testID: "bottom-sheet-scroll" }, children),
		BottomSheetTextInput: (props: object) =>
			React.createElement(RNW.TextInput, { ...props, testID: "bottom-sheet-input" }),
		BottomSheetBackdrop: () => null,
	};
});

// Mock react-native-gesture-handler
mock.module("react-native-gesture-handler", () => {
	const React = require("react");
	const RNW = require("react-native-web");

	return {
		GestureHandlerRootView: ({ children }: { children: React.ReactNode }) =>
			React.createElement(RNW.View, null, children),
		Gesture: {
			Pan: () => ({}),
			Tap: () => ({}),
		},
		GestureDetector: ({ children }: { children: React.ReactNode }) => children,
		ScrollView: RNW.ScrollView,
		State: {},
		PanGestureHandler: RNW.View,
		TapGestureHandler: RNW.View,
	};
});

// Mock expo-haptics
mock.module("expo-haptics", () => ({
	impactAsync: mock(() => Promise.resolve()),
	notificationAsync: mock(() => Promise.resolve()),
	selectionAsync: mock(() => Promise.resolve()),
	ImpactFeedbackStyle: { Light: "light", Medium: "medium", Heavy: "heavy" },
	NotificationFeedbackType: { Success: "success", Warning: "warning", Error: "error" },
}));

// Mock @expo/vector-icons
mock.module("@expo/vector-icons", () => {
	const React = require("react");
	const RNW = require("react-native-web");

	const createIconComponent = () =>
		function MockIcon({ name, testID }: { name: string; testID?: string }) {
			return React.createElement(RNW.Text, { testID: testID ?? `icon-${name}` }, name);
		};

	return {
		Ionicons: createIconComponent(),
		MaterialIcons: createIconComponent(),
		FontAwesome: createIconComponent(),
	};
});

// Mock lucide-react-native
mock.module("lucide-react-native", () => {
	const React = require("react");
	const RNW = require("react-native-web");

	const createIcon = (name: string) =>
		function MockIcon({ testID }: { testID?: string }) {
			return React.createElement(RNW.Text, { testID: testID ?? `lucide-${name}` }, name);
		};

	return new Proxy(
		{},
		{
			get: (_target, prop) => createIcon(String(prop)),
		}
	);
});

// Mock react-native-maps
mock.module("react-native-maps", () => {
	const React = require("react");
	const RNW = require("react-native-web");

	const MapView = React.forwardRef(
		({ children, testID }: { children: React.ReactNode; testID?: string }, ref: unknown) =>
			React.createElement(RNW.View, { testID: testID ?? "map-view" }, children)
	);

	return {
		default: MapView,
		Marker: ({ testID }: { testID?: string }) =>
			React.createElement(RNW.View, { testID: testID ?? "map-marker" }),
		PROVIDER_GOOGLE: "google",
	};
});

// Mock @rn-primitives/slot
mock.module("@rn-primitives/slot", () => {
	const React = require("react");

	const Slot = React.forwardRef(({ children, ...props }: { children: React.ReactNode }, ref: unknown) => {
		if (React.Children.count(children) === 0) {
			return null;
		}
		return React.Children.map(children, (child) => {
			if (!React.isValidElement(child)) return child;
			return React.cloneElement(child as React.ReactElement, { ...props, ref });
		});
	});

	return {
		Slot,
		Slottable: ({ children }: { children: React.ReactNode }) => children,
	};
});

// Silence console warnings in tests
const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
	if (
		typeof args[0] === "string" &&
		(args[0].includes("Animated:") || args[0].includes("useNativeDriver"))
	) {
		return;
	}
	originalWarn(...args);
};
