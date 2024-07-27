////import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
////import React, {useEffect, useRef, useState} from 'react';
////import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
////import {SafeAreaView} from 'react-native-safe-area-context';
////import {TextComponent} from '../../components';
////import {appColors} from '../../constants/appColors';
////import {useDispatch} from 'react-redux';
////import {setIsCloseBottomTab} from '../../redux/reducers/bottomTabReducer';
////const CalendarsScreen = ({navigation}: any) => {
////  const dispatch = useDispatch();
////  const tabBarHeight = useBottomTabBarHeight();

////  const [scrollDirection, setScrollDirection] = useState<
////    'up' | 'down' | 'none'
////  >('none');
////  const lastOffsetY = useRef(0);

////  const onScroll = Animated.event(
////    [{nativeEvent: {contentOffset: {y: new Animated.Value(0)}}}],
////    {
////      useNativeDriver: false,
////      listener: (event: any) => {
////        const currentOffsetY = event.nativeEvent.contentOffset.y;
////        if (currentOffsetY > lastOffsetY.current) {
////          setScrollDirection('down');
////        } else if (currentOffsetY < lastOffsetY.current) {
////          setScrollDirection('up');
////        }
////        lastOffsetY.current = currentOffsetY;
////      },
////    },
////  );

////  useEffect(() => {
////    console.log('scrollDirection:', scrollDirection);

////    dispatch(setIsCloseBottomTab(scrollDirection === 'down'));
////  }, [scrollDirection, dispatch]);

////  return (
////    <SafeAreaView style={styles.container}>
////      <Text>hello</Text>
////    </SafeAreaView>
////  );
////};

////const styles = StyleSheet.create({
////  container: {
////    flex: 1,
////  },
////  scrollView: {
////    flex: 1,
////  },
////});

////export default CalendarsScreen;

//import React, {useState} from 'react';
//import {
//  StyleSheet,
//  View,
//  Text,
//  TouchableOpacity,
//  ScrollView,
//} from 'react-native';
//import {SafeAreaView} from 'react-native-safe-area-context';
//import {CalendarList} from 'react-native-calendars';
//import {
//  ArrowLeft,
//  ArrowLeft3,
//  ArrowRight3,
//  Category,
//} from 'iconsax-react-native';
//import moment from 'moment';
//import {appColors} from '../../constants/appColors';
//import {
//  ContainerComponent,
//  RowComponent,
//  TextComponent,
//} from '../../components';

//const CalendarScreen = () => {
//  const today = moment().format('YYYY-MM-DD');
//  const [selectedDate, setSelectedDate] = useState(today);
//  const [selectedTab, setSelectedTab] = useState('Tháng');
//  const [currentMonth, setCurrentMonth] = useState(today);

//  const renderCalendarHeader = () => (
//    <View style={styles.header}>
//      <TouchableOpacity style={{left: 80}} onPress={handlePreviousMonth}>
//        <ArrowLeft3 size="28" color="white" variant="Bold" />
//      </TouchableOpacity>
//      <Text style={styles.headerText}>
//        {moment(currentMonth).format('MMMM')}
//      </Text>
//      <TouchableOpacity style={{right: 80}} onPress={handleNextMonth}>
//        <ArrowRight3 size="28" color="white" variant="Bold" />
//      </TouchableOpacity>
//      {selectedTab === 'Tháng' && currentMonth !== today && (
//        <TouchableOpacity style={styles.todayButton} onPress={goToToday}>
//          <RowComponent styles={{justifyContent: 'flex-end'}}>
//            <ArrowLeft size={12} color="green" variant="Bold" />
//            <TextComponent text={'Today'} styles={[styles.todayButtonText]} />
//          </RowComponent>
//        </TouchableOpacity>
//      )}
//    </View>
//  );

//  const handlePreviousMonth = () => {
//    setCurrentMonth(
//      moment(currentMonth).subtract(1, 'months').format('YYYY-MM-DD'),
//    );
//  };

//  const handleNextMonth = () => {
//    setCurrentMonth(moment(currentMonth).add(1, 'months').format('YYYY-MM-DD'));
//  };

//  const goToToday = async () => {
//    await setCurrentMonth(today);
//    setSelectedDate(today);
//  };

//  const renderTabBar = () => (
//    <View style={styles.tabBar}>
//      {['Tháng', 'Tuần', 'Ngày', 'Danh sách'].map(tab => (
//        <TouchableOpacity
//          key={tab}
//          style={[styles.tab, selectedTab === tab && styles.activeTab]}
//          onPress={() => setSelectedTab(tab)}>
//          <Text
//            style={[
//              styles.tabText,
//              selectedTab === tab && styles.activeTabText,
//            ]}>
//            {tab}
//          </Text>
//        </TouchableOpacity>
//      ))}
//    </View>
//  );

