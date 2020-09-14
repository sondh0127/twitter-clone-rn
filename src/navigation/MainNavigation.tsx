import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { Text } from 'react-native'

import CenterSpinner from '../components/CenterSpinner'
import { useUserQuery } from '../generated/graphql'
import { useAuth } from '../store/auth'
import { DrawerParamList } from '../types/navigation'
import HomeTabNavigation from './HomeTabNavigation'
import DrawerContent from './components/DrawerContent'

const Drawer = createDrawerNavigator<DrawerParamList>()

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeTabNavigation}
        // options={{
      />
      {/* <Drawer.Screen
        name="Todos"
        component={TodoTabNavigator}
        options={{
          drawerIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="tune" color={color} size={size} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="Users"
        component={UserStackNavigation}
        options={{
          title: 'Online Users',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookmark-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          drawerLabel: 'Logout',
          title: 'Logging out',
          drawerIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={size} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  )
}

const MainNavigation: React.FC = () => {
  const { session, logout } = useAuth()

  const [{ data, fetching, error }, reExecuteQuery] = useUserQuery({
    variables: { from: 0, limit: 5 },
  })
  if (fetching) return <CenterSpinner />
  if (error) return <Text>Errored!</Text>

  if (session) {
    return <MainDrawerNavigator />
  }
  return null
}

export default MainNavigation
