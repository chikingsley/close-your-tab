import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import type { Venue } from "@/services/VenueService";

interface VenueChipProps {
	venue: Venue;
	isActiveTab: boolean;
	isFavorite: boolean;
	isDimmed: boolean;
}

const VenueChipComponent = ({
	venue,
	isActiveTab,
	isFavorite,
	isDimmed,
}: VenueChipProps) => {
	// Determine venue type for color coding
	const isBar = venue.types.some((t) => ["bar", "night_club"].includes(t));

	return (
		<View style={[styles.container, isDimmed && styles.containerDimmed]}>
			{/* Main chip */}
			<View
				style={[
					styles.chip,
					isActiveTab && styles.chipActive,
				]}
			>
				{/* Left section - venue name */}
				<View style={styles.nameSection}>
					{isFavorite && !isDimmed && (
						<Ionicons
							name="heart"
							size={10}
							color="#f472b6"
							style={styles.favoriteIcon}
						/>
					)}
					<Text style={[styles.venueName, isDimmed && styles.venueNameDimmed]} numberOfLines={1}>
						{venue.name}
					</Text>
					{isActiveTab && (
						<View style={styles.liveDot} />
					)}
				</View>

				{/* Right section - only show for active tab or when not dimmed */}
				{!isActiveTab && !isDimmed && (
					<View style={[styles.actionSection, isBar ? styles.actionBar : styles.actionRestaurant]}>
						<Text style={styles.actionText}>Open</Text>
						<Ionicons name="chevron-forward" size={12} color="#fff" />
					</View>
				)}

				{isActiveTab && (
					<View style={styles.activeSection}>
						<Ionicons name="beer" size={14} color="#fff" />
					</View>
				)}
			</View>

			{/* Arrow pointer */}
			<View style={[styles.arrow, isActiveTab && styles.arrowActive]} />
		</View>
	);
};

export const VenueChip = memo(VenueChipComponent, (prev, next) => {
	return (
		prev.venue.placeId === next.venue.placeId &&
		prev.isActiveTab === next.isActiveTab &&
		prev.isFavorite === next.isFavorite &&
		prev.isDimmed === next.isDimmed
	);
});

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	containerDimmed: {
		opacity: 0.35,
	},
	chip: {
		flexDirection: "row",
		alignItems: "stretch",
		backgroundColor: "#1c1c1e",
		borderRadius: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 8,
	},
	chipActive: {
		backgroundColor: "#166534",
	},
	nameSection: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
		paddingVertical: 8,
		maxWidth: 120,
		borderTopLeftRadius: 16,
		borderBottomLeftRadius: 16,
	},
	venueName: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "600",
		flexShrink: 1,
	},
	venueNameDimmed: {
		color: "#999",
	},
	favoriteIcon: {
		marginRight: 4,
	},
	liveDot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: "#4ade80",
		marginLeft: 6,
	},
	actionSection: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 10,
		borderTopRightRadius: 16,
		borderBottomRightRadius: 16,
	},
	actionBar: {
		backgroundColor: "#d97706",
	},
	actionRestaurant: {
		backgroundColor: "#2563eb",
	},
	actionText: {
		color: "#fff",
		fontSize: 11,
		fontWeight: "700",
		marginRight: 2,
	},
	activeSection: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 10,
		backgroundColor: "#22c55e",
		borderTopRightRadius: 16,
		borderBottomRightRadius: 16,
	},
	arrow: {
		width: 0,
		height: 0,
		borderLeftWidth: 6,
		borderRightWidth: 6,
		borderTopWidth: 6,
		borderLeftColor: "transparent",
		borderRightColor: "transparent",
		borderTopColor: "#1c1c1e",
	},
	arrowActive: {
		borderTopColor: "#166534",
	},
});
