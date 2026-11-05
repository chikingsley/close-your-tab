import type { ReactNode } from "react";

// react-native-maps has no web build, and its entry imports native components
// that crash the static web export, so keep it out of the web bundle entirely.
// Only the screen's layout renders on web; the map itself is native only.
export function MapView(_props: { readonly children?: ReactNode }) {
	return null;
}

export function Marker(_props: { readonly children?: ReactNode }) {
	return null;
}
