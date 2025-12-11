# 04 - Search Places

## Overview
Google Places Autocomplete for finding venues by name.

## Features

### Search Input
- Text input with search icon
- Autocomplete dropdown as user types
- Results biased to user location
- Filter to relevant types (bars, restaurants)

### Search Results
- Venue name
- Address
- Distance from user
- Venue type indicator

### On Select
- Center map on venue (if map view)
- Show venue details
- Option to open tab

---

## Technical Implementation

### Library
```bash
npm install react-native-google-places-autocomplete
```

### Basic Usage
```typescript
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

<GooglePlacesAutocomplete
  placeholder="Search for a bar or restaurant"
  fetchDetails={true}
  onPress={(data, details) => {
    const { lat, lng } = details.geometry.location;
    // Handle selection
  }}
  query={{
    key: GOOGLE_PLACES_API_KEY,
    language: 'en',
    types: 'establishment',
    location: `${userLat},${userLng}`,
    radius: 5000,
  }}
/>
```

### Filtering by Type
Can restrict to specific types:
- `bar`
- `night_club`
- `restaurant`
- `cafe`

---

## Components Needed
- [ ] `PlaceSearchInput` - Styled autocomplete
- [ ] `SearchResultItem` - Result row component
- [ ] `SearchModal` - Full-screen search overlay

## Integration Points
- Map view: Search bar overlay
- Home screen: Manual venue selection
- Open tab flow: Find venue by name

## Status
- [ ] Not started

## Notes
- Same Google API key as Places API
- Need to enable Places API (Web Service) in Google Cloud Console
- Consider debouncing input for API efficiency
