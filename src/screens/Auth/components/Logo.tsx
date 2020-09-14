import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const Logo: React.FC = () => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../../../assets/images/hasura_logo_horizontal_blue.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.titleTextWrapper}>
        <Text style={styles.title}>React Native Todo App with GraphQL</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // LOGO
  titleContainer: {
    flex: 0.5,
    marginTop: 40,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  logoWrapper: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  logo: {
    height: 40,
    width: 134,
  },
  titleTextWrapper: {
    flex: 1,
    fontSize: 30,
    marginTop: 30,
  },
  title: {
    fontSize: 50,
    textAlign: 'left',
    fontWeight: '900',
    color: '#39235A',
  },
});

export default Logo;
