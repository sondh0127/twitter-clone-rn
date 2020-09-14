import { useApolloClient } from '@apollo/client';
import { useAuth } from 'contexts/AuthContext';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const LogoutScreen: React.FC = () => {
  const { logout } = useAuth();
  const client = useApolloClient();

  const handlePress = () => {
    client.resetStore();
    logout();
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LogoutScreen;
