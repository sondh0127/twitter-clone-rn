import { makeRedirectUri } from 'expo-auth-session';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const auth0ClientId = 'kTYHc5xkRq4kLc7MbkeJHfr6D7DfBNZw';
const authorizationEndpoint = 'https://next-expo-twitter-clone.au.auth0.com/authorize';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = makeRedirectUri({ useProxy });

const AuthScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>AutheScreen</Text>
    </View>
  );
};

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
});

export default AuthScreen;
