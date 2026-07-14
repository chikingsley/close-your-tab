import { HistoryList } from "@/components/HistoryList";
import { useTabStore } from "@/store/useTabStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InsightsScreen() {
	const { history } = useTabStore();
	const router = useRouter();
	const { colorScheme } = useColorScheme();

	// Calculate basic stats
	const totalSpent = history.reduce(
		(sum, tab) => sum + (tab.totalAmount || 0),
		0,
	);
	const avgTab = history.length > 0 ? totalSpent / history.length : 0;
	const thisMonth = history.filter((tab) => {
		const tabDate = new Date(tab.startTime);
		const now = new Date();
		return (
			tabDate.getMonth() === now.getMonth() &&
			tabDate.getFullYear() === now.getFullYear()
		);
	});
	const monthlySpent = thisMonth.reduce(
		(sum, tab) => sum + (tab.totalAmount || 0),
		0,
	);

	return (
		<SafeAreaView className="flex-1 bg-gray-50 dark:bg-black" edges={["top"]}>
			<View className="p-4 flex-1">
				<View className="flex-row items-center justify-between mb-4">
					<Text className="text-2xl font-bold text-gray-900 dark:text-white">
						Insights
					</Text>
					<TouchableOpacity
						onPress={() => router.push("/settings")}
						hitSlop={8}
					>
						<Ionicons
							name="settings-outline"
							size={24}
							color={colorScheme === "dark" ? "#fff" : "#007AFF"}
						/>
					</TouchableOpacity>
				</View>

				{/* Stats Cards */}
				<View className="flex-row gap-3 mb-6">
					<View className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl">
						<View className="flex-row items-center mb-1">
							<Ionicons name="calendar-outline" size={16} color="#666" />
							<Text className="text-gray-500 dark:text-gray-400 text-xs ml-1">
								This Month
							</Text>
						</View>
						<Text className="text-xl font-bold text-gray-900 dark:text-white">
							${monthlySpent.toFixed(0)}
						</Text>
					</View>
					<View className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl">
						<View className="flex-row items-center mb-1">
							<Ionicons name="receipt-outline" size={16} color="#666" />
							<Text className="text-gray-500 dark:text-gray-400 text-xs ml-1">
								Avg Tab
							</Text>
						</View>
						<Text className="text-xl font-bold text-gray-900 dark:text-white">
							${avgTab.toFixed(0)}
						</Text>
					</View>
					<View className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl">
						<View className="flex-row items-center mb-1">
							<Ionicons name="time-outline" size={16} color="#666" />
							<Text className="text-gray-500 dark:text-gray-400 text-xs ml-1">
								Total Tabs
							</Text>
						</View>
						<Text className="text-xl font-bold text-gray-900 dark:text-white">
							{history.length}
						</Text>
					</View>
				</View>

				{/* History Section */}
				<Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
					History
				</Text>
				<HistoryList history={history} />
			</View>
		</SafeAreaView>
	);
}
