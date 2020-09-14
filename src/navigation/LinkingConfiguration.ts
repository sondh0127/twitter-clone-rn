import * as Linking from 'expo-linking';

/* Linking to make web routes ? */
export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Login: {
            screens: {
              TabOneScreen: '/login',
            },
          },
          Main: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
