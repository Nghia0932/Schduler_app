import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ProfilesScreen} from '../screens';

const ProfilesNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfilesScreen" component={ProfilesScreen} />
    </Stack.Navigator>
  );
};

export default ProfilesNavigator;
