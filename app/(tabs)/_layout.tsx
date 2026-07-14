import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
	return (
		<NativeTabs>
			<NativeTabs.Trigger name="index">
				<NativeTabs.Trigger.Icon sf={{ default: "map", selected: "map.fill" }} />
				<NativeTabs.Trigger.Label>Map</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="insights">
				<NativeTabs.Trigger.Icon
					sf={{ default: "chart.bar", selected: "chart.bar.fill" }}
				/>
				<NativeTabs.Trigger.Label>Insights</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
