import { HistoryList } from "@/components/HistoryList";
import { useTabStore } from "@/store/useTabStore";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryScreen() {
	const { history } = useTabStore();

	return (
		<SafeAreaView className="flex-1 bg-gray-50 dark:bg-black" edges={["top"]}>
			<View className="p-4 flex-1">
				<Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
					History
				</Text>
				<HistoryList history={history} />
			</View>
		</SafeAreaView>
	);
}
