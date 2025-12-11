import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetScrollView,
	BottomSheetTextInput,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	Keyboard,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { Easing } from "react-native-reanimated";

import type { Tab } from "@/store/useTabStore";

interface TabItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	category: "beer" | "wine" | "cocktail" | "shot" | "food" | "other";
}

interface TabBottomSheetProps {
	activeTab: Tab;
	onCloseTab: (amount: number, tip: number) => void;
}

const QUICK_ADD_ITEMS: {
	name: string;
	category: TabItem["category"];
	icon: keyof typeof Ionicons.glyphMap;
	color: string;
}[] = [
	{ name: "Beer", category: "beer", icon: "beer", color: "#f59e0b" },
	{ name: "Wine", category: "wine", icon: "wine", color: "#f472b6" },
	{ name: "Cocktail", category: "cocktail", icon: "cafe", color: "#a855f7" },
	{ name: "Shot", category: "shot", icon: "flame", color: "#f97316" },
	{ name: "Food", category: "food", icon: "restaurant", color: "#22c55e" },
	{ name: "Other", category: "other", icon: "ellipsis-horizontal", color: "#64748b" },
];

const TabBottomSheetComponent = ({ activeTab, onCloseTab }: TabBottomSheetProps) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [items, setItems] = useState<TabItem[]>([]);
	const [elapsedTime, setElapsedTime] = useState("0:00");
	const [showAddForm, setShowAddForm] = useState(false);
	const [showCloseForm, setShowCloseForm] = useState(false);
	const [customName, setCustomName] = useState("");
	const [customPrice, setCustomPrice] = useState("");
	const [finalAmount, setFinalAmount] = useState("");
	const [tipAmount, setTipAmount] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);

	// 2 snap points: collapsed (180) and expanded (60%)
	const snapPoints = useMemo(() => [180, "60%"], []);

	// Timer
	useEffect(() => {
		const updateTime = () => {
			const diff = Date.now() - activeTab.startTime;
			const hours = Math.floor(diff / (1000 * 60 * 60));
			const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((diff % (1000 * 60)) / 1000);

			if (hours > 0) {
				setElapsedTime(
					`${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
				);
			} else {
				setElapsedTime(`${minutes}:${seconds.toString().padStart(2, "0")}`);
			}
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, [activeTab.startTime]);

	// Calculate totals
	const totalAmount = useMemo(
		() => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
		[items]
	);
	const itemCount = useMemo(
		() => items.reduce((sum, item) => sum + item.quantity, 0),
		[items]
	);

	// Handlers
	const handleQuickAdd = useCallback((quickItem: (typeof QUICK_ADD_ITEMS)[0]) => {
		const newItem: TabItem = {
			id: Date.now().toString(),
			name: quickItem.name,
			price: 0,
			quantity: 1,
			category: quickItem.category,
		};
		setItems((prev) => [...prev, newItem]);
	}, []);

	const handleCustomAdd = useCallback(() => {
		if (!customName.trim()) return;
		const newItem: TabItem = {
			id: Date.now().toString(),
			name: customName.trim(),
			price: customPrice ? parseFloat(customPrice) : 0,
			quantity: 1,
			category: "other",
		};
		setItems((prev) => [...prev, newItem]);
		setCustomName("");
		setCustomPrice("");
		setShowAddForm(false);
		Keyboard.dismiss();
	}, [customName, customPrice]);

	const handleRemoveItem = useCallback((itemId: string) => {
		setItems((prev) => prev.filter((item) => item.id !== itemId));
	}, []);

	const handleCloseTab = useCallback(() => {
		const total = finalAmount ? parseFloat(finalAmount) : totalAmount;
		const tip = tipAmount ? parseFloat(tipAmount) : 0;
		onCloseTab(total + tip, tip);
	}, [finalAmount, tipAmount, totalAmount, onCloseTab]);

	const handleTipPercent = useCallback(
		(percent: number) => {
			const base = finalAmount ? parseFloat(finalAmount) : totalAmount;
			setTipAmount((base * (percent / 100)).toFixed(2));
		},
		[finalAmount, totalAmount]
	);

	const handleSheetChange = useCallback((index: number) => {
		setCurrentIndex(index);
		if (index === 0) {
			setShowAddForm(false);
			setShowCloseForm(false);
		}
	}, []);

	const expandSheet = useCallback(() => {
		bottomSheetRef.current?.snapToIndex(1);
	}, []);

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={0}
				appearsOnIndex={1}
				opacity={0.4}
			/>
		),
		[]
	);

	const isExpanded = currentIndex > 0;

	return (
		<BottomSheet
			ref={bottomSheetRef}
			index={0}
			snapPoints={snapPoints}
			onChange={handleSheetChange}
			backdropComponent={renderBackdrop}
			handleIndicatorStyle={styles.handleIndicator}
			backgroundStyle={styles.sheetBackground}
			animationConfigs={{
				duration: 250,
				easing: Easing.out(Easing.quad),
			}}
		>
			{/* Header - Always Visible */}
			<BottomSheetView style={styles.header}>
				<View style={styles.headerRow}>
					<View style={styles.headerLeft}>
						{/* Pulsing indicator */}
						<View style={styles.pulseDot} />
						<View style={styles.headerInfo}>
							<Text style={styles.venueName} numberOfLines={1}>
								{activeTab.venueName}
							</Text>
							<View style={styles.timerRow}>
								<Ionicons name="time-outline" size={12} color="#888" />
								<Text style={styles.timerText}>{elapsedTime}</Text>
							</View>
						</View>
					</View>

					<View style={styles.headerRight}>
						<Text style={styles.totalLabel}>RUNNING</Text>
						<Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
					</View>
				</View>

				{/* Action Buttons - Always visible in collapsed */}
				{!isExpanded && (
					<View style={styles.collapsedActions}>
						<Pressable style={styles.addDrinkButton} onPress={expandSheet}>
							<Ionicons name="add" size={18} color="#fff" />
							<Text style={styles.addDrinkText}>Add Drink</Text>
						</Pressable>
						<Pressable
							style={styles.closeTabButtonCollapsed}
							onPress={() => {
								expandSheet();
								setTimeout(() => setShowCloseForm(true), 300);
							}}
						>
							<Ionicons name="card-outline" size={18} color="#1c1c1e" />
							<Text style={styles.closeTabTextCollapsed}>Close Tab</Text>
						</Pressable>
					</View>
				)}
			</BottomSheetView>

			{/* Expanded Content */}
			{isExpanded && (
				<BottomSheetScrollView
					style={styles.expandedContent}
					contentContainerStyle={styles.scrollContent}
				>
					{showCloseForm ? (
						/* Close Tab Form */
						<View style={styles.closeForm}>
							<Text style={styles.sectionTitle}>Close Your Tab</Text>

							<View style={styles.inputGroup}>
								<Text style={styles.inputLabel}>Final Amount ($)</Text>
								<BottomSheetTextInput
									style={styles.amountInput}
									value={finalAmount}
									onChangeText={setFinalAmount}
									placeholder={totalAmount.toFixed(2)}
									placeholderTextColor="#666"
									keyboardType="decimal-pad"
								/>
							</View>

							<View style={styles.inputGroup}>
								<Text style={styles.inputLabel}>Tip</Text>
								<View style={styles.tipButtons}>
									{[15, 18, 20, 25].map((pct) => (
										<Pressable
											key={pct}
											style={styles.tipButton}
											onPress={() => handleTipPercent(pct)}
										>
											<Text style={styles.tipButtonText}>{pct}%</Text>
										</Pressable>
									))}
								</View>
								<BottomSheetTextInput
									style={styles.amountInput}
									value={tipAmount}
									onChangeText={setTipAmount}
									placeholder="0.00"
									placeholderTextColor="#666"
									keyboardType="decimal-pad"
								/>
							</View>

							<View style={styles.closeFormButtons}>
								<Pressable
									style={styles.backButton}
									onPress={() => setShowCloseForm(false)}
								>
									<Text style={styles.backButtonText}>Back</Text>
								</Pressable>
								<Pressable
									style={styles.confirmCloseButton}
									onPress={handleCloseTab}
								>
									<Ionicons name="checkmark-circle" size={18} color="#fff" />
									<Text style={styles.confirmCloseText}>Close Tab</Text>
								</Pressable>
							</View>
						</View>
					) : (
						<>
							{/* Quick Add Buttons */}
							<View style={styles.section}>
								<Text style={styles.sectionLabel}>QUICK ADD</Text>
								<View style={styles.quickAddGrid}>
									{QUICK_ADD_ITEMS.map((item) => (
										<Pressable
											key={item.category}
											style={styles.quickAddButton}
											onPress={() => handleQuickAdd(item)}
										>
											<Ionicons
												name={item.icon}
												size={20}
												color={item.color}
											/>
											<Text style={styles.quickAddText}>{item.name}</Text>
										</Pressable>
									))}
								</View>
							</View>

							{/* Custom Add Form */}
							{showAddForm && (
								<View style={styles.addForm}>
									<View style={styles.addFormInputs}>
										<BottomSheetTextInput
											style={styles.nameInput}
											value={customName}
											onChangeText={setCustomName}
											placeholder="Item name..."
											placeholderTextColor="#666"
											autoFocus
										/>
										<BottomSheetTextInput
											style={styles.priceInput}
											value={customPrice}
											onChangeText={setCustomPrice}
											placeholder="$0.00"
											placeholderTextColor="#666"
											keyboardType="decimal-pad"
										/>
									</View>
									<View style={styles.addFormButtons}>
										<Pressable
											style={styles.cancelButton}
											onPress={() => setShowAddForm(false)}
										>
											<Text style={styles.cancelButtonText}>Cancel</Text>
										</Pressable>
										<Pressable
											style={styles.addButton}
											onPress={handleCustomAdd}
										>
											<Text style={styles.addButtonText}>Add</Text>
										</Pressable>
									</View>
								</View>
							)}

							{/* Items List */}
							<View style={styles.section}>
								<Text style={styles.sectionLabel}>YOUR TAB ({itemCount} items)</Text>
								{items.length === 0 ? (
									<View style={styles.emptyState}>
										<Ionicons name="beer-outline" size={32} color="#444" />
										<Text style={styles.emptyText}>No items yet</Text>
									</View>
								) : (
									<View style={styles.itemsList}>
										{items.map((item) => (
											<View key={item.id} style={styles.itemRow}>
												<View style={styles.itemInfo}>
													<Text style={styles.itemName}>{item.name}</Text>
													<Text style={styles.itemPrice}>
														{item.price > 0
															? `$${item.price.toFixed(2)}`
															: "Price unknown"}
													</Text>
												</View>
												<Pressable
													style={styles.removeButton}
													onPress={() => handleRemoveItem(item.id)}
												>
													<Ionicons name="trash-outline" size={16} color="#ef4444" />
												</Pressable>
											</View>
										))}
									</View>
								)}
							</View>

							{/* Footer Actions */}
							<View style={styles.footer}>
								<Pressable
									style={styles.footerButtonSecondary}
									onPress={() => setShowAddForm(!showAddForm)}
								>
									<Ionicons name="add" size={18} color="#fff" />
									<Text style={styles.footerButtonText}>Custom</Text>
								</Pressable>
								<Pressable
									style={styles.footerButtonPrimary}
									onPress={() => setShowCloseForm(true)}
								>
									<Ionicons name="card-outline" size={18} color="#1c1c1e" />
									<Text style={styles.footerButtonTextDark}>Close Tab</Text>
								</Pressable>
							</View>
						</>
					)}
				</BottomSheetScrollView>
			)}
		</BottomSheet>
	);
};

export const TabBottomSheet = memo(TabBottomSheetComponent);

const styles = StyleSheet.create({
	sheetBackground: {
		backgroundColor: "#1c1c1e",
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
	},
	handleIndicator: {
		backgroundColor: "#4a4a4a",
		width: 40,
	},
	header: {
		paddingHorizontal: 20,
		paddingBottom: 16,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	headerLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		flex: 1,
	},
	pulseDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "#22c55e",
	},
	headerInfo: {
		flex: 1,
	},
	venueName: {
		fontSize: 18,
		fontWeight: "700",
		color: "#fff",
	},
	timerRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		marginTop: 2,
	},
	timerText: {
		fontSize: 13,
		color: "#888",
		fontVariant: ["tabular-nums"],
	},
	headerRight: {
		alignItems: "flex-end",
	},
	totalLabel: {
		fontSize: 10,
		color: "#666",
		fontWeight: "600",
		letterSpacing: 0.5,
	},
	totalAmount: {
		fontSize: 20,
		fontWeight: "700",
		color: "#22c55e",
	},
	collapsedActions: {
		flexDirection: "row",
		gap: 12,
		marginTop: 16,
	},
	addDrinkButton: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: "#2a2a2c",
		borderRadius: 12,
		paddingVertical: 14,
	},
	addDrinkText: {
		color: "#fff",
		fontSize: 15,
		fontWeight: "600",
	},
	closeTabButtonCollapsed: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: "#fff",
		borderRadius: 12,
		paddingVertical: 14,
	},
	closeTabTextCollapsed: {
		color: "#1c1c1e",
		fontSize: 15,
		fontWeight: "700",
	},
	expandedContent: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 40,
	},
	section: {
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderTopWidth: 1,
		borderTopColor: "#2a2a2c",
	},
	sectionLabel: {
		fontSize: 11,
		fontWeight: "700",
		color: "#666",
		letterSpacing: 1,
		marginBottom: 12,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#fff",
		marginBottom: 20,
	},
	quickAddGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
	},
	quickAddButton: {
		width: "31%",
		aspectRatio: 1.4,
		backgroundColor: "#2a2a2c",
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
	},
	quickAddText: {
		fontSize: 12,
		color: "#888",
	},
	addForm: {
		paddingHorizontal: 20,
		paddingVertical: 16,
		backgroundColor: "#2a2a2c",
		marginHorizontal: 20,
		marginBottom: 8,
		borderRadius: 12,
	},
	addFormInputs: {
		flexDirection: "row",
		gap: 10,
		marginBottom: 12,
	},
	nameInput: {
		flex: 1,
		backgroundColor: "#1c1c1e",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 12,
		color: "#fff",
		fontSize: 15,
	},
	priceInput: {
		width: 90,
		backgroundColor: "#1c1c1e",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 12,
		color: "#fff",
		fontSize: 15,
	},
	addFormButtons: {
		flexDirection: "row",
		gap: 10,
	},
	cancelButton: {
		flex: 1,
		paddingVertical: 12,
		alignItems: "center",
	},
	cancelButtonText: {
		color: "#888",
		fontSize: 15,
	},
	addButton: {
		flex: 1,
		backgroundColor: "#3b82f6",
		borderRadius: 8,
		paddingVertical: 12,
		alignItems: "center",
	},
	addButtonText: {
		color: "#fff",
		fontSize: 15,
		fontWeight: "600",
	},
	emptyState: {
		alignItems: "center",
		paddingVertical: 24,
	},
	emptyText: {
		color: "#666",
		fontSize: 14,
		marginTop: 8,
	},
	itemsList: {
		gap: 8,
	},
	itemRow: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#2a2a2c",
		borderRadius: 12,
		padding: 14,
	},
	itemInfo: {
		flex: 1,
	},
	itemName: {
		color: "#fff",
		fontSize: 15,
		fontWeight: "500",
	},
	itemPrice: {
		color: "#888",
		fontSize: 13,
		marginTop: 2,
	},
	removeButton: {
		padding: 8,
	},
	footer: {
		flexDirection: "row",
		gap: 12,
		paddingHorizontal: 20,
		paddingTop: 16,
	},
	footerButtonSecondary: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: "#2a2a2c",
		borderRadius: 12,
		paddingVertical: 16,
	},
	footerButtonPrimary: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: "#fff",
		borderRadius: 12,
		paddingVertical: 16,
	},
	footerButtonText: {
		color: "#fff",
		fontSize: 15,
		fontWeight: "600",
	},
	footerButtonTextDark: {
		color: "#1c1c1e",
		fontSize: 15,
		fontWeight: "700",
	},
	closeForm: {
		padding: 20,
	},
	inputGroup: {
		marginBottom: 20,
	},
	inputLabel: {
		fontSize: 13,
		fontWeight: "600",
		color: "#888",
		marginBottom: 8,
	},
	amountInput: {
		backgroundColor: "#2a2a2c",
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 16,
		color: "#fff",
		fontSize: 20,
	},
	tipButtons: {
		flexDirection: "row",
		gap: 10,
		marginBottom: 10,
	},
	tipButton: {
		flex: 1,
		backgroundColor: "#2a2a2c",
		borderRadius: 10,
		paddingVertical: 12,
		alignItems: "center",
	},
	tipButtonText: {
		color: "#888",
		fontSize: 15,
		fontWeight: "600",
	},
	closeFormButtons: {
		flexDirection: "row",
		gap: 12,
		marginTop: 24,
	},
	backButton: {
		flex: 1,
		paddingVertical: 16,
		alignItems: "center",
	},
	backButtonText: {
		color: "#888",
		fontSize: 16,
	},
	confirmCloseButton: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: "#22c55e",
		borderRadius: 12,
		paddingVertical: 16,
	},
	confirmCloseText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "700",
	},
});
