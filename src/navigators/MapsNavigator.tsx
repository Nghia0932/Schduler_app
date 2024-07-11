import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MapsScreen} from '../screens';

const MapsNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MapsScreen" component={MapsScreen} />
    </Stack.Navigator>
  );
};

export default MapsNavigator;
