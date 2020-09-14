import { useAuth } from 'contexts/AuthContext';
import jwtDecoder from 'jwt-decode';
import { JWTDecoded, Session } from 'model';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useMutation } from 'react-query';
import { AuthNavProp } from 'types';
import handleError from 'utils/handleError';

import AuthForm, { FormValues } from './components/AuthForm';
import Logo from './components/Logo';
import styles from './components/styles';
import useKeyboardOpen from './components/useKeyboardOpen';

const LoginScreen: React.FC<AuthNavProp<'Login'>> = ({ navigation }) => {
  const isKeyboardOpen = useKeyboardOpen();
  const { login } = useAuth();
  const [mutateLogin, { isLoading }] = useMutation(async (formData: FormValues) => {
    const res = await fetch('https://hasura.io/learn/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return await res.json();
  });

  const handleLogin = async (values: FormValues) => {
    try {
      const res = await mutateLogin(values);

      if (res.token) {
        const decodedToken: JWTDecoded = jwtDecoder(res.token);
        const session: Session = {
          token: res.token,
          ...decodedToken,
        };
        console.log(`handleLogin -> session`, session);
        login(session);
        return;
      }
      if (res.error) {
        handleError({
          title: 'Error',
          message: res.error,
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
      {!isKeyboardOpen && <Logo />}
      {/* Tabs */}
      <View style={isKeyboardOpen ? styles.koTabContainer : styles.tabContainer}>
        <View style={styles.tabHeader}>
          <View style={styles.activeTab}>
            <Text style={styles.tabHeaderTextActive}>LOG IN</Text>
          </View>
        </View>
        <View style={styles.tabContent}>
          <AuthForm type="login" submit={handleLogin} isLoading={isLoading} />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Signup');
        }}
      >
        <Text style={styles.tabHeaderText}>Sign up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
