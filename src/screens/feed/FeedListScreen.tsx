import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs'
import {
  CompositeNavigationProp,
  RouteProp,
  useTheme,
} from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'

import { Twitt } from '../../components/twitt/Twitt'
import { FeedStackParamList, HomeTabParamList } from '../../types/navigation'
import { twitts } from '../../utils/twittsData'

/* ---------------------------------- Types --------------------------------- */

type FeedListNavigationProps = CompositeNavigationProp<
  MaterialBottomTabNavigationProp<HomeTabParamList, 'Feed'>,
  StackNavigationProp<FeedStackParamList, 'FeedList'>
>

type FeedListScreenProps = {
  navigation: FeedListNavigationProps
  route: RouteProp<FeedStackParamList, 'FeedList'>
}

type TwittProps = React.ComponentProps<typeof Twitt>

/* -------------------------------- Component ------------------------------- */

function renderItem({ item }: { item: TwittProps }) {
  return <Twitt {...item} />
}

function keyExtractor(item: TwittProps) {
  return item.id.toString()
}

export default function FeedListScreen(props: FeedListScreenProps) {
  const theme = useTheme()

  const data = twitts.map((twittProps) => ({
    ...twittProps,
    onPress: () =>
      props.navigation &&
      props.navigation.push('FeedDetail', {
        ...twittProps,
      }),
  }))
  return (
    <FlatList
      contentContainerStyle={{ backgroundColor: theme.colors.background }}
      style={{ backgroundColor: theme.colors.background }}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => (
        <View style={{ height: StyleSheet.hairlineWidth }} />
      )}
    />
  )
}
