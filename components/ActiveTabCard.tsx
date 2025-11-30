import { format } from "date-fns";
import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { Tab } from "../store/useTabStore";

interface ActiveTabCardProps {
	tab: Tab;
	onClose: () => void;
}

export const ActiveTabCard: React.FC<ActiveTabCardProps> = ({
	tab,
	onClose,
}) => {
	const duration = Date.now() - tab.startTime;
	const hours = Math.floor(duration / (1000 * 60 * 60));
	const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

	return (
		<View className="bg-blue-500 rounded-xl p-6 shadow-lg mx-4 my-4">
			<Text className="text-white text-lg font-bold mb-1">Active Tab</Text>
			<Text className="text-white text-3xl font-extrabold mb-2">
				{tab.venueName}
			</Text>
			<View className="flex-row items-center mb-6">
				<Text className="text-blue-100 text-base">
					Opened at {format(tab.startTime, "h:mm a")} • {hours}h {minutes}m ago
				</Text>
			</View>

			<TouchableOpacity
				onPress={onClose}
				className="bg-white py-3 px-6 rounded-full items-center active:bg-gray-100"
			>
				<Text className="text-blue-600 font-bold text-lg">Close Tab</Text>
			</TouchableOpacity>
		</View>
	);
};
