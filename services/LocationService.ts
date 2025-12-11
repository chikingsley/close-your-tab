import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-location-task';

// Helper to get active tab from Zustand's persisted storage
const getActiveTabFromStorage = async () => {
  try {
    const data = await AsyncStorage.getItem('tab-storage');
    if (data) {
      const parsed = JSON.parse(data);
      return parsed.state?.activeTab || null;
    }
    return null;
  } catch {
    return null;
  }
};

export const startLocationUpdates = async () => {
  // Check if we already have permissions (they should be granted by now)
  const { status: foregroundStatus } = await Location.getForegroundPermissionsAsync();
  const { status: backgroundStatus } = await Location.getBackgroundPermissionsAsync();

  if (foregroundStatus !== 'granted' || backgroundStatus !== 'granted') {
    console.log('Location permissions not granted, cannot start tracking');
    return false;
  }

  // Check if task is already running
  const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);
  if (isRegistered) {
    console.log('Location task already running');
    return true;
  }

  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.Balanced,
    timeInterval: 60000, // 1 minute
    distanceInterval: 100, // 100 meters
    deferredUpdatesInterval: 60000,
    deferredUpdatesDistance: 100,
    foregroundService: {
      notificationTitle: 'Tab Tracker',
      notificationBody: 'Monitoring your location to detect venues.',
    },
    showsBackgroundLocationIndicator: true,
  });

  console.log('Location updates started');
  return true;
};

export const stopLocationUpdates = async () => {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);
  if (isRegistered) {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    console.log('Location updates stopped');
  }
};

export const getCurrentLocation = async () => {
  const { status } = await Location.getForegroundPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  return location;
};

// Define the background task
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    // Code 0 (kCLErrorDomain) = location unknown, often happens on initial task start
    // This is typically transient and can be safely ignored
    const errorCode = (error as { code?: number })?.code;
    if (errorCode === 0) {
      console.log('Location temporarily unavailable, waiting for next update...');
    } else {
      console.error('Location task error:', error);
    }
    return;
  }

  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    const location = locations[0];

    if (location) {
      console.log('Background location update:', location.coords.latitude, location.coords.longitude);

      // Dynamic import to avoid circular dependencies
      const { identifyVenue } = require('./VenueService');
      const { scheduleNotification } = require('./NotificationService');
      const { checkDeparture } = require('./GeofenceService');

      try {
        // First, check if user has an active tab and is leaving
        const activeTab = await getActiveTabFromStorage();

        if (activeTab) {
          // User has an active tab - check for departure
          await checkDeparture(
            location.coords.latitude,
            location.coords.longitude,
            activeTab
          );
        } else {
          // No active tab - check if user is entering a venue
          const venue = await identifyVenue(
            location.coords.latitude,
            location.coords.longitude
          );

          if (venue) {
            console.log('Detected venue:', venue.name);
            await scheduleNotification(
              `Welcome to ${venue.name}`,
              "Looks like you're at a bar. Want to open a tab?"
            );
          }
        }
      } catch (err) {
        console.error('Error in location task:', err);
      }
    }
  }
});
