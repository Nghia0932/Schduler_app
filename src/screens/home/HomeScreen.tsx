import {
  AddCircle,
  Clock,
  Edit2,
  HambergerMenu,
  Notification,
  SearchNormal1,
} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  Platform,
  ScrollView,
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
import {AddTasksModal, LoadingModal} from '../../modals';
import {authSelector} from '../../redux/reducers/authReducer';
import {setIsCloseBottomTab} from '../../redux/reducers/bottomTabReducer';
import {globalStyle} from '../../styles/globalStyles';
import taskAPI from '../../apis/taskApi';
const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const user = useSelector(authSelector);
  const [Search, setSearch] = useState('');
  const [visiableLoadingModal, setVisiableLoadingModal] = useState(false);
  const [visiableAddTasksModal, setVisiableAddTasksModal] = useState(false);
  const [visiableAddGroupTasksModal, setVisiableAddGroupTasksModal] =
    useState(false);
  const [allTask, setAllTask] = useState<any[]>([]);

  useEffect(() => {
    if (user.email) {
      handleGetAllTask(user.email);
    }
  }, [user.email]);
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

  const handleGetAllTask = async (email: string) => {
    setVisiableLoadingModal(true); // Show loading modal
    try {
      const response = await taskAPI.HandleTask('/getAllTask', {email}, 'post');
      if (response.data) {
        setAllTask(response.data.data);
        console.log(allTask[1]);
      } else {
        console.log('No tasks found');
      }
    } catch (error) {
      console.log('Error fetching tasks: ', error);
    }
    setVisiableLoadingModal(false); // Hide loading modal
  };

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

  const renderTaskItem = ({item}: any) => (
    <TouchableOpacity>
      <CardComponent
        bgColor={`${item.colorCard}`}
        styles={{borderWidth: 1, marginVertical: 5}}>
        <View
          style={{
            flex: 1,
            backgroundColor: `${item.colorCard}`,
            borderRadius: 10,
          }}>
          <RowComponent styles={{justifyContent: 'space-between'}}>
            <View style={{maxWidth: '80%'}}>
              <TextComponent
                text={item.title}
                title
                styles={{
                  fontFamily: fontFamilies.bold,
                  fontSize: 20,
                  paddingHorizontal: 5,
                }}
              />
              <TextComponent
                text={item.description}
                styles={{paddingHorizontal: 5}}
              />
            </View>
            {item.listTodo.length !== 0 ? (
              <CicularComponent value={item.progress} radius={30} />
            ) : (
              <View></View>
            )}
          </RowComponent>
          <SpaceComponent height={15} />
          <RowComponent
            styles={{justifyContent: 'space-between', paddingHorizontal: 5}}>
            <TextComponent text={`Due: ${item.dateEnd}`} />
            <RowComponent>
              <Clock size={12} color={appColors.text} />
              <TextComponent text={` ${item.timeEnd}`} />
            </RowComponent>
          </RowComponent>
        </View>
      </CardComponent>
    </TouchableOpacity>
  );
  const renderUrgentTaskItem = ({item}: any) => {
    const now = new Date();
    const [day, month, year] = item.dateEnd.split('-').map(Number);
    const [endHour, endMinute] = item.timeEnd.split(':').map(Number);

    // Create a Date object for end date with the specified time
    const endDate = new Date(year, month - 1, day);
    // Check if the end date is today
    const isYesterday = endDate < now;
    const isToday = endDate.toDateString() === now.toDateString();
    let remainingTime: string;
    if (isToday) {
      const nowHours = now.getHours();
      const nowMinutes = now.getMinutes();
      // Calculate time difference in milliseconds
      const timeDifference =
        endHour * 60 + endMinute - (nowHours * 60 + nowMinutes);

      if (timeDifference > 0) {
        // Time is still remaining
        const remainingHours = Math.floor(timeDifference / 60);
        const remainingMinutes = Math.floor(timeDifference % 60);
        remainingTime = `${Math.max(0, remainingHours)}h ${Math.max(
          0,
          remainingMinutes,
        )}m left`;
      } else {
        // Time is overdue
        const overdueHours = Math.floor(-timeDifference / 60);
        const overdueMinutes = Math.floor(-timeDifference % 60);
        remainingTime = `limit ${Math.max(0, overdueHours)}h  ${Math.max(
          0,
          overdueMinutes,
        )}m`;
      }
    } else if (isYesterday) {
      // If not today, calculate the difference in days
      const remainingDays = Math.floor(
        (now.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      remainingTime = `${Math.max(0, remainingDays)} days ago`;
    } else {
      return null;
    }

    if (!isToday && item.listTodo.length === 0 && !isYesterday) {
      // If the end date is in the future and no todo items, do not render the CardComponent
      return null;
    }

    return (
      <TouchableOpacity>
        <CardComponent
          bgColor={`${item.colorCard}`}
          styles={{borderWidth: 1, marginVertical: 5}}>
          <View
            style={{
              flex: 1,
              backgroundColor: `${item.colorCard}`,
              borderRadius: 10,
            }}>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <View style={{maxWidth: '80%'}}>
                <TextComponent
                  text={item.title}
                  title
                  styles={{
                    fontFamily: fontFamilies.bold,
                    fontSize: 20,
                    paddingHorizontal: 5,
                  }}
                />
                <TextComponent
                  text={item.description}
                  styles={{paddingHorizontal: 5}}
                />
              </View>
              {item.listTodo.length !== 0 ? (
                <CicularComponent value={item.progress} radius={30} />
              ) : (
                <View></View>
              )}
            </RowComponent>
            <SpaceComponent height={15} />
            <RowComponent
              styles={{justifyContent: 'space-between', paddingHorizontal: 5}}>
              <TextComponent text={`Due: ${item.dateEnd}`} />
              <RowComponent>
                <Clock size={12} color={appColors.text} />
                <TextComponent text={` ${remainingTime}`} />
              </RowComponent>
            </RowComponent>
          </View>
        </CardComponent>
      </TouchableOpacity>
    );
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
            <RowComponent styles={{justifyContent: 'flex-start'}}>
              <TextComponent
                text="Tasks"
                title
                styles={{
                  fontFamily: fontFamilies.bold,
                  paddingLeft: 5,
                  marginBottom: 5,
                  marginRight: 10,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setVisiableAddTasksModal(!visiableAddTasksModal);
                }}>
                <AddCircle size={26} color="green" />
              </TouchableOpacity>
            </RowComponent>
            <SectionComponent>
              <FlatList
                scrollEnabled={false}
                data={allTask}
                renderItem={renderTaskItem}
                keyExtractor={item => item._id}
              />
            </SectionComponent>
            <SpaceComponent height={10} />
            <RowComponent styles={{justifyContent: 'flex-start'}}>
              <TextComponent
                text="Group tasks"
                title
                styles={{
                  fontFamily: fontFamilies.bold,
                  paddingLeft: 5,
                  marginBottom: 5,
                  marginRight: 10,
                }}
              />
              <TouchableOpacity onPress={() => console.log('Add new Tasks')}>
                <AddCircle size={26} color="green" />
              </TouchableOpacity>
            </RowComponent>
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
              <FlatList
                scrollEnabled={false}
                data={allTask}
                renderItem={renderUrgentTaskItem}
                keyExtractor={item => item._id}
              />
            </SectionComponent>
          </View>
        </ContainerComponent>
      </ScrollView>
      <TouchableOpacity style={{position: 'absolute', top: 50, right: 15}}>
        <CircleComponent color="#1855c0" size={36}>
          <View>
            <Notification size={20} color="yellow" />
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
      <LoadingModal visiable={visiableLoadingModal} />
      <AddTasksModal visiableAddTasksModal={visiableAddTasksModal} />
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
