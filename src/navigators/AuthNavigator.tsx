import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ForgotPasswordScreen,
  SigninScreen,
  VerificationScreen,
} from '../screens';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [isExistingUser, setIsExistingUser] = useState(false);

  useEffect(() => {
    checkUserExisting();
  }, []);
  const checkUserExisting = async () => {
    const res = await AsyncStorage.getItem('auth');

    res && setIsExistingUser(true);
  };

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isExistingUser && (
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      )}

      <Stack.Screen name="SigninScreen" component={SigninScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
