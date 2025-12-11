import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import MapView, { Marker, type Region } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MapFilterChips, type VenueFilter } from "@/components/MapFilterChips";
import { TabBottomSheet } from "@/components/TabBottomSheet";
import { VenueChip } from "@/components/VenueChip";
import { getCurrentLocation } from "@/services/LocationService";
import { searchNearbyVenues, type Venue } from "@/services/VenueService";
import { useTabStore } from "@/store/useTabStore";

// Old Town Scottsdale - good stress test with many bars/clubs
const SCOTTSDALE_OLD_TOWN: Region = {
	latitude: 33.4942,
	longitude: -111.9261,
	latitudeDelta: 0.008,
	longitudeDelta: 0.008,
};

const VENUE_SEARCH_RADIUS = 500; // meters
const MIN_ZOOM_FOR_MARKERS = 0.015; // Only show markers when zoomed in enough (smaller = more zoomed)

export default function MapScreen() {
	const insets = useSafeAreaInsets();
	const mapRef = useRef<MapView>(null);
	const { activeTab, setActiveTab, addToHistory, favoriteVenueIds } =
		useTabStore();

	const [region, setRegion] = useState<Region>(SCOTTSDALE_OLD_TOWN);
	const [venues, setVenues] = useState<Venue[]>([]);
	const [isLoadingVenues, setIsLoadingVenues] = useState(true);
	const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
	const [filter, setFilter] = useState<VenueFilter>("all");
	const [isZoomedEnough, setIsZoomedEnough] = useState(true);

	// Debounce timer for fetching venues on region change
	const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Fetch venues for current region
	const fetchVenues = useCallback(async (lat: number, lng: number) => {
		setIsLoadingVenues(true);
		try {
			const results = await searchNearbyVenues(lat, lng, VENUE_SEARCH_RADIUS);
			// Only update if we got results, to prevent flickering/crashes
			if (results && results.length > 0) {
				setVenues(results);
				setHasLoadedOnce(true);
			}
		} catch (error) {
			console.error("Error fetching venues:", error);
		} finally {
			setIsLoadingVenues(false);
		}
	}, []);

	// Fetch venues on mount
	useEffect(() => {
		fetchVenues(SCOTTSDALE_OLD_TOWN.latitude, SCOTTSDALE_OLD_TOWN.longitude);
	}, [fetchVenues]);

	// Debounced fetch on region change
	const handleRegionChange = useCallback(
		(newRegion: Region) => {
			setRegion(newRegion);

			// Check if zoomed in enough to show markers
			setIsZoomedEnough(newRegion.latitudeDelta <= MIN_ZOOM_FOR_MARKERS);

			// Clear existing timeout
			if (fetchTimeoutRef.current) {
				clearTimeout(fetchTimeoutRef.current);
			}

			// Only fetch if zoomed in enough
			if (newRegion.latitudeDelta <= MIN_ZOOM_FOR_MARKERS) {
				// Debounce fetch by 1 second to prevent rapid re-renders
				fetchTimeoutRef.current = setTimeout(() => {
					fetchVenues(newRegion.latitude, newRegion.longitude);
				}, 1000);
			}
		},
		[fetchVenues]
	);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (fetchTimeoutRef.current) {
				clearTimeout(fetchTimeoutRef.current);
			}
		};
	}, []);

	// Filter venues based on selected filter
	const filteredVenues = useMemo(() => {
		return venues.filter((venue) => {
			if (filter === "all") return true;
			if (filter === "favorites") return favoriteVenueIds.includes(venue.placeId);
			if (filter === "bars") {
				return venue.types.some((t) => ["bar", "night_club"].includes(t));
			}
			if (filter === "restaurants") {
				return venue.types.some((t) => ["restaurant", "cafe"].includes(t));
			}
			return true;
		});
	}, [venues, filter, favoriteVenueIds]);

	// Handle venue marker press - open tab at that venue
	const handleVenuePress = useCallback((venue: Venue) => {
		if (activeTab) {
			// Already have a tab open - ignore tap on other venues
			return;
		}
		// Open tab directly
		setActiveTab({
			id: Date.now().toString(),
			venueName: venue.name,
			venuePlaceId: venue.placeId,
			startTime: Date.now(),
			location: {
				latitude: venue.location.latitude,
				longitude: venue.location.longitude,
			},
		});
	}, [activeTab, setActiveTab]);

	// Handle closing tab from bottom sheet
	const handleCloseTab = useCallback((amount: number, tip: number) => {
		if (activeTab) {
			addToHistory({
				...activeTab,
				endTime: Date.now(),
				totalAmount: amount,
			});
			setActiveTab(null);
		}
	}, [activeTab, addToHistory, setActiveTab]);

	const centerOnUser = async () => {
		const location = await getCurrentLocation();
		if (location && mapRef.current) {
			const userRegion = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.008,
				longitudeDelta: 0.008,
			};
			mapRef.current.animateToRegion(userRegion, 500);
			fetchVenues(location.coords.latitude, location.coords.longitude);
		}
	};

	const zoomIn = () => {
		if (mapRef.current) {
			const newRegion = {
				...region,
				latitudeDelta: region.latitudeDelta / 2,
				longitudeDelta: region.longitudeDelta / 2,
			};
			mapRef.current.animateToRegion(newRegion, 300);
		}
	};

	const zoomOut = () => {
		if (mapRef.current) {
			const newRegion = {
				...region,
				latitudeDelta: Math.min(region.latitudeDelta * 2, 0.5),
				longitudeDelta: Math.min(region.longitudeDelta * 2, 0.5),
			};
			mapRef.current.animateToRegion(newRegion, 300);
		}
	};

	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.map}
				initialRegion={SCOTTSDALE_OLD_TOWN}
				onRegionChangeComplete={handleRegionChange}
				showsUserLocation
				showsMyLocationButton={false}
			>
				{/* Venue markers - only render when zoomed in enough */}
				{hasLoadedOnce && isZoomedEnough && filteredVenues.map((venue) => {
					// Skip venues with invalid data
					if (!venue?.placeId || !venue?.location?.latitude || !venue?.location?.longitude) {
						return null;
					}

					const isActiveTab = activeTab?.venuePlaceId === venue.placeId;
					const isFavorite = favoriteVenueIds.includes(venue.placeId);
					const isDimmed = activeTab !== null && !isActiveTab;

					return (
						<Marker
							key={venue.placeId}
							identifier={venue.placeId}
							coordinate={{
								latitude: venue.location.latitude,
								longitude: venue.location.longitude,
							}}
							tracksViewChanges={false}
							anchor={{ x: 0.5, y: 1 }}
							onPress={() => handleVenuePress(venue)}
						>
							<VenueChip
								venue={venue}
								isActiveTab={isActiveTab}
								isFavorite={isFavorite}
								isDimmed={isDimmed}
							/>
						</Marker>
					);
				})}
			</MapView>

			{/* Filter chips */}
			<View style={[styles.filterContainer, { top: insets.top + 8 }]}>
				<MapFilterChips
					selected={filter}
					onSelect={setFilter}
					favoritesCount={favoriteVenueIds.length}
				/>
				{isLoadingVenues && (
					<ActivityIndicator
						size="small"
						color="#007AFF"
						style={styles.loadingIndicator}
					/>
				)}
			</View>

			{/* Map controls */}
			<View style={[styles.mapControls, { top: insets.top + 60 }]}>
				<TouchableOpacity style={styles.controlButton} onPress={centerOnUser}>
					<Ionicons name="locate" size={22} color="#007AFF" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.controlButton} onPress={zoomIn}>
					<Ionicons name="add" size={24} color="#007AFF" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.controlButton} onPress={zoomOut}>
					<Ionicons name="remove" size={24} color="#007AFF" />
				</TouchableOpacity>
			</View>

			{/* Zoom hint when zoomed out */}
			{!isZoomedEnough && (
				<View style={styles.zoomHint}>
					<Ionicons name="search" size={16} color="#666" />
					<Text style={styles.zoomHintText}>Zoom in to see venues</Text>
				</View>
			)}

			{/* Tab Bottom Sheet */}
			{activeTab && (
				<TabBottomSheet
					activeTab={activeTab}
					onCloseTab={handleCloseTab}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		flex: 1,
	},
	filterContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		flexDirection: "row",
		alignItems: "center",
	},
	loadingIndicator: {
		marginRight: 16,
	},
	mapControls: {
		position: "absolute",
		right: 16,
		gap: 8,
	},
	controlButton: {
		backgroundColor: "#fff",
		padding: 10,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		alignItems: "center",
		justifyContent: "center",
		width: 44,
		height: 44,
	},
	zoomHint: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: [{ translateX: -80 }, { translateY: -20 }],
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.95)",
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 4,
		elevation: 3,
	},
	zoomHintText: {
		color: "#666",
		fontSize: 14,
		fontWeight: "500",
		marginLeft: 8,
	},
});
