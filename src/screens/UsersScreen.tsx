import { gql } from '@apollo/client';
import CenterSpinner from 'components/CenterSpinner';
import { useSubscribeToOnlineUsersSubscription } from 'generated/graphql';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

import UserItem from './Users/UserItem';

const SUBSCRIBE_TO_ONLINE_USERS = gql`
  subscription SubscribeToOnlineUsers {
    online_users(order_by: { user: { name: asc } }) {
      user {
        name
        id
      }
      id
    }
  }
`;

const UsersScreen: React.FC = () => {
  const { data, error, loading } = useSubscribeToOnlineUsersSubscription();
  if (loading) {
    return <CenterSpinner />;
  }
  if (error) {
    return <Text> Error </Text>;
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
        <FlatList
          data={data?.online_users}
          renderItem={({ item }) => <UserItem item={item} />}
          keyExtractor={(item) => item.user!.name}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 0.8,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  scrollViewContainer: {
    justifyContent: 'flex-start',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    paddingLeft: 5,
    paddingRight: 10,
  },
  text: {
    fontSize: 12,
  },
  greenDot: {
    backgroundColor: 'green',
    borderRadius: 20,
    height: 15,
    width: 15,
  },
});

export default UsersScreen;
