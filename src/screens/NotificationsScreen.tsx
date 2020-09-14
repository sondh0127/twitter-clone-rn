import color from 'color'
import React from 'react'
import { Dimensions } from 'react-native'
import { useTheme } from 'react-native-paper'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

import { AllNotifications } from '../components/notifications/AllNotification'
import overlay from '../utils/overlay'
import FeedListScreen from './feed/FeedListScreen'

/* -------------------------------- Constants ------------------------------- */

const initialLayout = { width: Dimensions.get('window').width }

/* ---------------------------------- Types --------------------------------- */

/* -------------------------------- Component ------------------------------- */

const All = () => <AllNotifications />

const Mentions = () => <FeedListScreen />
export default function NotificationsScreen() {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'all', title: 'All' },
    { key: 'mentions', title: 'Mentions' },
  ])

  const theme = useTheme()

  const renderScene = SceneMap({
    all: All,
    mentions: Mentions,
  })

  const tabBarColor = theme.dark
    ? (overlay(4, theme.colors.surface) as string)
    : theme.colors.surface

  const rippleColor: string = theme.dark
    ? ((color(tabBarColor).lighten(0.5) as unknown) as string)
    : ((color(tabBarColor).darken(0.2) as unknown) as string)

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: theme.colors.primary }}
            style={{
              backgroundColor: tabBarColor,
              shadowColor: theme.colors.text,
            }}
            labelStyle={{ color: theme.colors.primary }}
            pressColor={rippleColor}
          />
        )}
      />
    </>
  )
}
