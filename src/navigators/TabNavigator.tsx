import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {ReactNode, useEffect, useRef, useState} from 'react';

import {
  AddSquare,
  Calendar,
  CalendarTick,
  Profile,
  ProfileTick,
} from 'iconsax-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {appColors} from '../constants/appColors';
import {AddNewScreen, CalendarsScreen} from '../screens';
import HomeNavigator from './HomeNavigator';
import NotificationsScreen from './NotificationNavigator';
import ProfilesNavigator from './ProfilesNavigator';

import {TextComponent} from '../components';
import CalendarNavigator from './CalendarNavigator';
import {Animated, View} from 'react-native';
import {globalStyle} from '../styles/globalStyles';
import DrawerNavigator from './DrawerNavigator';
import {useSelector} from 'react-redux';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const isCloseBottomTab = useSelector(
    (state: any) => state.bottomTabReducer.isCloseBottomTab,
  );
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isCloseBottomTab ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isCloseBottomTab]);

  const tabBarTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 66], // 66 là chiều cao của tab bar
    extrapolate: 'clamp',
  });
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: 66,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{translateY: tabBarTranslateY}],
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: appColors.gray,

        tabBarIcon: ({focused, color, size}) => {
          let icon: ReactNode;
          color = focused ? appColors.primary : appColors.gray;
          size = 26;
          switch (route.name) {
            case 'Home':
              icon = !focused ? (
                <Ionicons name="home-outline" size={size} color={color} />
              ) : (
                <Ionicons name="home" size={size} color={color} />
              );
              break;
            case 'Calendar':
              icon = !focused ? (
                <Calendar size={size} color={color} />
              ) : (
                <CalendarTick size={size} color={color} variant="Bold" />
              );
              break;
            case 'Add':
              icon = (
                <View
                  style={[
                    globalStyle.shadow,
                    {
                      width: 46,
                      height: 46,
                      backgroundColor: appColors.primary,
                      borderRadius: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  <AddSquare size={20} color={appColors.white} variant="Bold" />
                </View>
              );
              break;
            case 'Notifications':
              icon = !focused ? (
                <MaterialIcons
                  name="notifications-none"
                  size={size}
                  color={color}
                />
              ) : (
                <MaterialIcons
                  name="notifications-on"
                  size={size}
                  color={color}
                />
              );
              break;
            case 'Profiles':
              icon = !focused ? (
                <Profile size={size} color={color} />
              ) : (
                <ProfileTick size={size} color={color} variant="Bold" />
              );
              break;
          }
          return icon;
        },
        tabBarIconStyle: {
          marginBottom: -4,
        },
        tabBarLabel({focused}) {
          return (
            <TextComponent
              text={route.name}
              flex={0}
              size={12}
              color={focused ? appColors.primary : appColors.gray}
              styles={{
                marginBottom: 4,
              }}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarNavigator}
        options={{
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddNewScreen}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profiles" component={ProfilesNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
