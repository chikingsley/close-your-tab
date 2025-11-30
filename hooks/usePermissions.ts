import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { Alert, Linking } from 'react-native';

export type PermissionStatus = 'undetermined' | 'granted' | 'denied';

interface PermissionState {
  location: PermissionStatus;
  backgroundLocation: PermissionStatus;
  notifications: PermissionStatus;
  isReady: boolean;
}

export function usePermissions() {
  const [permissions, setPermissions] = useState<PermissionState>({
    location: 'undetermined',
    backgroundLocation: 'undetermined',
    notifications: 'undetermined',
    isReady: false,
  });

  const checkPermissions = async () => {
    const [locationStatus, backgroundStatus, notificationStatus] = await Promise.all([
      Location.getForegroundPermissionsAsync(),
      Location.getBackgroundPermissionsAsync(),
      Notifications.getPermissionsAsync(),
    ]);

    setPermissions({
      location: locationStatus.granted ? 'granted' : locationStatus.canAskAgain ? 'undetermined' : 'denied',
      backgroundLocation: backgroundStatus.granted ? 'granted' : backgroundStatus.canAskAgain ? 'undetermined' : 'denied',
      notifications: notificationStatus.granted ? 'granted' : notificationStatus.canAskAgain ? 'undetermined' : 'denied',
      isReady: true,
    });

    return {
      location: locationStatus.granted,
      backgroundLocation: backgroundStatus.granted,
      notifications: notificationStatus.granted,
    };
  };

  const requestLocationPermission = async (): Promise<boolean> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Location Required',
        'Tab Tracker needs location access to detect when you enter and leave venues. Please enable location in Settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }

    setPermissions(prev => ({ ...prev, location: 'granted' }));
    return true;
  };

  const requestBackgroundLocationPermission = async (): Promise<boolean> => {
    // Must have foreground permission first
    const foregroundGranted = await requestLocationPermission();
    if (!foregroundGranted) return false;

    const { status } = await Location.requestBackgroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Background Location Required',
        'To remind you when you leave a venue, Tab Tracker needs "Always" location access. Please select "Always" in Settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }

    setPermissions(prev => ({ ...prev, backgroundLocation: 'granted' }));
    return true;
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Notifications Required',
        'Tab Tracker needs notification permission to remind you to close your tab.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }

    setPermissions(prev => ({ ...prev, notifications: 'granted' }));
    return true;
  };

  const requestAllPermissions = async () => {
    // Request in sequence for better UX
    const notificationsGranted = await requestNotificationPermission();
    const locationGranted = await requestLocationPermission();

    let backgroundGranted = false;
    if (locationGranted) {
      backgroundGranted = await requestBackgroundLocationPermission();
    }

    return {
      notifications: notificationsGranted,
      location: locationGranted,
      backgroundLocation: backgroundGranted,
    };
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: Run only on mount
  useEffect(() => {
    checkPermissions();
  }, []);

  return {
    permissions,
    checkPermissions,
    requestLocationPermission,
    requestBackgroundLocationPermission,
    requestNotificationPermission,
    requestAllPermissions,
  };
}
