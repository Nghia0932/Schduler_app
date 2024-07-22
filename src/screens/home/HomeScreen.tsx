import {
  View,
  Text,
  Button,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import {appColors} from '../../constants/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  authReducer,
  authSelector,
  removeAuth,
} from '../../redux/reducers/authReducer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {globalStyle} from '../../styles/globalStyles';
import {CircleComponent, RowComponent, TextComponent} from '../../components';
import {
  HambergerMenu,
  Notification,
  User,
  UserCirlceAdd,
  UserSquare,
} from 'iconsax-react-native';
import {appInfo} from '../../constants/appInfors';
import {fontFamilies} from '../../constants/fontFamilies';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  return (
    <View style={[globalStyle.container]}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: appColors.primary,
          height: 150,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
          paddingHorizontal: 16,
        }}>
        <RowComponent>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <HambergerMenu size={24} color={appColors.white} />
          </TouchableOpacity>
          <View style={[{flex: 1, alignItems: 'center'}]}>
            <RowComponent>
              <TextComponent
                text=" Hello User  "
                styles={{color: appColors.white}}
              />
              <UserSquare size={20} color={appColors.white} />
            </RowComponent>
            <RowComponent>
              <TextComponent
                text="Welcome to "
                styles={{flex: 0, color: appColors.white}}
              />
              <TextComponent
                text="Calendar.Hub"
                styles={{
                  flex: 0,
                  color: appColors.white,
                  fontFamily: fontFamilies.bold,
                  fontSize: 16,
                }}
              />
            </RowComponent>
          </View>
          <CircleComponent color="#524CE0" size={36}>
            <View>
              <Notification size={20} color={appColors.white} />
              <View
                style={{
                  backgroundColor: 'yellow',
                  width: 8,
                  height: 8,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderStartColor: appColors.gray,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}></View>
            </View>
          </CircleComponent>
        </RowComponent>
      </View>
      <View style={[{flex: 1, backgroundColor: appColors.white}]}></View>
    </View>
  );
};

export default HomeScreen;
