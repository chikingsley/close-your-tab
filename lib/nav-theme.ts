import type { Theme } from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

// These values should match the CSS variables in global.css
// When updating global.css, update these values too
const NAV_THEME_COLORS = {
  light: {
    background: 'rgb(242, 242, 247)', // --background
    border: 'rgb(230, 230, 235)', // --border
    card: 'rgb(255, 255, 255)', // --card
    notification: 'rgb(255, 56, 43)', // --destructive
    primary: 'rgb(0, 123, 254)', // --primary
    text: 'rgb(0, 0, 0)', // --foreground
  },
  dark: {
    background: 'rgb(0, 0, 0)', // --background
    border: 'rgb(40, 40, 42)', // --border
    card: 'rgb(21, 21, 24)', // --card
    notification: 'rgb(254, 67, 54)', // --destructive
    primary: 'rgb(3, 133, 255)', // --primary
    text: 'rgb(255, 255, 255)', // --foreground
  },
};

export const NAV_THEME: { light: Theme; dark: Theme } = {
  light: {
    ...DefaultTheme,
    colors: NAV_THEME_COLORS.light,
  },
  dark: {
    ...DarkTheme,
    colors: NAV_THEME_COLORS.dark,
  },
};
