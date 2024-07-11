import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import ExplorerNavigator from './ExplorerNavigator';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Exploer" component={ExplorerNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
