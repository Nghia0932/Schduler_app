import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {EventsScreen} from '../screens';

const EventsNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="EventsScreen" component={EventsScreen} />
    </Stack.Navigator>
  );
};

export default EventsNavigator;
