import { DarkTheme, DefaultTheme } from 'react-native-paper'

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      publicColor: string
      privateColor: string
    }

    interface Theme {
      myOwnProperty: boolean
    }
  }
}

export const lightTheme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: '#1ba1f2',
    // accent: string;
    publicColor: 'tomato',
    privateColor: 'green',
  },
}

export const darkTheme = {
  ...DarkTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DarkTheme.colors,
    primary: '#1ba1f2',
    publicColor: 'tomato',
    privateColor: 'green',
  },
}
