import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import { DrawerParamList } from 'types';

const Header: React.FC<StackHeaderProps> = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;

  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  const theme = useTheme();

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {previous ? (
        <Appbar.BackAction onPress={navigation.goBack} color={theme.colors.primary} />
      ) : (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => {
            ((navigation as any) as DrawerNavigationProp<DrawerParamList>).openDrawer();
          }}
        >
          <Avatar.Text size={40} label="SD" />
        </TouchableOpacity>
      )}
      <Appbar.Content
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
  );
};

export default Header;
