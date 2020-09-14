import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export type AuthStackParamList = {
  Login: undefined
  Signup: undefined
}

export type AuthNavProp<T extends keyof AuthStackParamList> = {
  navigation: StackNavigationProp<AuthStackParamList, T>
  route: RouteProp<AuthStackParamList, T>
}

/* ------------------------------- DrawerRoot ------------------------------- */
export type DrawerParamList = {
  Home: {
    something: string
  }
  Profile: undefined
  Lists: undefined
  Topics: undefined
  Bookmarks: undefined
  Moments: undefined
}

/* --------------------------------- HomeTab -------------------------------- */
export type HomeTabParamList = {
  Feed: undefined
  Notifications: undefined
  Messages: undefined
}

/* -------------------------------- FeedStack ------------------------------- */
export type FeedStackParamList = {
  FeedList: undefined
  FeedDetail: {
    id: number
    name: string
    handle: string
    date: string
    content: string
    image: string
    avatar: string
    comments: number
    retweets: number
    hearts: number
  }
}

/* --------------------------- NotificationsStack --------------------------- */

export type NotificationsStackParamList = {
  NotificationsScreen: undefined
}

/* -------------------------------- Messages -------------------------------- */

export type MessagesStackParamList = {
  MessagesScreen: undefined
}
