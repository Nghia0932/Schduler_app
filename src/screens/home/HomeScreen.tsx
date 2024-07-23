import {
  View,
  Text,
  Button,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
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
import {
  AvatarGroupComponent,
  CardComponent,
  CardimageComponent,
  CicularComponent,
  CircleComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import {
  Edit2,
  HambergerMenu,
  Notification,
  SearchNormal1,
  Size,
  User,
  UserCirlceAdd,
  UserSquare,
} from 'iconsax-react-native';
import {appInfo} from '../../constants/appInfors';
import {fontFamilies} from '../../constants/fontFamilies';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const user = useSelector(authSelector);
  const [Search, setSearch] = useState('');

  function getInitials(fullname: string): string {
    const words = fullname.split(' ');
    let initials = '';
    words.forEach(word => {
      initials += word.substring(0, 1);
    });
    return initials.toUpperCase();
  }

  return (
    <View style={[globalStyle.container]}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: appColors.primary,
          height: 140,
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
                text="Hello "
                title
                size={16}
                styles={{
                  color: appColors.white,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.closeDrawer();
                  navigation.navigate('Profiles', {
                    screen: 'ProfilesScreen',
                  });
                }}>
                <RowComponent>
                  <TextComponent
                    text={user.name}
                    title
                    size={16}
                    styles={{
                      fontFamily: fontFamilies.medium,
                      color: appColors.white,
                    }}
                  />
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
                        size={12}
                        color={appColors.white}
                        text={getInitials(user.name)}
                      />
                    </View>
                  )}
                </RowComponent>
              </TouchableOpacity>
            </RowComponent>
            <RowComponent>
              <TextComponent
                text="Welcome to "
                styles={{flex: 0, color: appColors.white}}
              />
              <TextComponent
                text="Schedule.Hub"
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
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <RowComponent>
            <SearchNormal1
              size={24}
              color={appColors.white}
              variant="TwoTone"
            />
            <View
              style={{
                width: 1,
                backgroundColor: appColors.gray2,
                marginHorizontal: 10,
                height: 20,
              }}
            />
            <TextInput
              style={[localStyles.input, globalStyle.text, {minHeight: 56}]}
              value={Search}
              placeholder="Search..."
              placeholderTextColor={appColors.white}
              cursorColor={appColors.white}
            />
          </RowComponent>
        </View>
      </View>
      <View style={[{flex: 1, backgroundColor: appColors.white, marginTop: 5}]}>
        <SectionComponent>
          <CardComponent>
            <RowComponent>
              <View style={{flex: 1}}>
                <TextComponent
                  text="Task progress"
                  title
                  styles={{fontFamily: fontFamilies.semiBold}}
                />
                <TextComponent text="30/40 tasks done " />
                <SpaceComponent height={12} />
                <RowComponent justiffy="flex-start">
                  <TagComponent
                    text="March 22"
                    onPress={() => console.log('heeko')}
                  />
                </RowComponent>
              </View>
              <View>
                <CicularComponent value={10} />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent styles={{alignItems: 'flex-start'}}>
            <View style={{flex: 1}}>
              <CardimageComponent>
                <TouchableOpacity style={[globalStyle.iconCard]}>
                  <Edit2 size={20} color={appColors.white} />
                </TouchableOpacity>
                <TextComponent
                  text="UX Design"
                  title
                  styles={{
                    fontFamily: fontFamilies.semiBold,
                    fontSize: 22,
                  }}
                />
                <TextComponent text="Task Managements mobile app" size={16} />
                <View style={{marginVertical: 24}}>
                  <AvatarGroupComponent />
                </View>
                <TagComponent
                  text="2024 March 03"
                  tagStyles={{marginHorizontal: -5}}
                />
              </CardimageComponent>
            </View>
            <SpaceComponent width={16} />
            <View style={{flex: 1}}>
              <CardimageComponent color="rgba(215, 255, 145, 0.9)">
                <TouchableOpacity style={[globalStyle.iconCard]}>
                  <Edit2 size={20} color={appColors.white} />
                </TouchableOpacity>
                <TextComponent
                  text="API Payment"
                  title
                  styles={{fontFamily: fontFamilies.semiBold, fontSize: 22}}
                />
                <AvatarGroupComponent />
              </CardimageComponent>
              <SpaceComponent height={16} />
              <CardimageComponent color="rgba(164, 247, 255, 0.9)">
                <TouchableOpacity style={[globalStyle.iconCard]}>
                  <Edit2 size={20} color={appColors.white} />
                </TouchableOpacity>
                <TextComponent
                  text="Update work"
                  title
                  styles={{fontFamily: fontFamilies.semiBold, fontSize: 22}}
                />
                <TextComponent text="Revision home page" size={16} />
              </CardimageComponent>
            </View>
          </RowComponent>
        </SectionComponent>
      </View>
    </View>
  );
};

export default HomeScreen;
const localStyles = StyleSheet.create({
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 100,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    paddingHorizontal: 5,
  },
});