//  const renderCalendar = () => (
//    <View>
//      <CalendarList
//        current={currentMonth}
//        onDayPress={day => {
//          setSelectedDate(day.dateString);
//        }}
//        onMonthChange={(month: any) => {
//          setCurrentMonth(month.dateString);
//        }}
//        markedDates={{
//          [selectedDate]: {
//            selected: true,
//            selectedColor: appColors.green,
//            activeOpacity: 1,
//          },
//          [today]: {
//            selected: true,
//            selectedColor: 'green',
//            activeOpacity: 0.3,
//          },
//        }}
//        theme={{
//          backgroundColor: 'transparent',
//          calendarBackground: 'transparent',
//          selectedDayBackgroundColor: 'green',
//          todayTextColor: 'green',
//          dayTextColor: '#2d4150',
//          textDisabledColor: '#4b7fad',
//          dotColor: 'green',
//          selectedDotColor: '#ffffff',
//          arrowColor: 'green',
//          monthTextColor: 'green',
//          textDayFontWeight: '300',
//          textMonthFontWeight: 'bold',
//          textDayHeaderFontWeight: '300',
//          textDayFontSize: 16,
//          textMonthFontSize: 16,
//          textDayHeaderFontSize: 16,
//        }}
//        pastScrollRange={24}
//        futureScrollRange={24}
//        horizontal
//        pagingEnabled
//        monthFormat={'MMMM yyyy'}
//      />
//    </View>
//  );

//  const renderEventList = () => (
//    <ScrollView style={styles.eventListContainer}>
//      <Text style={styles.eventDate}>26 THÁNG 7</Text>
//      <View style={styles.todoContainer}>
//        <View style={styles.todoHeader}>
//          <Category size="20" color="green" />
//          <Text style={styles.todoTitle}>Đi chơi</Text>
//          <Text style={styles.todoTime}>100</Text>
//        </View>
//        <Text style={styles.todoDescription}>đi chơi nè</Text>
//      </View>
//    </ScrollView>
//  );

//  return (
//    <ContainerComponent isImageBackground>
//      {renderCalendarHeader()}
//      {renderTabBar()}
//      {selectedTab === 'Tháng' && renderCalendar()}
//      {selectedTab === 'Danh sách' && renderEventList()}
//    </ContainerComponent>
//  );
//};

//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//  },
//  header: {
//    flexDirection: 'row',
//    justifyContent: 'space-between',
//    alignItems: 'center',
//    padding: 10,
//    backgroundColor: 'green',
//  },
//  headerText: {
//    color: 'white',
//    fontSize: 18,
//    fontWeight: 'bold',
//  },
//  tabBar: {
//    flexDirection: 'row',
//    justifyContent: 'space-around',
//    borderBottomWidth: 1,
//    borderBottomColor: '#ccc',
//  },
//  tab: {
//    padding: 10,
//  },
//  activeTab: {
//    borderBottomWidth: 2,
//    borderBottomColor: 'green',
//  },
//  tabText: {
//    fontSize: 16,
//    color: '#555',
//  },
//  activeTabText: {
//    color: 'green',
//    fontWeight: 'bold',
//  },
//  eventListContainer: {
//    padding: 20,
//  },
//  eventDate: {
//    fontSize: 24,
//    fontWeight: 'bold',
//    marginBottom: 20,
//  },
//  todayButton: {
//    position: 'absolute',
//    top: 15,
//    left: 10,
//    paddingHorizontal: 10,
//    paddingVertical: 2,
//    backgroundColor: 'white',
//    borderRadius: 100,
//  },
//  todayButtonText: {
//    color: 'green',
//    fontWeight: 'bold',
//    fontSize: 12,
//  },
//  todoContainer: {
//    backgroundColor: 'white',
//    borderRadius: 10,
//    padding: 15,
//    shadowColor: '#000',
//    shadowOffset: {width: 0, height: 2},
//    shadowOpacity: 0.1,
//    shadowRadius: 5,
//    elevation: 3,
//  },
//  todoHeader: {
//    flexDirection: 'row',
//    alignItems: 'center',
//    marginBottom: 10,
//  },
//  todoTitle: {
//    flex: 1,
//    fontSize: 18,
//    color: 'green',
//    marginLeft: 10,
//  },
//  todoTime: {
//    fontSize: 16,
//    color: '#555',
//  },
//  todoDescription: {
//    fontSize: 14,
//    color: '#555',
//  },
//});

//export default CalendarScreen;
import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Agenda, CalendarList} from 'react-native-calendars';
import {
  ArrowCircleLeft2,
  ArrowCircleRight2,
  ArrowLeft,
  ArrowLeft3,
  ArrowRight,
  ArrowRight3,
  Category,
} from 'iconsax-react-native';
import moment from 'moment';
import {appColors} from '../../constants/appColors';
import {
  ContainerComponent,
  RowComponent,
  TextComponent,
} from '../../components';

