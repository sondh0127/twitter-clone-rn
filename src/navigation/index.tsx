import AsyncStorage from '@react-native-community/async-storage'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { cacheExchange } from '@urql/exchange-graphcache'
import color from 'color'
import React from 'react'
import { ColorSchemeName } from 'react-native'
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import {
  createClient,
  Provider as UrqlProvider,
  dedupExchange,
  fetchExchange,
} from 'urql'

import CenterSpinner from '../components/CenterSpinner'
import useColorScheme from '../hooks/useColorScheme'
import makeApolloClient from '../libs/apollo/makeApolloClient'
import AuthScreen from '../screens/AuthScreen'
import { useAuth } from '../store/auth'
import { useAppTheme } from '../store/theme'
import { darkTheme, lightTheme } from '../styles/PaperTheme'
import LinkingConfiguration from './LinkingConfiguration'
import MainStackNavigation from './MainNavigation'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  const { theme } = useAppTheme()
  const paperTheme = theme === 'light' ? lightTheme : darkTheme
  const navigationTheme = theme === 'light' ? DefaultTheme : DarkTheme

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={navigationTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  )
}

const client = (token: string) =>
  createClient({
    url: 'https://next-expo-twitter-clone.herokuapp.com/v1/graphql',
    fetchOptions: () => {
      return {
        headers: {
          // 'x-hasura-admin-secret': 'B2123ilu',
          Authorization: `Bearer ${token}`,
        },
      }
    },
    exchanges: [
      dedupExchange,
      // Replace the default cacheExchange with the new one
      cacheExchange({
        /* optional config */
      }),
      fetchExchange,
    ],
  })

function RootNavigator() {
  const { session, isLoading } = useAuth()

  if (!session) {
    return null
  }

  if (isLoading) {
    return <CenterSpinner />
  }

  return (
    <UrqlProvider value={client(session.token)}>
      <MainStackNavigation />
    </UrqlProvider>
  )
}
