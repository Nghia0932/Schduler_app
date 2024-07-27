import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import RowComponent from './RowComponent';
import ButtonComponent from './ButtonComponent';

import TextComponent from './TextComponent';
import {globalStyle} from '../styles/globalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SpaceComponent from './SpaceComponent';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../redux/reducers/authReducer';
import {appColors} from '../constants/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Size,
  User,
  Message2,
  Calendar,
  Bookmark2,
  Sms,
  Setting2,
  MessageQuestion,
  Logout,
  Calendar2,
} from 'iconsax-react-native';
import {fontFamilies} from '../constants/fontFamilies';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import ContainerComponent from './ContainerComponent';
import {setIsCloseBottomTab} from '../redux/reducers/bottomTabReducer';
const DrawerCustom = ({navigation}: any) => {
  const dispatch = useDispatch();
  const user = useSelector(authSelector);

  function getInitials(fullname: string): string {
    const words = fullname.split(' ');
    let initials = '';
    words.forEach(word => {
      initials += word.substring(0, 1);
    });
    return initials.toUpperCase();
  }

  const size = 24;
  const color = appColors.text;
  const handleSignOut = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signOut();
      console.log(userInfo);
    } catch (error) {
      console.log('Sign out');
    }
    dispatch(removeAuth({}));
    await AsyncStorage.clear();
  };

  const profileMenu = [
    {
      key: 'my-profile',
      title: 'My Profile',
      icon: <User size={size} color={color} />,
    },
    {
      key: 'Calendar',
      title: 'Calendar',
      icon: <Calendar2 size={size} color={color} />,
    },

    {
      key: 'ContactUs',
      title: 'ContactUs',
      icon: <Sms size={size} color={color} />,
    },
    {
      key: 'Setting',
      title: 'Settings',
      icon: <Setting2 size={size} color={color} />,
    },
    {
      key: 'HelpAndFAQs',
      title: 'HelpAndFAQs',
      icon: <MessageQuestion size={size} color={color} />,
    },
    {
      key: 'SignOut',
      title: 'SignOut',
      icon: <Logout size={size} color={color} />,
    },
  ];

  return (
    <ImageBackground
      source={require('../assets/images/backg_splashcreen.png')}
      style={{flex: 1}}
      imageStyle={{flex: 1}}>
      <View style={[localStyles.container]}>
        <View>
          <TouchableOpacity
            onPress={() => {
              dispatch(setIsCloseBottomTab(false));
              navigation.closeDrawer();
              navigation.navigate('Profiles', {
                screen: 'ProfilesScreen',
              });
            }}>
            {user.photo ? (
              <Image
                source={{uri: user.photo.toString()}}
                style={[localStyles.avatar]}
              />
            ) : (
              <View
                style={[
                  localStyles.avatar,
                  {backgroundColor: appColors.gray2},
                ]}>
                <TextComponent
                  title
                  size={24}
                  color={appColors.white}
                  text={getInitials(user.name)}
                />
              </View>
            )}
            <TextComponent
              text={user.name}
              title
              size={18}
              styles={{fontFamily: fontFamilies.medium}}
            />
            <TextComponent
              text={`#${user.email}`}
              title
              size={12}
              styles={{fontStyle: 'italic'}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
            width: 240,
            height: 1,
            borderWidth: 0.5,
          }}></View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={profileMenu}
          style={[{flex: 1, marginVertical: 20}]}
          renderItem={({item, index}) => (
            <RowComponent
              styles={localStyles.listitem}
              onPress={
                item.key === 'SignOut'
                  ? () => handleSignOut()
                  : item.key === 'Calendar'
                  ? () => {
                      navigation.navigate(
                        'Calendar',
                        {
                          screen: 'CalendarsScreen',
                        },
                        dispatch(setIsCloseBottomTab(false)),
                      );
                      navigation.closeDrawer();
                    }
                  : item.key === 'my-profile'
                  ? () => {
                      navigation.navigate(
                        'Profiles',
                        {
                          screen: 'ProfilesScreen',
                        },
                        dispatch(setIsCloseBottomTab(false)),
                      );
                      navigation.closeDrawer();
                    }
                  : () => {
                      console.log(item.key);
                    }
              }>
              {item.icon}
              <TextComponent
                text={item.title}
                styles={localStyles.listItemText}
              />
            </RowComponent>
          )}
        />
        <RowComponent justiffy="flex-start">
          <TouchableOpacity
            style={[
              globalStyle.button,
              {backgroundColor: '#00F8FF33', height: 'auto'},
            ]}>
            <MaterialCommunityIcons name="crown" size={32} color={'#00F8FF'} />
            <SpaceComponent width={8} />
            <TextComponent color="#00F8FF" text="Upgrade Pro" />
          </TouchableOpacity>
        </RowComponent>
      </View>
    </ImageBackground>
  );
};

export default DrawerCustom;
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingVertical: StatusBar.currentHeight,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 100,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listitem: {
    paddingVertical: 12,
    justifyContent: 'flex-start',
  },
  listItemText: {
    paddingLeft: 12,
    color: appColors.text,
    fontWeight: 'bold',
  },
});
