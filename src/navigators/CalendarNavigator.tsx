import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {CalendarsScreen} from '../screens';

const CalendarNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CalendarsScreen" component={CalendarsScreen} />
    </Stack.Navigator>
  );
};

export default CalendarNavigator;
