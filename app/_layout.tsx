import '../global.css';
import 'react-native-reanimated';

import { PortalHost } from '@rn-primitives/portal';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'nativewind';

import { usePermissions } from '@/hooks/usePermissions';
import { startLocationUpdates } from '@/services/LocationService';
import { NAV_THEME } from '@/lib/nav-theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { requestAllPermissions } = usePermissions();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Run only on mount
  useEffect(() => {
    const initializeApp = async () => {
      // Request permissions on first launch
      const result = await requestAllPermissions();

      // Start location tracking if we have background permission
      if (result.backgroundLocation) {
        await startLocationUpdates();
        console.log('Location tracking started');
      }
    };

    initializeApp();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        key={`root-status-bar-${isDark ? 'light' : 'dark'}`}
        style={isDark ? 'light' : 'dark'}
      />
      <NavThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ presentation: 'modal', title: 'Settings' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <PortalHost />
      </NavThemeProvider>
    </GestureHandlerRootView>
  );
}
