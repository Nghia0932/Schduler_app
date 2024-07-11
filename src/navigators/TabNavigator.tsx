import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {ReactNode} from 'react';

import {
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

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: 66,
          justifyContent: 'center',
          alignItems: 'center',
        },
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
              icon = <MaterialIcons name="add" size={size} color={color} />;
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
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Calendar" component={CalendarNavigator} />
      <Tab.Screen
        name="Add"
        component={AddNewScreen}
        options={
          {
            //tabBarShowLabel: false,
          }
        }
      />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profiles" component={ProfilesNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
