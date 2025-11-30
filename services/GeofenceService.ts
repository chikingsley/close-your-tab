import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEPARTURE_DELAY_MS, DEPARTURE_THRESHOLD_METERS } from '@/config/constants';
import { calculateDistance } from './VenueService';
import { scheduleNotification } from './NotificationService';

const DEPARTURE_PENDING_KEY = 'departure_pending';

interface DeparturePending {
  tabId: string;
  venueName: string;
  venueLatitude: number;
  venueLongitude: number;
  departureDetectedAt: number;
}

// Check if user has departed from venue with an active tab
export const checkDeparture = async (
  currentLatitude: number,
  currentLongitude: number,
  activeTab: {
    id: string;
    venueName: string;
    location: { latitude: number; longitude: number };
  } | null
): Promise<void> => {
  // No active tab, nothing to check
  if (!activeTab) {
    await clearPendingDeparture();
    return;
  }

  const distance = calculateDistance(
    currentLatitude,
    currentLongitude,
    activeTab.location.latitude,
    activeTab.location.longitude
  );

  console.log(`Distance from ${activeTab.venueName}: ${distance.toFixed(1)}m`);

  if (distance > DEPARTURE_THRESHOLD_METERS) {
    // User is beyond threshold - check if we already have a pending departure
    const pending = await getPendingDeparture();

    if (pending && pending.tabId === activeTab.id) {
      // Check if enough time has passed
      const elapsed = Date.now() - pending.departureDetectedAt;

      if (elapsed >= DEPARTURE_DELAY_MS) {
        console.log(`Departure confirmed for ${activeTab.venueName} after ${elapsed}ms`);

        // Send the reminder notification
        await scheduleNotification(
          `Did you close your tab at ${activeTab.venueName}?`,
          "Tap to mark your tab as closed and enter the amount."
        );

        // Clear the pending departure (notification sent)
        await clearPendingDeparture();
      } else {
        console.log(`Departure pending for ${activeTab.venueName}, ${(DEPARTURE_DELAY_MS - elapsed) / 1000}s remaining`);
      }
    } else {
      // First time detecting departure for this tab
      console.log(`Departure detected for ${activeTab.venueName}, starting ${DEPARTURE_DELAY_MS / 1000}s timer`);

      await setPendingDeparture({
        tabId: activeTab.id,
        venueName: activeTab.venueName,
        venueLatitude: activeTab.location.latitude,
        venueLongitude: activeTab.location.longitude,
        departureDetectedAt: Date.now(),
      });
    }
  } else {
    // User is still at the venue - clear any pending departure
    const pending = await getPendingDeparture();
    if (pending && pending.tabId === activeTab.id) {
      console.log(`User returned to ${activeTab.venueName}, clearing pending departure`);
      await clearPendingDeparture();
    }
  }
};

// Storage helpers for pending departure state
const getPendingDeparture = async (): Promise<DeparturePending | null> => {
  try {
    const data = await AsyncStorage.getItem(DEPARTURE_PENDING_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const setPendingDeparture = async (pending: DeparturePending): Promise<void> => {
  try {
    await AsyncStorage.setItem(DEPARTURE_PENDING_KEY, JSON.stringify(pending));
  } catch (error) {
    console.error('Error saving pending departure:', error);
  }
};

const clearPendingDeparture = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(DEPARTURE_PENDING_KEY);
  } catch (error) {
    console.error('Error clearing pending departure:', error);
  }
};
