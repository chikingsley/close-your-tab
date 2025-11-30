import { GOOGLE_PLACES_API_KEY, VENUE_SEARCH_RADIUS, VENUE_TYPES } from '@/config/constants';

export interface Venue {
  placeId: string;
  name: string;
  vicinity: string;
  types: string[];
  location: {
    latitude: number;
    longitude: number;
  };
}

interface PlacesNearbyResult {
  place_id: string;
  name: string;
  vicinity: string;
  types: string[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface PlacesNearbyResponse {
  results: PlacesNearbyResult[];
  status: string;
  error_message?: string;
}

export const identifyVenue = async (
  latitude: number,
  longitude: number
): Promise<Venue | null> => {
  try {
    // Build the API URL for nearby search
    const typesParam = VENUE_TYPES.join('|');
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${VENUE_SEARCH_RADIUS}&type=${typesParam}&key=${GOOGLE_PLACES_API_KEY}`;

    console.log(`Searching for venues near ${latitude}, ${longitude}`);

    const response = await fetch(url);
    const data: PlacesNearbyResponse = await response.json();

    if (data.status !== 'OK') {
      if (data.status === 'ZERO_RESULTS') {
        console.log('No venues found nearby');
        return null;
      }
      console.error('Places API error:', data.status, data.error_message);
      return null;
    }

    if (data.results.length === 0) {
      return null;
    }

    // Return the closest/first result
    const place = data.results[0];

    const venue: Venue = {
      placeId: place.place_id,
      name: place.name,
      vicinity: place.vicinity,
      types: place.types,
      location: {
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      },
    };

    console.log('Found venue:', venue.name);
    return venue;
  } catch (error) {
    console.error('Error fetching venues:', error);
    return null;
  }
};

export const searchNearbyVenues = async (
  latitude: number,
  longitude: number,
  radius: number = 500
): Promise<Venue[]> => {
  try {
    const typesParam = VENUE_TYPES.join('|');
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${typesParam}&key=${GOOGLE_PLACES_API_KEY}`;

    const response = await fetch(url);
    const data: PlacesNearbyResponse = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error('Places API error:', data.status, data.error_message);
      return [];
    }

    return data.results.map((place) => ({
      placeId: place.place_id,
      name: place.name,
      vicinity: place.vicinity,
      types: place.types,
      location: {
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      },
    }));
  } catch (error) {
    console.error('Error searching venues:', error);
    return [];
  }
};

// Check if a venue type is a bar/nightclub (for higher priority detection)
export const isBarOrNightclub = (venue: Venue): boolean => {
  return venue.types.some((type) => ['bar', 'night_club'].includes(type));
};

// Calculate distance between two coordinates in meters
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};
