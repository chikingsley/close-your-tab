import { MAPBOX_ACCESS_TOKEN, VENUE_SEARCH_RADIUS, VENUE_TYPES } from '@/config/constants';

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

interface MapboxCategoryFeature {
  properties: {
    mapbox_id: string;
    name: string;
    address?: string;
    full_address?: string;
    poi_category_ids?: string[];
    coordinates: {
      longitude: number;
      latitude: number;
    };
  };
}

interface MapboxCategoryResponse {
  features?: MapboxCategoryFeature[];
  message?: string;
}

// Normalize Mapbox category ids into the type vocabulary the rest of the app
// filters on ('bar', 'night_club', 'restaurant', 'cafe').
const normalizeTypes = (categoryIds: string[]): string[] => {
  const types = new Set<string>(categoryIds);
  for (const id of categoryIds) {
    if (id.includes('bar') || id === 'pub') types.add('bar');
    if (id.includes('night') || id === 'nightlife') types.add('night_club');
    if (id.includes('restaurant') || id === 'food') types.add('restaurant');
    if (id.includes('cafe') || id.includes('coffee')) types.add('cafe');
  }
  return [...types];
};

const fetchVenuesForCategory = async (
  latitude: number,
  longitude: number,
  radius: number,
  category: string
): Promise<Venue[]> => {
  const url =
    `https://api.mapbox.com/search/searchbox/v1/category/${category}` +
    `?proximity=${longitude},${latitude}&limit=25&access_token=${MAPBOX_ACCESS_TOKEN}`;

  const response = await fetch(url);
  const data: MapboxCategoryResponse = await response.json();

  if (!response.ok || !data.features) {
    console.error('Mapbox category search error:', response.status, data.message);
    return [];
  }

  return data.features
    .map((feature) => {
      const p = feature.properties;
      return {
        placeId: p.mapbox_id,
        name: p.name,
        vicinity: p.address ?? p.full_address ?? '',
        types: normalizeTypes(p.poi_category_ids ?? [category]),
        location: {
          latitude: p.coordinates.latitude,
          longitude: p.coordinates.longitude,
        },
      };
    })
    .filter(
      (venue) =>
        calculateDistance(latitude, longitude, venue.location.latitude, venue.location.longitude) <=
        radius
    );
};

export const searchNearbyVenues = async (
  latitude: number,
  longitude: number,
  radius: number = 500
): Promise<Venue[]> => {
  try {
    const perCategory = await Promise.all(
      VENUE_TYPES.map((category) => fetchVenuesForCategory(latitude, longitude, radius, category))
    );

    const byPlaceId = new Map<string, Venue>();
    for (const venue of perCategory.flat()) {
      byPlaceId.set(venue.placeId, venue);
    }
    return [...byPlaceId.values()];
  } catch (error) {
    console.error('Error searching venues:', error);
    return [];
  }
};

export const identifyVenue = async (
  latitude: number,
  longitude: number
): Promise<Venue | null> => {
  console.log(`Searching for venues near ${latitude}, ${longitude}`);
  const venues = await searchNearbyVenues(latitude, longitude, VENUE_SEARCH_RADIUS);

  if (venues.length === 0) {
    console.log('No venues found nearby');
    return null;
  }

  // Prefer bars/nightclubs over restaurants when both are in range
  const venue = venues.find(isBarOrNightclub) ?? venues[0];
  console.log('Found venue:', venue.name);
  return venue;
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
