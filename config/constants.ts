// API Keys - loaded from environment variables
export const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY ?? '';

// Venue detection settings
export const VENUE_SEARCH_RADIUS = 50; // meters - how close you need to be to detect a venue
export const VENUE_TYPES = ['bar', 'night_club', 'restaurant']; // Google Places types to detect

// Location tracking settings
export const LOCATION_UPDATE_INTERVAL = 60000; // 1 minute
export const LOCATION_DISTANCE_INTERVAL = 100; // 100 meters

// Departure detection settings
export const DEPARTURE_THRESHOLD_METERS = 60; // ~200 feet - distance to trigger departure
export const DEPARTURE_DELAY_MS = 120000; // 2 minutes - wait before sending reminder
