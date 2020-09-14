import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import {
  Avatar,
  Caption,
  Drawer,
  Paragraph,
  Switch,
  Text,
  Title,
  TouchableRipple,
  useTheme,
} from 'react-native-paper'
import Animated from 'react-native-reanimated'

import { useAppTheme } from '../../store/theme'
import { tailwind as tw, getColor } from '../../styles/tailwind'

export const srcAvatar = `https://avatars3.githubusercontent.com/u/62163604?s=460&u=2d0ed85df93a996e55f9f81034abd2975d2342d3&v=4`

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { navigation, progress } = props
  const paperTheme = useTheme()

  const { theme, toggleTheme } = useAppTheme()

  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  })
  return (
    <DrawerContentScrollView {...props}>
      <Animated.View
        style={[
          styles.drawerContent,
          {
            backgroundColor: paperTheme.colors.surface,
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={styles.userInfoSection}>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer())
            }}
          >
            <Avatar.Image source={{ uri: srcAvatar }} size={50} />
          </TouchableOpacity>
          <Title style={styles.title}>Son Do Hong</Title>
          <Caption style={styles.caption}>@sondh0127</Caption>
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                177
              </Paragraph>
              <Caption style={styles.caption}>Following</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                77
              </Paragraph>
              <Caption style={styles.caption}>Follower</Caption>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          {/* <DrawerItemList {...props} /> */}
          <Drawer.Item
            icon={({ size, color }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Profile"
            onPress={() => {
              // navigation.navigate('Profile')
            }}
          />
          <Drawer.Item
            // style={{ backgroundColor: '#64ffda' }}
            icon={({ size, color }) => (
              <MaterialCommunityIcons name="tune" color={color} size={size} />
            )}
            label="Lists"
            onPress={() => {
              // navigation.navigate('Todos')
            }}
          />
          <Drawer.Item
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            label="Topic"
            onPress={() => {
              // navigation.navigate('Logout')
            }}
          />
          <Drawer.Item
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            label="Bookmarks"
            onPress={() => {
              // navigation.navigate('Logout')
            }}
          />
          <Drawer.Item
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            label="Moments"
            onPress={() => {
              // navigation.navigate('Logout')
            }}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={toggleTheme}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={theme === 'dark'} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </Animated.View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginHorizontal: 2,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})

export default DrawerContent
