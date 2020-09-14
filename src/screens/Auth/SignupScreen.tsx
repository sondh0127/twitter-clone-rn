import React from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useMutation } from 'react-query';
import { AuthNavProp } from 'types';
import handleError from 'utils/handleError';

import AuthForm, { FormValues } from './components/AuthForm';
import Logo from './components/Logo';
import styles from './components/styles';
import useKeyboardOpen from './components/useKeyboardOpen';

const SignupScreen: React.FC<AuthNavProp<'Signup'>> = ({ navigation }) => {
  const isKeyboardOpen = useKeyboardOpen();
  const [mutateSignup, { isLoading }] = useMutation(async (formData: FormValues) => {
    const res = await fetch('https://hasura.io/learn/auth/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return await res.json();
  });
  const handleSignup = async (values: FormValues) => {
    try {
      const res = await mutateSignup(values);
      if (res.id) {
        // navigate to login and fill form login with the values
        // OR
        // autologin
        Alert.alert('Success!', 'Successfully signed up! Please login.');
        return;
      }

      if (res.errors && res.errors.length > 0) {
        handleError({
          title: 'Error',
          message: res.errors[0].message,
        });
        return;
      } else if (res.message && res.message.includes('unique')) {
        handleError({
          title: 'This email is already signed up',
          message: 'Try logging in',
        });
        return;
      }
      handleError({
        title: 'Unknown Error',
        message: 'Please try again',
      });
    } catch (err) {
      console.log(err);
      handleError({
        title: 'Unexpected',
        message: 'Please try again',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      {/* Logo */}
      {!isKeyboardOpen && <Logo />}
      {/* Tabs */}
      <View style={isKeyboardOpen ? styles.koTabContainer : styles.tabContainer}>
        <View style={styles.tabHeader}>
          <View style={styles.activeTab}>
            <Text style={styles.tabHeaderTextActive}>SIGN UP</Text>
          </View>
        </View>
        <View style={styles.tabContent}>
          <AuthForm type="signup" submit={handleSignup} isLoading={isLoading} />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.tabHeaderText}>Log in</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
