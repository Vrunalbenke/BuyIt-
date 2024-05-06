import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {Colors} from './colors';
import {createContext} from 'react';
import {Appearance} from 'react-native';

export const themes = {
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
  },
  light: {
    ...DefaultTheme,
    backgroundColor: Colors.white,
    primaryTextColor: Colors.darkGray,
    borderColor: Colors.darkLightGray,
  },
  dark: {
    ...DarkTheme,
    backgroundColor: Colors.darkGray,
    primaryTextColor: Colors.offWhite,
    borderColor: Colors.darkLightGray,
  },
};
const colorScheme = Appearance.getColorScheme();
export const ThemeContext = createContext(colorScheme);
