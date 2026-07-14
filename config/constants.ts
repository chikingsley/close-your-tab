// API Keys - loaded from environment variables
export const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';

// Venue detection settings
export const VENUE_SEARCH_RADIUS = 50; // meters - how close you need to be to detect a venue
export const VENUE_TYPES = ['bar', 'nightlife', 'restaurant']; // Mapbox canonical category ids to search

// Location tracking settings
export const LOCATION_UPDATE_INTERVAL = 60000; // 1 minute
export const LOCATION_DISTANCE_INTERVAL = 100; // 100 meters

// Departure detection settings
export const DEPARTURE_THRESHOLD_METERS = 60; // ~200 feet - distance to trigger departure
export const DEPARTURE_DELAY_MS = 120000; // 2 minutes - wait before sending reminder
