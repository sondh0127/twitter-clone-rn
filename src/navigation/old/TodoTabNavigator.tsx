import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationProp,
} from '@react-navigation/material-bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from 'components/Header';
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import TodoScreen from 'screens/Todos/TodoScreen';
import MenuButton from 'screens/Todos/components/MenuButton';

import {
  BottomTabParamList,
  DrawerParamList,
  PrivateTodosParamList,
  PublicTodosParamList,
} from '../types';

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

const TodoTabNavigator = () => {
  const theme = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="PublicTodos"
      // tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
      backBehavior="initialRoute"
      shifting
      // activeColor={theme.colors.surface}
      // inactiveColor={color(theme.colors.text).alpha(0.6).rgb().string()}
      sceneAnimationEnabled
    >
      <BottomTab.Screen
        name="PublicTodos"
        component={PublicTodosNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons size={20} name="public" color={color} />,
          tabBarColor: theme.colors.primary,
          title: 'Public',
        }}
      />
      <BottomTab.Screen
        name="PrivateTodos"
        component={PrivateTodosNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={20} name="security" color={color} />
          ),
          tabBarColor: theme.colors.accent,
          title: 'Private',
        }}
      />
    </BottomTab.Navigator>
  );
};

export default TodoTabNavigator;

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const PrivateTodosStack = createStackNavigator<PrivateTodosParamList>();

type PrivateTodosNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'Todos'>,
  MaterialBottomTabNavigationProp<BottomTabParamList, 'PrivateTodos'>
>;

const PrivateTodosNavigator: React.FC<{ navigation: PrivateTodosNavigationProp }> = ({
  navigation,
}) => {
  return (
    <PrivateTodosStack.Navigator>
      <PrivateTodosStack.Screen
        name="PrivateTodosScreen"
        component={() => <TodoScreen isPublic={false} />}
        options={{
          headerTitle: 'Private Todos',
          headerLeft: (props) => {
            return <MenuButton onPress={navigation.toggleDrawer} />;
          },
        }}
      />
    </PrivateTodosStack.Navigator>
  );
};

const PublicTodosStack = createStackNavigator<PublicTodosParamList>();

export type PublicTodosNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'Todos'>,
  MaterialBottomTabNavigationProp<BottomTabParamList, 'PublicTodos'>
>;

function PublicTodosNavigator({ navigation }: { navigation: PublicTodosNavigationProp }) {
  return (
    <PublicTodosStack.Navigator>
      <PublicTodosStack.Screen
        name="PublicTodosScreen"
        component={() => <TodoScreen isPublic />}
        options={{
          headerTitle: 'Public Todos',
          header: (props) => <Header {...props} />,
        }}
      />
    </PublicTodosStack.Navigator>
  );
}
