import { format } from "date-fns";
import type React from "react";
import { FlatList, Text, View } from "react-native";
import type { Tab } from "../store/useTabStore";

interface HistoryListProps {
	history: Tab[];
	scrollable?: boolean;
}

const HistoryItem: React.FC<{ item: Tab }> = ({ item }) => (
	<View className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
		<View className="flex-row justify-between items-start mb-2">
			<Text className="text-lg font-bold text-gray-900 dark:text-white">
				{item.venueName}
			</Text>
			<Text className="text-gray-500 dark:text-gray-400 text-sm">
				{format(item.startTime, "MMM d")}
			</Text>
		</View>
		<View className="flex-row justify-between items-center">
			<Text className="text-gray-600 dark:text-gray-300">
				{format(item.startTime, "h:mm a")} -{" "}
				{item.endTime ? format(item.endTime, "h:mm a") : "Now"}
			</Text>
			{item.totalAmount && (
				<Text className="text-green-600 font-bold">
					${item.totalAmount.toFixed(2)}
				</Text>
			)}
		</View>
	</View>
);

export const HistoryList: React.FC<HistoryListProps> = ({ history, scrollable = true }) => {
	if (history.length === 0) {
		return (
			<View className="flex-1 justify-center items-center p-8">
				<Text className="text-gray-400 text-lg text-center">
					No history yet. Go out and have fun!
				</Text>
			</View>
		);
	}

	if (!scrollable) {
		return (
			<View className="gap-4">
				{history.map((item) => (
					<HistoryItem key={item.id} item={item} />
				))}
			</View>
		);
	}

	return (
		<FlatList
			data={history}
			keyExtractor={(item) => item.id}
			contentContainerClassName="p-4 gap-4"
			renderItem={({ item }) => <HistoryItem item={item} />}
		/>
	);
};
