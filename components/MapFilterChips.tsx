import { memo } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export type VenueFilter = "all" | "bars" | "restaurants" | "favorites";

interface MapFilterChipsProps {
	selected: VenueFilter;
	onSelect: (filter: VenueFilter) => void;
	favoritesCount: number;
}

const filters: { id: VenueFilter; label: string }[] = [
	{ id: "all", label: "All" },
	{ id: "bars", label: "Bars" },
	{ id: "restaurants", label: "Restaurants" },
	{ id: "favorites", label: "Favorites" },
];

const MapFilterChipsComponent = ({
	selected,
	onSelect,
	favoritesCount,
}: MapFilterChipsProps) => {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.container}
		>
			{filters.map((filter) => {
				const isSelected = selected === filter.id;
				const showCount = filter.id === "favorites" && favoritesCount > 0;

				return (
					<TouchableOpacity
						key={filter.id}
						onPress={() => onSelect(filter.id)}
						style={[
							styles.chip,
							isSelected ? styles.chipSelected : styles.chipUnselected,
						]}
						activeOpacity={0.7}
					>
						<Text
							style={[
								styles.chipText,
								isSelected ? styles.chipTextSelected : styles.chipTextUnselected,
							]}
						>
							{filter.label}
							{showCount && ` (${favoritesCount})`}
						</Text>
					</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
};

export const MapFilterChips = memo(MapFilterChipsComponent);

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		gap: 8,
	},
	chip: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		marginRight: 8,
	},
	chipSelected: {
		backgroundColor: "#007AFF",
	},
	chipUnselected: {
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	chipText: {
		fontSize: 14,
		fontWeight: "600",
	},
	chipTextSelected: {
		color: "#fff",
	},
	chipTextUnselected: {
		color: "#333",
	},
});
