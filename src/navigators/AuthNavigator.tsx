import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ForgotPasswordScreen, SigninScreen, SignupScreen} from '../screens';
import OnboardingScreen from '../screens/auth/OnboardingScreen';

export const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="SigninScreen" component={SigninScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
