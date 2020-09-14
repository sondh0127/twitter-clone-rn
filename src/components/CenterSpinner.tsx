import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';

const CenterSpinner: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating color={Colors.blue800} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CenterSpinner;
