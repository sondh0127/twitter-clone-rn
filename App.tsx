import AsyncStorage from '@react-native-community/async-storage'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { StatusBar } from 'expo-status-bar'
import jwtDecode from 'jwt-decode'
import React, { useEffect } from 'react'
import { Alert, Button, Platform, StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './src/hooks/useCachedResources'
import useColorScheme from './src/hooks/useColorScheme'
import Navigation from './src/navigation'
import { useAuth } from './src/store/auth'
import { JWTDecoded, Session } from './src/types/session'

const auth0ClientId = 'kTYHc5xkRq4kLc7MbkeJHfr6D7DfBNZw'
const authorizationEndpoint =
  'https://next-expo-twitter-clone.au.auth0.com/authorize'

const useProxy = Platform.select({ web: false, default: true })
const redirectUri = makeRedirectUri({ useProxy })

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  const { session, login, logout, isLoading } = useAuth()

  const [request, result, promptAsync] = useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: 'id_token',
      // retrieve the user's profile
      scopes: ['openid', 'profile', 'email'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce',
      },
    },
    { authorizationEndpoint },
  )

  useEffect(() => {
    if (result) {
      if (result.type === 'error') {
        Alert.alert(
          'Authentication error',
          result.params.error_description || 'something went wrong',
        )
        return
      }
      if (result.type === 'success') {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token
        const decoded = jwtDecode(jwtToken) as JWTDecoded
        const session: Session = {
          ...decoded,
          token: jwtToken,
        }

        login(session)
      }
    }
  }, [result])

  useEffect(() => {
    AsyncStorage.getItem('@session')
      .then((sessionString) => {
        // If session exists, validate it, else redirect to login screen
        if (sessionString) {
          // decode
          const sessionObj = JSON.parse(sessionString)
          var currentTime = Math.floor(new Date().getTime() / 1000)
          if (currentTime > sessionObj.exp) {
            logout()
          } else {
            login(sessionObj)
          }
        } else {
          logout()
        }
      })
      .catch((err) => {
        logout()
        console.log(`RootNavigator:React.FC -> err`, err)
      })
  }, [])

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        {session && <Navigation colorScheme={colorScheme} />}
        {!session && (
          <View style={styles.container}>
            <Button
              disabled={!request}
              title="Log in with Auth0"
              onPress={() => promptAsync({ useProxy })}
            />
          </View>
        )}
        <StatusBar />
      </SafeAreaProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
})