const CalendarScreen = () => {
  const today = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTab, setSelectedTab] = useState('Tháng');
  const [currentMonth, setCurrentMonth] = useState(today);

  const handlePreviousMonth = useCallback(() => {
    setCurrentMonth(
      moment(currentMonth).subtract(1, 'months').format('YYYY-MM-DD'),
    );
  }, [currentMonth]);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(moment(currentMonth).add(1, 'months').format('YYYY-MM-DD'));
  }, [currentMonth]);

  const goToToday = useCallback(() => {
    setCurrentMonth(today);
    setSelectedDate(today);
  }, [today]);

  const renderCalendarHeader = useCallback(
    () => (
      <View style={styles.header}>
        <TouchableOpacity style={{left: 80}} onPress={handlePreviousMonth}>
          <ArrowCircleLeft2 size="28" color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {moment(currentMonth).format('MMMM')}
        </Text>
        <TouchableOpacity style={{right: 80}} onPress={handleNextMonth}>
          <ArrowCircleRight2 size="28" color="white" />
        </TouchableOpacity>
        {selectedTab === 'Tháng' && currentMonth !== today && (
          <TouchableOpacity
            style={[
              styles.todayButton,
              {left: currentMonth > today ? 10 : 280},
            ]}
            onPress={goToToday}>
            <RowComponent styles={{justifyContent: 'flex-end'}}>
              {currentMonth > today ? (
                <RowComponent>
                  <TextComponent
                    text={'Today '}
                    styles={[styles.todayButtonText]}
                  />
                  <ArrowLeft size={12} color="green" variant="Bold" />
                </RowComponent>
              ) : (
                <RowComponent>
                  <ArrowRight size={12} color="green" variant="Bold" />
                  <TextComponent
                    text={'Today '}
                    styles={[styles.todayButtonText]}
                  />
                </RowComponent>
              )}
            </RowComponent>
          </TouchableOpacity>
        )}
      </View>
    ),
    [
      currentMonth,
      handlePreviousMonth,
      handleNextMonth,
      goToToday,
      selectedTab,
      today,
    ],
  );

  const renderTabBar = useCallback(
    () => (
      <View style={styles.tabBar}>
        {['Tháng', 'Tuần', 'Ngày', 'Danh sách'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}>
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ),
    [selectedTab],
  );

  const renderCalendarMonth = useCallback(
    () => (
      <View>
        <CalendarList
          current={currentMonth}
          onDayPress={day => {
            setSelectedDate(day.dateString);
          }}
          onMonthChange={(month: any) => {
            setCurrentMonth(month.dateString);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: appColors.green,
              activeOpacity: 1,
            },
            [today]: {
              selected: true,
              selectedColor: 'green',
              activeOpacity: 0.3,
            },
          }}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            selectedDayBackgroundColor: 'green',
            todayTextColor: 'green',
            dayTextColor: '#2d4150',
            textDisabledColor: '#4b7fad',
            dotColor: 'green',
            monthTextColor: 'green',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          pastScrollRange={12}
          futureScrollRange={12}
          horizontal
          pagingEnabled
          monthFormat={'MMMM yyyy'}
        />
      </View>
    ),
    [currentMonth, selectedDate, today],
  );
  const renderCalendarWeek = useCallback(
    () => (
      <View>
        <Agenda
          items={{
            '2012-05-22': [{text: 'item 1 - any js object'}],
            '2012-05-23': [{text: 'item 2 - any js object'}],
            '2012-05-24': [],
            '2012-05-25': [{text: 'item 3 - any js object'}],
          }}
          renderEmptyDate={() => <View />}
          hideKnob={true}
          theme={{}}
          style={{}}
        />
      </View>
    ),
    [currentMonth, selectedDate, today],
  );

  const renderEventList = useCallback(
    () => (
      <ScrollView style={styles.eventListContainer}>
        <Text style={styles.eventDate}>26 THÁNG 7</Text>
        <View style={styles.todoContainer}>
          <View style={styles.todoHeader}>
            <Category size="20" color="green" />
            <Text style={styles.todoTitle}>Đi chơi</Text>
            <Text style={styles.todoTime}>100</Text>
          </View>
          <Text style={styles.todoDescription}>đi chơi nè</Text>
        </View>
      </ScrollView>
    ),
    [],
  );

  return (
    <ContainerComponent isImageBackground>
      {renderCalendarHeader()}
      {renderTabBar()}
      {selectedTab === 'Tháng' && renderCalendarMonth()}
      {selectedTab === 'Danh sách' && renderEventList()}
      {selectedTab === 'Tuần' && renderCalendarWeek()}
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'green',
    minHeight: 70,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'green',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    color: 'green',
    fontWeight: 'bold',
  },
  eventListContainer: {
    padding: 20,
  },
  eventDate: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  todayButton: {
    position: 'absolute',
    top: 24,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  todayButtonText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 12,
  },
  todoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  todoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  todoTitle: {
    flex: 1,
    fontSize: 18,
    color: 'green',
    marginLeft: 10,
  },
  todoTime: {
    fontSize: 16,
    color: '#555',
  },
  todoDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default CalendarScreen;
