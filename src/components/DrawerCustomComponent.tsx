import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
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
} from 'iconsax-react-native';
const DrawerCustom = ({navigation}: any) => {
  const dispatch = useDispatch();
  const user = useSelector(authSelector);

  //  function getInitials(fullname: string): string {
  //    const words = fullname.split(fullname);
  //    let initials = '';
  //    words.forEach(word => {
  //      initials += word.substring(0, 1);
  //    });
  //    return initials.toUpperCase();
  //  }
  const size = 24;
  const color = appColors.gray;

  const handleSignOut = async () => {
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
      key: 'Message',
      title: 'Message',
      icon: <Message2 size={size} color={color} />,
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
    <View style={[localStyles.container]}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('Profile', {
              screen: 'ProfileScreen',
            });
          }}>
          {user.photoAvatarUrl ? (
            <Image
              source={{uri: user.photoAvatarUrl.toString()}}
              style={[localStyles.avatar]}
            />
          ) : (
            <View
              style={[localStyles.avatar, {backgroundColor: appColors.gray2}]}>
              <TextComponent
                title
                size={24}
                color={appColors.white}
                //text={getInitials(user.fullname)}
                text="okay"
              />
            </View>
          )}
          <TextComponent text={user.fullname} title size={18} />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={{flex: 1, marginVertical: 20}}
        renderItem={({item, index}) => (
          <RowComponent
            styles={localStyles.listitem}
            onPress={
              item.key === 'SignOut'
                ? () => handleSignOut()
                : item.key === 'my-profile'
                ? () => {
                    navigation.navigate('Profile', {
                      screen: 'ProfileScreen',
                    });
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
  },
});
