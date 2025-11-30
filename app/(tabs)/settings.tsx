import { useTabStore } from "@/store/useTabStore";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
	const { settings, updateSettings } = useTabStore();

	return (
		<SafeAreaView className="flex-1 bg-gray-50 dark:bg-black" edges={["top"]}>
			<View className="p-4">
				<Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
					Settings
				</Text>

				<View className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-4">
					<Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">
						Detection Radius
					</Text>
					<Text className="text-gray-500 dark:text-gray-400 mb-2">
						{settings.detectionRadius} meters
					</Text>
				</View>

				<View className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-4">
					<Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">
						Quiet Hours
					</Text>
					<View className="flex-row items-center justify-between mb-2">
						<Text className="text-gray-600 dark:text-gray-300">Start</Text>
						<TextInput
							className="bg-gray-100 dark:bg-gray-700 p-2 rounded w-20 text-center text-gray-900 dark:text-white"
							value={settings.quietHoursStart}
							onChangeText={(text) => updateSettings({ quietHoursStart: text })}
						/>
					</View>
					<View className="flex-row items-center justify-between">
						<Text className="text-gray-600 dark:text-gray-300">End</Text>
						<TextInput
							className="bg-gray-100 dark:bg-gray-700 p-2 rounded w-20 text-center text-gray-900 dark:text-white"
							value={settings.quietHoursEnd}
							onChangeText={(text) => updateSettings({ quietHoursEnd: text })}
						/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}
