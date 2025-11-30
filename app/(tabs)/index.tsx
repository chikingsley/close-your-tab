import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ActiveTabCard } from "@/components/ActiveTabCard";
import { CloseTabModal } from "@/components/CloseTabModal";
import { HistoryList } from "@/components/HistoryList";
import { getCurrentLocation } from "@/services/LocationService";
import { identifyVenue } from "@/services/VenueService";
import { useTabStore } from "@/store/useTabStore";

export default function HomeScreen() {
	const { activeTab, setActiveTab, history, addToHistory } = useTabStore();
	const [isDetecting, setIsDetecting] = useState(false);
	const [showCloseModal, setShowCloseModal] = useState(false);

	const handleOpenTab = async () => {
		setIsDetecting(true);
		try {
			// Get current location
			const location = await getCurrentLocation();
			if (!location) {
				Alert.alert("Location Error", "Could not get your current location. Please check your permissions.");
				return;
			}

			// Try to identify venue
			const venue = await identifyVenue(
				location.coords.latitude,
				location.coords.longitude
			);

			if (venue) {
				setActiveTab({
					id: Date.now().toString(),
					venueName: venue.name,
					startTime: Date.now(),
					location: {
						latitude: venue.location.latitude,
						longitude: venue.location.longitude,
					},
				});
			} else {
				// No venue detected - ask for manual input or use current location
				Alert.alert(
					"No Venue Detected",
					"We couldn't detect a bar or restaurant nearby. Would you like to open a tab at your current location?",
					[
						{ text: "Cancel", style: "cancel" },
						{
							text: "Open Tab Here",
							onPress: () => {
								setActiveTab({
									id: Date.now().toString(),
									venueName: "Unknown Location",
									startTime: Date.now(),
									location: {
										latitude: location.coords.latitude,
										longitude: location.coords.longitude,
									},
								});
							},
						},
					]
				);
			}
		} catch (error) {
			console.error("Error opening tab:", error);
			Alert.alert("Error", "Something went wrong. Please try again.");
		} finally {
			setIsDetecting(false);
		}
	};

	const handleCloseTab = () => {
		setShowCloseModal(true);
	};

	const handleConfirmClose = (amount: number) => {
		if (activeTab) {
			addToHistory({
				...activeTab,
				endTime: Date.now(),
				totalAmount: amount,
			});
			setActiveTab(null);
		}
		setShowCloseModal(false);
	};

	return (
		<SafeAreaView className="flex-1 bg-gray-50 dark:bg-black" edges={["top"]}>
			<ScrollView contentContainerClassName="pb-20">
				<View className="p-4">
					<Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
						Tab Tracker
					</Text>

					{activeTab ? (
						<ActiveTabCard tab={activeTab} onClose={handleCloseTab} />
					) : (
						<View className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-6 items-center">
							<Text className="text-gray-500 dark:text-gray-400 text-lg mb-4">
								No active tab
							</Text>
							<TouchableOpacity
								onPress={handleOpenTab}
								disabled={isDetecting}
								className={`py-3 px-6 rounded-full flex-row items-center ${
									isDetecting ? "bg-blue-300" : "bg-blue-500"
								}`}
							>
								{isDetecting && (
									<ActivityIndicator color="white" size="small" className="mr-2" />
								)}
								<Text className="text-white font-bold text-lg">
									{isDetecting ? "Detecting Venue..." : "Open Tab"}
								</Text>
							</TouchableOpacity>
						</View>
					)}

					<Text className="text-xl font-bold text-gray-900 dark:text-white mb-2 mt-4">
						Recent History
					</Text>
					<HistoryList history={history.slice(0, 3)} scrollable={false} />
				</View>
			</ScrollView>

			<CloseTabModal
				visible={showCloseModal}
				venueName={activeTab?.venueName ?? ""}
				onClose={() => setShowCloseModal(false)}
				onConfirm={handleConfirmClose}
			/>
		</SafeAreaView>
	);
}
