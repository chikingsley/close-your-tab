import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
	const { colorScheme } = useColorScheme();
	const router = useRouter();
	const isDark = colorScheme === "dark";

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: isDark ? "#fff" : "#007AFF",
				tabBarInactiveTintColor: isDark ? "#666" : "#8E8E93",
				tabBarStyle: {
					backgroundColor: isDark ? "#000" : "#fff",
					borderTopColor: isDark ? "#1c1c1e" : "#e5e5ea",
				},
				headerStyle: {
					backgroundColor: isDark ? "#000" : "#fff",
				},
				headerTintColor: isDark ? "#fff" : "#000",
				headerRight: () => (
					<TouchableOpacity
						onPress={() => router.push("/settings")}
						className="mr-4"
					>
						<Ionicons
							name="settings-outline"
							size={24}
							color={isDark ? "#fff" : "#007AFF"}
						/>
					</TouchableOpacity>
				),
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Map",
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="map" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="insights"
				options={{
					title: "Insights",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="stats-chart" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
