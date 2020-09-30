import React, {useState, useEffect} from 'react';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './home';
import Favorites from './favorites';
import Settings from './settings';
import {useSelector} from 'react-redux';
import colors from '../ui/colors';
import {home, favorites, settings} from '../../locals';

const Tabs = () => {
  const Tabs = createBottomTabNavigator();
  const darkMode = useSelector((state) => state.settings.darkMode);

  const iconColor = (focused) =>
    focused ? colors.active[darkMode] : colors.inactive[darkMode];

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeBackgroundColor: colors.mainColor[darkMode],
        inactiveBackgroundColor: colors.mainColor[darkMode],
        activeTintColor: colors.active[darkMode],
        inactiveTintColor: colors.inactive[darkMode],
        style: {borderTopColor: colors.seconderyColor[darkMode]},
      }}>
      <Tabs.Screen
        name={home}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="home" color={iconColor(focused)} />
          ),
        }}
      />
      <Tabs.Screen
        name={favorites}
        component={Favorites}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="favorite" color={iconColor(focused)} />
          ),
        }}
      />
      <Tabs.Screen
        name={settings}
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="settings" color={iconColor(focused)} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default Tabs;
