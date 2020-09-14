import { Ionicons } from '@expo/vector-icons'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useIsFocused } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import color from 'color'
import React from 'react'
import { Text, View } from 'react-native'
import { FAB, Portal, useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import MessagesScreen from '../screens/MessagesScreen'
import NotificationsScreen from '../screens/NotificationsScreen'
import FeedDetailScreen from '../screens/feed/FeedDetailScreen'
import FeedListScreen from '../screens/feed/FeedListScreen'
import {
  DrawerParamList,
  FeedStackParamList,
  HomeTabParamList,
  MessagesStackParamList,
  NotificationsStackParamList,
} from '../types/navigation'
import overlay from '../utils/overlay'
import FeedHeader from './components/FeedHeader'

function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

/* -------------------------------- FeedStack ------------------------------- */
const FeedStack = createStackNavigator<FeedStackParamList>()

function FeedStackNavigator() {
  return (
    <FeedStack.Navigator
      initialRouteName="FeedList"
      headerMode="screen"
      screenOptions={{
        header: FeedHeader,
      }}
    >
      <FeedStack.Screen
        name="FeedList"
        component={FeedListScreen}
        options={{ headerTitle: 'Feed' }}
      />
      <FeedStack.Screen
        name="FeedDetail"
        component={FeedDetailScreen}
        options={{ headerTitle: 'Tweeet' }}
      />
    </FeedStack.Navigator>
  )
}

/* --------------------------- NotificationsStack --------------------------- */

const NotificationsStack = createStackNavigator<NotificationsStackParamList>()

function NotificationsStackNavigator() {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{ headerTitle: 'Notifications ' }}
      />
    </NotificationsStack.Navigator>
  )
}

/* -------------------------------- Messages -------------------------------- */

const MessagesStack = createStackNavigator<MessagesStackParamList>()

function MessagesStackNavigator() {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{ headerTitle: 'Messages' }}
      />
    </MessagesStack.Navigator>
  )
}

/* --------------------------------- HomeTab -------------------------------- */

const HomeTab = createMaterialBottomTabNavigator<HomeTabParamList>()

interface HomeBottomTabProps
  extends DrawerScreenProps<DrawerParamList, 'Home'> {}

export function HomeTabNavigation(props: HomeBottomTabProps) {
  const { route } = props
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : 'Feed'

  const theme = useTheme()
  const safeArea = useSafeAreaInsets()
  const isFocused = useIsFocused()

  let icon = 'feather'

  switch (routeName) {
    case 'Messages':
      icon = 'email-plus-outline'
      break
    default:
      icon = 'feather'
      break
  }

  const tabBarColor = theme.dark
    ? (overlay(6, theme.colors.surface) as string)
    : theme.colors.surface

  return (
    <>
      <HomeTab.Navigator
        initialRouteName="Feed"
        backBehavior="initialRoute"
        shifting
        activeColor={theme.colors.primary}
        inactiveColor={color(theme.colors.text).alpha(0.6).rgb().string()}
        sceneAnimationEnabled={false}
      >
        <HomeTab.Screen
          name="Feed"
          component={FeedStackNavigator}
          options={{
            tabBarIcon: 'home-account',
            tabBarColor,
          }}
        />
        <HomeTab.Screen
          name="Notifications"
          component={NotificationsStackNavigator}
          options={{
            // tabBarIcon: ({ color }) => (
            //   <TabBarIcon name="ios-code" color={color} />
            // ),
            tabBarIcon: 'bell-outline',
            tabBarColor,
          }}
        />
        <HomeTab.Screen
          name="Messages"
          component={MessagesStackNavigator}
          options={{
            tabBarIcon: 'message-text-outline',
            tabBarColor,
          }}
        />
      </HomeTab.Navigator>
      <Portal>
        <FAB
          visible={isFocused}
          icon={icon}
          style={{
            position: 'absolute',
            bottom: safeArea.bottom + 65,
            right: 16,
          }}
          color="white"
          theme={{
            colors: {
              accent: theme.colors.primary,
            },
          }}
          onPress={() => {}}
        />
      </Portal>
    </>
  )
}

export default HomeTabNavigation
