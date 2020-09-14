import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'

import { DetailedTwitt } from '../../components/twitt/DetailedTwitt'
import { Twitt } from '../../components/twitt/Twitt'
import { FeedStackParamList, HomeTabParamList } from '../../types/navigation'

/* ---------------------------------- Types --------------------------------- */

type FeedListNavigationProps = CompositeNavigationProp<
  MaterialBottomTabNavigationProp<HomeTabParamList, 'Feed'>,
  StackNavigationProp<FeedStackParamList, 'FeedDetail'>
>

type FeedDetailScreenProps = {
  navigation: FeedListNavigationProps
  route: RouteProp<FeedStackParamList, 'FeedDetail'>
}

/* -------------------------------- Component ------------------------------- */
export default function FeedDetailScreen(props: FeedDetailScreenProps) {
  return <DetailedTwitt {...props.route.params} />
}
