import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from 'screens/Auth/LoginScreen';
import SignupScreen from 'screens/Auth/SignupScreen';
import { AuthStackParamList } from 'types';

// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<AuthStackParamList>();
const AuthStackNavigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
