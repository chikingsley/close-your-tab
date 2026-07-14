# Close Your Tab 🍻

A personal bar-tab tracker that reminds you to close your tab before you leave — works at **any** venue, no merchant integration required. Secondary goal: track your bar/restaurant spending over time.

## How it works

1. The app tracks your location in the background (with your permission).
2. When you arrive at a bar or restaurant, it detects the venue via the Google Places API and offers to open a tab.
3. If you walk away from the venue with a tab still open, geofencing detects the departure and sends a push notification: *"Did you close your tab?"*
4. Closing a tab records the venue, duration, and amount to your local history.

See [docs/ROADMAP.md](./docs/ROADMAP.md) for the full product roadmap and [docs/features](./docs/features) for per-feature specs.

## Stack

- [Expo SDK 57](https://expo.dev) (React Native 0.86, New Architecture) with [Expo Router](https://docs.expo.dev/router/introduction)
- [NativeWind 4](https://www.nativewind.dev) + [React Native Reusables](https://reactnativereusables.com) for UI
- [Zustand](https://zustand.docs.pmnd.rs) (persisted to AsyncStorage) for state
- `react-native-maps` for the map home screen
- `expo-location` + `expo-task-manager` for background venue/departure detection
- Google Places API for venue lookup

## Getting started

Requires a [development build](https://docs.expo.dev/develop/development-builds/introduction/) — this app uses native modules (maps, background location) that are not available in Expo Go.

1. Install dependencies:

   ```bash
   bun install
   ```

2. Configure your API key:

   ```bash
   cp .env.example .env
   # then set EXPO_PUBLIC_GOOGLE_PLACES_API_KEY in .env
   ```

3. Build and run on a simulator/device:

   ```bash
   bun run ios     # or: bun run android
   ```

## Project structure

```
app/            Expo Router routes (map home, insights, settings)
components/     App components + components/ui (React Native Reusables)
services/       Location, geofence, notification, and venue (Places API) logic
store/          Zustand store (active tab, history, settings)
hooks/          Permission handling
config/         Tunable constants (radii, intervals, thresholds)
docs/           Roadmap, feature specs, reference material
examples/       Throwaway web prototypes (not part of the app)
```
