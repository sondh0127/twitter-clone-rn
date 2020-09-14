import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { StackHeaderProps } from '@react-navigation/stack'
import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Appbar, Avatar, useTheme } from 'react-native-paper'

import { srcAvatar } from './DrawerContent'

interface FeedHeaderProps extends StackHeaderProps {}

export const FeedHeader: React.FC<FeedHeaderProps> = (props) => {
  const theme = useTheme()

  const { scene, previous, navigation } = props

  const { options } = scene.descriptor
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name
  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={theme.colors.primary}
        />
      ) : (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => {
            ;((navigation as any) as DrawerNavigationProp<object>).openDrawer()
          }}
        >
          <Avatar.Image size={40} source={{ uri: srcAvatar }} />
        </TouchableOpacity>
      )}
      <Appbar.Content
        style={{
          alignItems: 'center',
        }}
        title={
          title === 'Feed' ? (
            <MaterialCommunityIcons
              style={{ marginRight: 10 }}
              name="twitter"
              size={40}
              color={theme.colors.primary}
            />
          ) : (
            title
          )
        }
        titleStyle={{
          fontSize: 18,
          fontWeight: 'bold',
          color: theme.colors.primary,
        }}
      />
    </Appbar.Header>
  )
}

export default FeedHeader
