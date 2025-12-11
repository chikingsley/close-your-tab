# 03 - Map View

## Overview

Interactive map showing user location and nearby venues with custom markers.

## Features

### Map Display

- Google Maps provider (via react-native-maps)
- Dark theme styling (nightlife aesthetic)
- User location with custom pulsing dot
- Venue markers as interactive chips

### Venue Markers (Chips)

Inspired by Example 2's implementation:

- Pill-shaped markers showing venue name
- Color-coded by type (bar, restaurant, etc.)
- State indicators:
  - Default: Name + "Open Tab" button
  - Active tab here: Green glow, no button
  - Tab elsewhere: Disabled state
- Tap → Shows callout with details
- "Open Tab" button on marker or callout

### User Location

- Custom marker (not default blue dot)
- Pulsing animation
- Center/recenter button

### Filtering

- Filter chips: All | Bars | Restaurants
- Dynamically show/hide markers
- Remember last filter preference

### Interactions

- Pan/zoom map
- Tap marker → Show venue details
- Tap "Open Tab" → Open tab flow
- Tap user location button → Center on user

---

## Technical Implementation

### Provider Setup

```typescript
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

<MapView
  provider={PROVIDER_GOOGLE}
  style={{ flex: 1 }}
  showsUserLocation={false} // Using custom marker
  customMapStyle={darkMapStyle}
>
```

### Custom Markers

```typescript
<Marker
  coordinate={venue.coordinate}
  tracksViewChanges={false} // CRITICAL for performance
>
  <VenueChip venue={venue} hasActiveTab={...} />
</Marker>
```

### Performance Notes

- Always use `tracksViewChanges={false}`
- Memoize marker components
- Use clustering if 50+ venues (react-native-map-clustering)
- Filter venues to viewport if many

---

## Components Needed

- [ ] `MapScreen` - Main map container
- [ ] `VenueMarker` - Custom chip marker
- [ ] `UserLocationMarker` - Pulsing dot
- [ ] `VenueCallout` - Detail popup
- [ ] `MapFilterChips` - Filter buttons
- [ ] `CenterLocationButton` - FAB to recenter

## Dependencies

- react-native-maps (already installed)
- react-native-reanimated (for pulsing animation)

## Status

- [ ] Not started

## Notes

- Requires dev build (not Expo Go) for Google Maps on Android
- Map styling JSON for dark theme
- Consider adding map style toggle (dark/satellite)
