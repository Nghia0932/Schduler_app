import {
  ArrowCircleLeft2,
  ArrowCircleRight2,
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarEdit,
  Category,
  DocumentText,
  ReceiptText,
  TickCircle,
} from 'iconsax-react-native';
import moment from 'moment';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {
  CircleComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyle} from '../../styles/globalStyles';
import {LoadingModal} from '../../modals';

const CalendarScreen = () => {
  const today = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedWeek, setSelectedWeek] = useState(today);
  const [selectedTab, setSelectedTab] = useState('Tháng');
  const [currentMonth, setCurrentMonth] = useState(today);
  const [currentWeek, setCurrentWeek] = useState(moment(today).isoWeek());
  const scrollViewRef = useRef<ScrollView>(null);
  const [visiable, setVisiable] = useState(false);

  useEffect(() => {
    if (selectedTab === 'Tuần' && scrollViewRef.current) {
      let currentWeekIndex = moment(today).isoWeek();
      setCurrentWeek(moment(today).isoWeek());
      setSelectedWeek(moment(today).format('YYYY-MM-DD'));
      if (currentWeekIndex !== -1) {
        scrollViewRef.current?.scrollTo({
          x: currentWeekIndex * 100 - 100, // Adjust according to the width of your weekBox
          animated: true,
        });
      }
    }
  }, [selectedTab, today]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current?.scrollTo({
        x: currentWeek * 100 - 100, // Adjust according to the width of your weekBox
        animated: true,
      });
    }
  }, [currentWeek]);

  useEffect(() => {
    setCurrentWeek(moment(selectedWeek).isoWeek());
  }, [selectedWeek]);

  const handlePreviousMonth = useCallback(() => {
    setCurrentMonth(
      moment(currentMonth).subtract(1, 'months').format('YYYY-MM-DD'),
    );
  }, [currentMonth]);

  const handlePreviousWeek = useCallback(() => {
    setCurrentWeek(currentWeek - 1);
    setSelectedWeek(
      moment(selectedWeek)
        .subtract(1, 'weeks')
        .endOf('isoWeek')
        .format('YYYY-MM-DD'),
    );
  }, [currentWeek]);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(moment(currentMonth).add(1, 'months').format('YYYY-MM-DD'));
  }, [currentMonth]);

  const handleNextWeek = useCallback(() => {
    setCurrentWeek(currentWeek + 1);
    setSelectedWeek(
      moment(selectedWeek)
        .add(1, 'weeks')
        .endOf('isoWeek')
        .format('YYYY-MM-DD'),
    );
  }, [currentWeek]);

  const goToWeek = () => {
    setCurrentWeek(moment(today).isoWeek());
    setSelectedWeek(moment(today).format('YYYY-MM-DD'));
  };

  const goToToday = useCallback(() => {
    setCurrentMonth(today);
    setSelectedDate(today);
  }, [today]);

  const renderCalendarHeader4Month = useCallback(
    () => (
      <View style={styles.header}>
        <TouchableOpacity style={{left: 80}} onPress={handlePreviousMonth}>
          <ArrowCircleLeft2 size="28" color="white" />
        </TouchableOpacity>

        <SectionComponent
          styles={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.headerText}>
            {moment(currentMonth).format('YYYY')}
          </Text>
          <Text style={styles.headerText}>
            {moment(currentMonth).format('MMMM')}
          </Text>
        </SectionComponent>
        <TouchableOpacity style={{right: 80}} onPress={handleNextMonth}>
          <ArrowCircleRight2 size="28" color="white" />
        </TouchableOpacity>
        {currentMonth !== today && (
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

  const renderCalendarHeader4Week = useCallback(
    () => (
      <View style={styles.header}>
        <TouchableOpacity style={{left: 80}} onPress={handlePreviousWeek}>
          <ArrowCircleLeft2 size="28" color="white" />
        </TouchableOpacity>
        <SectionComponent
          styles={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.headerText}>{selectedWeek.split('', 4)}</Text>
          <Text style={styles.headerText}>Tuần {currentWeek}</Text>
        </SectionComponent>
        <TouchableOpacity style={{right: 80}} onPress={handleNextWeek}>
          <ArrowCircleRight2 size="28" color="white" />
        </TouchableOpacity>
        {moment(selectedWeek).isoWeek() !== moment(today).isoWeek() && (
          <TouchableOpacity
            style={[
              styles.todayButton,
              {
                left:
                  moment(selectedWeek).isoWeek() > moment(today).isoWeek()
                    ? 0
                    : 280,
              },
            ]}
            onPress={goToWeek}>
            <RowComponent styles={{justifyContent: 'flex-end'}}>
              {moment(selectedWeek).isoWeek() > moment(today).isoWeek() ? (
                <RowComponent>
                  <TextComponent
                    text={'To week '}
                    styles={[styles.todayButtonText]}
                  />
                  <ArrowLeft size={12} color="green" variant="Bold" />
                </RowComponent>
              ) : (
                <RowComponent>
                  <ArrowRight size={12} color="green" variant="Bold" />
                  <TextComponent
                    text={'To week '}
                    styles={[styles.todayButtonText]}
                  />
                </RowComponent>
              )}
            </RowComponent>
          </TouchableOpacity>
        )}
      </View>
    ),
    [goToToday, selectedTab, today, currentWeek, selectedWeek],
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
            [today]: {
              selected: true,
              selectedColor: appColors.primary2,
              activeOpacity: 0.3,
            },
          }}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            selectedDayBackgroundColor: appColors.primary2,
            todayTextColor: appColors.primary2,
            dayTextColor: '#2d4150',
            textDisabledColor: '#4b7fad',
            dotColor: appColors.primary2,
            monthTextColor: appColors.primary2,
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
          //calendarWidth={320}
        />
        <View style={{marginHorizontal: 10, marginTop: -30}}>
          <RowComponent
            styles={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              left: 140,
            }}>
            <Calendar size={24} color={appColors.text} />
            <TextComponent
              text={`Hôm nay ,  ${moment(today).format('DD')} tháng ${moment(
                today,
              ).format('MM')} `}
              styles={{
                fontSize: 15,
                fontFamily: fontFamilies.regular,
                paddingLeft: 4,
                paddingTop: 5,
              }}
            />
          </RowComponent>
          <SpaceComponent height={10} />
          <SectionComponent
            styles={{
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 130,
              backgroundColor: 'rgba(194, 228, 253, 0.5)',
              borderRadius: 20,
            }}>
            <TextComponent
              text="Bạn có kế hoạch gì không ?"
              title
              styles={{
                fontSize: 18,
                fontFamily: fontFamilies.semiBold,
                paddingTop: 8,
              }}
            />
            <SpaceComponent height={15} />
            <RowComponent
              styles={{
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <TouchableOpacity style={{marginHorizontal: 15}}>
                <CircleComponent color="#9ace84" size={42}>
                  <View>
                    <CalendarEdit size={20} color="green" />
                  </View>
                </CircleComponent>
                <TextComponent text="Event" styles={{marginTop: 5}} />
              </TouchableOpacity>

              <TouchableOpacity style={{marginHorizontal: 15}}>
                <CircleComponent color="#e6b988" size={42}>
                  <View>
                    <TickCircle size={20} color="red" />
                  </View>
                </CircleComponent>
                <TextComponent text="To do" styles={{marginTop: 5}} />
              </TouchableOpacity>

              <TouchableOpacity style={{marginHorizontal: 15}}>
                <CircleComponent color="#dded9b" size={42}>
                  <View>
                    <DocumentText size={20} color="#6FDCE3" />
                  </View>
                </CircleComponent>
                <TextComponent text="Memo" styles={{marginTop: 5}} />
              </TouchableOpacity>

              <TouchableOpacity style={{marginHorizontal: 15}}>
                <CircleComponent color="#a885dd" size={42}>
                  <View>
                    <ReceiptText size={20} color="pink" />
                  </View>
                </CircleComponent>
                <TextComponent text="Dairy" styles={{marginTop: 5}} />
              </TouchableOpacity>
            </RowComponent>
          </SectionComponent>
        </View>
      </View>
    ),
    [currentMonth, today],
  );

  const renderCalendarWeek = useCallback(() => {
    const weeks = [];
    let startOfWeek = moment(currentMonth)
      .subtract(30, 'weeks')
      .startOf('isoWeek'); // Start from Monday
    let endOfWeek = moment(currentMonth).add(47, 'weeks').endOf('isoWeek'); // End on Sunday
    while (startOfWeek.isBefore(endOfWeek)) {
      weeks.push({
        start: startOfWeek.clone(),
        end: startOfWeek.clone().endOf('isoWeek'),
        weekNumber: startOfWeek.week(),
      });
      startOfWeek.add(1, 'weeks');
    }
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const day = moment(selectedWeek).startOf('isoWeek').add(i, 'days');
      daysOfWeek.push(day);
    }

    //const renderItem = ({item}: any) => (
    //  <RowComponent>
    //    <View style={[styles.dayBox]}>
    //      <SectionComponent>
    //        <TextComponent
    //          text={`${item.format('ddd')}`}
    //          styles={[styles.dayText]}
    //        />
    //        <TextComponent
    //          text={`${item.format('DD')}`}
    //          styles={[{fontFamily: fontFamilies.bold}, styles.dayText]}
    //        />
    //      </SectionComponent>
    //    </View>
    //    <ScrollView
    //      style={{width: 1500, height: 80, backgroundColor: appColors.danger}}
    //      horizontal>
    //      <TextComponent text="HElooo" />
    //      <TextComponent text="HElooo" />
    //      <TextComponent text="HElooo" />
    //      <TextComponent text="HElooo" />
    //      <TextComponent text="HElooo" />
    //      <TextComponent text="HElooo" />
    //      <TextComponent text="HElooo" />
    //    </ScrollView>
    //  </RowComponent>
    //);
    const renderItem = ({item}: any) => (
      <RowComponent styles={{marginLeft: 20}}>
        <SectionComponent styles={styles.dayBox}>
          <TextComponent
            text={`${item.format('ddd')}`}
            styles={[styles.dayText]}
          />
          <TextComponent
            text={`${item.format('DD')}`}
            styles={[{fontFamily: fontFamilies.bold}, styles.dayText]}
          />
        </SectionComponent>
        <View>
          <ScrollView
            style={styles.horizontalScrollView}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {/* Example items inside the horizontal ScrollView */}
            <TouchableOpacity style={styles.dayBox}>
              <TextComponent text="Box 1" styles={styles.dayText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dayBox}>
              <TextComponent text="Box 2" styles={styles.dayText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dayBox}>
              <TextComponent text="Box 3" styles={styles.dayText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dayBox}>
              <TextComponent text="box 4" styles={styles.dayText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dayBox}>
              <TextComponent text="box 5" styles={styles.dayText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dayBox}>
              <TextComponent text="box 6" styles={styles.dayText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dayBox}>
              <TextComponent text="box 7" styles={styles.dayText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dayBox}>
              <TextComponent text="" styles={styles.dayText} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </RowComponent>
    );

    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}>
          <View style={styles.weekContainer}>
            {weeks.map((week, index) => {
              const isCurrentWeek = week.start.isSame(today, 'isoWeek');
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.weekBox,
                    week.start.isSame(selectedWeek, 'isoWeek') &&
                      styles.selectedWeekBox,
                    isCurrentWeek && styles.currentWeekBox,
                  ]}
                  onPress={() => {
                    setSelectedWeek(week.start.format('YYYY-MM-DD'));
                    setCurrentWeek(week.weekNumber);
                  }}>
                  <Text
                    style={[
                      styles.weekText,
                      isCurrentWeek && styles.currentWeekText,
                    ]}>
                    {week.start.format('DD')} - {week.end.format('DD')}{' '}
                  </Text>
                  <Text
                    style={[
                      globalStyle.text,
                      isCurrentWeek && styles.currentWeekText4Month,
                    ]}>
                    {week.end.format('MMMM')}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <View>
          <FlatList
            style={{height: 450}}
            data={daysOfWeek}
            renderItem={renderItem}
            keyExtractor={item => item.format('YYYY-MM-DD')}
            contentContainerStyle={styles.daysContainer}
          />
        </View>
      </View>
    );
  }, [selectedWeek, selectedDate]);

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
      {selectedTab === 'Tháng' && renderCalendarHeader4Month()}
      {selectedTab === 'Tuần' && renderCalendarHeader4Week()}
      {renderTabBar()}
      {selectedTab === 'Tháng' && renderCalendarMonth()}
      {selectedTab === 'Danh sách' && renderEventList()}
      {selectedTab === 'Tuần' && renderCalendarWeek()}
      {<LoadingModal visiable={visiable} />}
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
    backgroundColor: appColors.primary2,
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
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
    borderRadius: 10,
    backgroundColor: appColors.gray4,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 35,
  },
  activeTab: {
    borderWidth: 1,
    borderColor: appColors.primary2,
    borderRadius: 10,
    backgroundColor: appColors.primary2,
    margin: 2,
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    color: appColors.white,
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
    color: appColors.primary2,
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
    color: appColors.primary2,
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
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    color: 'black',
  },
  detail: {
    fontSize: 14,
    color: 'gray',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  weekBox: {
    width: 90,
    backgroundColor: 'white',
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  currentWeekBox: {
    width: 90,
    backgroundColor: appColors.primary2,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  selectedWeekBox: {
    borderColor: appColors.primary2,
    borderWidth: 2,
  },
  weekText: {
    fontSize: 16,
    color: 'black',
    fontFamily: fontFamilies.medium,
  },
  currentWeekText: {
    fontSize: 16,
    color: 'white',
    fontFamily: fontFamilies.medium,
  },
  currentWeekText4Month: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: appColors.white,
  },
  daysContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
    minHeight: 650,
  },

  dayText: {
    fontSize: 16,
    color: 'black',
  },

  dayBox: {
    minWidth: 80,
    minHeight: 70,
    aspectRatio: 1,
    margin: '0.5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },

  selectedDayBox: {
    backgroundColor: appColors.primary,
  },
  horizontalScrollView: {
    width: 300, // Ensure this is large enough to show horizontal scrolling
    height: 85,
    borderRadius: 10,
    margin: '0.5%',
  },
  rowComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default CalendarScreen;
