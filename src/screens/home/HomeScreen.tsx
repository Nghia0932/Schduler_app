import {
  Edit2,
  HambergerMenu,
  Notification,
  SearchNormal1,
} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  AvatarGroupComponent,
  CardComponent,
  CardimageComponent,
  CicularComponent,
  CircleComponent,
  ContainerComponent,
  ProgressBarComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {authSelector} from '../../redux/reducers/authReducer';
import {globalStyle} from '../../styles/globalStyles';
import {ScrollView} from 'react-native';
import {setIsCloseBottomTab} from '../../redux/reducers/bottomTabReducer';
import {scrollTo} from 'react-native-reanimated';

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

  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const lastOffsetY = useRef(0);
  const scrollDirection = useRef('');
  const isCloseBottomTab = useSelector(
    (state: any) => state.bottomTabReducer.isCloseBottomTab,
  );
  const seacrchAnimation = {
    transform: [
      {
        scaleX: animatedValue.interpolate({
          inputRange: [0, 75],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),
      },
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 50],
          outputRange: [0, 30],
          extrapolate: 'clamp',
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 80],
          outputRange: [0, -47],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };
  const ViewTextAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 30],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 30],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, 70], // Từ vị trí cuộn 0 đến 50
    outputRange: [120, 70], // Chiều cao thay đổi từ 120 đến 50
    extrapolate: 'clamp', // Giới hạn giá trị trong khoảng 0-50
  });

  const ViewAnimated = Animated.createAnimatedComponent(View);
  const onScrollEndDrag = (event: any) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    let targetY = 0;

    // Điều chỉnh vị trí cuộn dựa trên các điều kiện của bạn
    if (scrollDirection.current === 'down') {
      targetY = contentOffsetY + 200; // Ví dụ: cuộn xuống thêm 200 điểm
      if (targetY > contentHeight - layoutHeight) {
        targetY = contentHeight - layoutHeight; // Giới hạn cuộn không vượt quá cuối cùng
      }
    } else if (scrollDirection.current === 'up') {
      targetY = contentOffsetY - 200; // Ví dụ: cuộn lên thêm 200 điểm
      if (targetY < 0) {
        targetY = 0; // Giới hạn cuộn không vượt quá đầu trang
      }
    }

    scrollViewRef.current?.scrollTo({
      y: targetY,
      animated: true,
    });
  };
  return (
    <SafeAreaView style={[globalStyle.container]}>
      <StatusBar backgroundColor="rgba(39, 45, 45, 0.5)" translucent />
      <ViewAnimated
        style={[
          {
            backgroundColor: appColors.primary,

            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            paddingTop: Platform.OS === 'android' ? 10 : 2,
            paddingHorizontal: 16,
          },
          {height: headerHeight},
        ]}>
        <RowComponent>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <HambergerMenu size={24} color={appColors.white} />
          </TouchableOpacity>
          <ViewAnimated
            style={[
              {flex: 1, alignItems: 'center', paddingTop: 15},
              ViewTextAnimation,
            ]}>
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
          </ViewAnimated>
        </RowComponent>
        <ViewAnimated
          style={[
            {
              flex: 1,
              minHeight: 36,
              marginLeft: 5,
              marginRight: 5,
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              borderRadius: 100,
              left: -10,
              width: '80%',
            },
            seacrchAnimation,
          ]}></ViewAnimated>
        <View
          style={[
            {
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingHorizontal: 10,
              position: 'absolute',
              left: 40,
              bottom: 10,
            },
          ]}>
          <RowComponent styles={{paddingBottom: 10}}>
            <SearchNormal1 size={24} color={appColors.white} variant="Broken" />
            <View
              style={{
                width: 1,
                backgroundColor: appColors.gray2,
                marginHorizontal: 10,
                height: 20,
              }}
            />

            <TextInput
              style={[
                localStyles.input,
                globalStyle.text,
                {
                  flex: 1,
                  minHeight: 36,
                  marginLeft: 10,
                  position: 'absolute',
                  left: 30,
                  paddingBottom: 5,
                },
              ]}
              value={Search}
              placeholder="Search..."
              placeholderTextColor={appColors.white}
              cursorColor={appColors.white}
            />
          </RowComponent>
        </View>
      </ViewAnimated>
      <ScrollView
        showsVerticalScrollIndicator={false}
        //ref={scrollViewRef}
        onScroll={e => {
          const offsetY = e.nativeEvent.contentOffset.y;
          scrollDirection.current =
            offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
          lastOffsetY.current = offsetY;
          animatedValue.setValue(offsetY);
          dispatch(
            setIsCloseBottomTab(
              scrollDirection.current === 'down' ? true : false,
            ),
          );
        }}
        onScrollEndDrag={e => {
          scrollViewRef.current?.scrollTo({
            //y:
            //  scrollDirection.current === 'down' && lastOffsetY.current < 100
            //    ? 100
            //    : lastOffsetY.current,
          });
        }}>
        <ContainerComponent isImageBackground>
          <View style={[{flex: 1}]}>
            <TextComponent
              text="Tasks"
              title
              styles={{
                fontFamily: fontFamilies.bold,
                paddingLeft: 5,
                marginBottom: 5,
              }}
            />
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
                    <CicularComponent value={80} />
                  </View>
                </RowComponent>
              </CardComponent>
            </SectionComponent>
            <SpaceComponent height={10} />
            <TextComponent
              text="Group tasks"
              title
              styles={{
                fontFamily: fontFamilies.bold,
                paddingLeft: 5,
                marginBottom: 5,
              }}
            />
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
                    <TextComponent text="Task Managements mobile app" />
                    <View style={{marginVertical: 24}}>
                      <AvatarGroupComponent />
                      <ProgressBarComponent percent="60%" color="#37dcf6" />
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
                    <ProgressBarComponent percent="40%" color="#5663f7" />
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
                    <TextComponent text="Revision home page" />
                  </CardimageComponent>
                </View>
              </RowComponent>
            </SectionComponent>
            <SpaceComponent height={10} />
            <TextComponent
              text="Urgent tasks"
              title
              styles={{
                fontFamily: fontFamilies.bold,
                paddingLeft: 5,
                marginBottom: 5,
              }}
            />
            <SectionComponent>
              <CardComponent>
                <RowComponent>
                  <CicularComponent value={80} radius={36} />
                  <View style={{flex: 1}}>
                    <TextComponent
                      text="Task progress"
                      title
                      styles={{fontFamily: fontFamilies.semiBold}}
                    />
                    <TextComponent
                      text="30/40 tasks done "
                      styles={{paddingLeft: 5}}
                    />
                    <SpaceComponent height={12} />
                    <RowComponent justiffy="flex-end">
                      <TagComponent
                        text="March 22"
                        onPress={() => console.log('heeko')}
                        color={appColors.danger}
                      />
                    </RowComponent>
                  </View>
                </RowComponent>
              </CardComponent>
              <CardComponent>
                <RowComponent>
                  <CicularComponent value={80} radius={36} />
                  <View style={{flex: 1}}>
                    <TextComponent
                      text="Task progress"
                      title
                      styles={{fontFamily: fontFamilies.semiBold}}
                    />
                    <TextComponent
                      text="30/40 tasks done "
                      styles={{paddingLeft: 5}}
                    />
                    <SpaceComponent height={12} />
                    <RowComponent justiffy="flex-end">
                      <TagComponent
                        text="March 22"
                        onPress={() => console.log('heeko')}
                        color={appColors.danger}
                      />
                    </RowComponent>
                  </View>
                </RowComponent>
              </CardComponent>
              <CardComponent>
                <RowComponent>
                  <CicularComponent value={80} radius={36} />
                  <View style={{flex: 1}}>
                    <TextComponent
                      text="Task progress"
                      title
                      styles={{fontFamily: fontFamilies.semiBold}}
                    />
                    <TextComponent
                      text="30/40 tasks done "
                      styles={{paddingLeft: 5}}
                    />
                    <SpaceComponent height={12} />
                    <RowComponent justiffy="flex-end">
                      <TagComponent
                        text="March 22"
                        onPress={() => console.log('heeko')}
                        color={appColors.danger}
                      />
                    </RowComponent>
                  </View>
                </RowComponent>
              </CardComponent>
            </SectionComponent>
          </View>
        </ContainerComponent>
      </ScrollView>
      <TouchableOpacity style={{position: 'absolute', top: 50, right: 15}}>
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
      </TouchableOpacity>
    </SafeAreaView>
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
  search: {
    position: 'absolute',
    top: 0,
  },
});
