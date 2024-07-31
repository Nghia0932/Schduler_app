import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CloseCircle,
  Colorfilter,
  ReceiptText,
  TickCircle,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import taskAPI from '../apis/taskApi';
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import DatePicker from 'react-native-date-picker';

interface Props {
  visiableAddTasksModal: boolean;
}
type Mode = 'time' | 'date' | 'datetime';
const initValue = {
  email: '',
  title: '',
  description: '',
  colorCard: '',
  dateStart: '',
  dateEnd: '',
  listTodo: [''],
};

const AddTasksModal = (props: Props) => {
  const [values, setValues] = useState(initValue);
  const {visiableAddTasksModal} = props;
  const [visiable, setVisable] = useState(false);
  const [visiableDateTimePicker, setVisiableDateTimePicker] = useState(false);
  const [mode, setMode] = useState<Mode>('date');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateStart, setDateStart] = useState(Date);
  const [dateEnd, setDateEnd] = useState(Date);
  const [timeStart, setTimeStart] = useState(Date);
  const [timeEnd, setTimeEnd] = useState(Date);
  const [listTodo, setListTodo] = useState(['']);
  const [tempDate, setTempDate] = useState(new Date());
  const [typeDateTime, setTypeDateTime] = useState('');
  const [newTodo, setNewTodo] = useState('');
  const [allday, setAllday] = useState(false);

  const handleAddNewTask = async () => {
    setIsLoading(true);
    const api = 'addNewTask';
    try {
      const res = await taskAPI.HandleTask(api, {title, description}, 'post');
      console.log(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setTitle('');
    setDescription('');
    setListTodo(['']);
    setNewTodo('');
    setVisable(false);
    getCurrentDateTime();
  };

  const keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide',
    () => {
      setKeyboardVisible(false);
    },
  );
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // Định dạng ngày theo YYYY-MM-DD
    const date = `${day}-${month}-${year}`;
    // Định dạng giờ theo HH:MM:SS
    const time = `${hours}:${minutes}`;
    setDateStart(date);
    setDateEnd(date);
    setTimeStart(time);
    setTimeEnd('24:00');
  };
  const setDateTime = (DateTime: any) => {
    const year = DateTime.getFullYear();
    const month = String(DateTime.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(DateTime.getDate()).padStart(2, '0');
    const hours = String(DateTime.getHours()).padStart(2, '0');
    const hoursTimeEnd = String(DateTime.getHours() + 1).padStart(2, '0');
    const minutes = String(DateTime.getMinutes()).padStart(2, '0');

    // Định dạng ngày theo DD-MM-YYYY
    const date = `${day}-${month}-${year}`;
    // Định dạng giờ theo HH:MM
    const time = `${hours}:${minutes}`;

    const timeTimeEnd = `${hoursTimeEnd}:${minutes}`;

    if (typeDateTime === 'dateStart') {
      setDateStart(date);
      setDateEnd(date);
    } else if (typeDateTime === 'dateEnd') {
      // Chuyển đổi dateStart thành đối tượng Date
      const [startDay, startMonth, startYear] = dateStart
        .split('-')
        .map(Number);
      const startDate = new Date(startYear, startMonth - 1, startDay);

      // So sánh DateTime với dateStart
      if (DateTime >= startDate) {
        setDateEnd(date);
      } else {
        // Có thể thông báo lỗi hoặc xử lý khác nếu DateTime nhỏ hơn dateStart
        console.log('DateTime phải lớn hơn hoặc bằng dateStart');
      }
    } else if (typeDateTime === 'timeStart') {
      setTimeStart(time);
      setTimeEnd(timeTimeEnd);
    } else if (typeDateTime === 'timeEnd') {
      const [endDay, endMonth, endYear] = dateEnd.split('-').map(Number);
      const endDate = new Date(endYear, endMonth - 1, endDay);

      // Chuyển đổi timeStart và timeEnd thành số phút từ đầu ngày
      const [startHour, startMinute] = timeStart.split(':').map(Number);
      const startTotalMinutes = startHour * 60 + startMinute;

      const endHour = DateTime.getHours();
      const endMinute = DateTime.getMinutes();
      const endTotalMinutes = endHour * 60 + endMinute;

      // Kiểm tra điều kiện timeEnd
      if (dateStart === dateEnd) {
        if (endTotalMinutes >= startTotalMinutes) {
          setTimeEnd(time);
        } else {
          console.log(
            'TimeEnd phải lớn hơn hoặc bằng TimeStart khi DateStart và DateEnd giống nhau',
          );
        }
      } else {
        setTimeEnd(time);
      }
    }
  };

  useEffect(() => {
    // Gọi hàm ngay lập tức

    getCurrentDateTime();
    //// Thiết lập interval để cập nhật mỗi phút
    //const intervalId = setInterval(() => {
    //  getCurrentDateTime();
    //}, 60000); // 60000ms = 1 phút

    //// Dọn dẹp interval khi component bị hủy
    //return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setVisable(true);
  }, [visiableAddTasksModal]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  //useEffect(() => {
  //  console.log('Title:  ', title);
  //  console.log('Description:  ', description);
  //  console.log('listTodo: ', listTodo);
  //}, [listTodo]);

  const handleTodoChange = (text: any, index: any) => {
    const newTodos = [...listTodo];
    newTodos[index] = text;
    setListTodo(newTodos);
    // Nếu người dùng nhập vào TextInput cuối cùng, thêm một TextInput mới
    if (index === listTodo.length - 1 && text.trim() !== '') {
      setListTodo([...newTodos, '']);
    }
  };

  return (
    <Modal
      visible={visiable}
      transparent
      statusBarTranslucent
      animationType="slide">
      <View style={{height: '100%', backgroundColor: 'rgba(12, 12, 12, 0.8)'}}>
        <ImageBackground
          source={require('../assets/images/backg_splashcreen.png')}
          style={{
            marginTop: 100,
            height: '100%',
            top: 30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            flex: 1,
          }}
          imageStyle={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
          <RowComponent
            styles={{
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity onPress={handleCloseModal}>
              <CloseCircle size={34} color="green" />
            </TouchableOpacity>
            <TextComponent
              text="Task"
              title
              styles={{fontFamily: fontFamilies.bold}}
              color={appColors.primary}
            />
            <TouchableOpacity
              onPress={() => {
                setVisable(false);
              }}>
              <TickCircle size={34} color="green" />
            </TouchableOpacity>
          </RowComponent>
          <View
            style={{
              width: '80%',
              height: '20%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: '#ffffff',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 3,
              elevation: 4,
              paddingHorizontal: 5,
            }}>
            <RowComponent styles={{justifyContent: 'space-between'}}>
              <View>
                <TextInput
                  style={{
                    fontSize: 20,
                    backgroundColor: appColors.white,
                    minWidth: '70%',
                    marginBottom: -10,
                    color: appColors.text,
                  }}
                  placeholder="Title"
                  placeholderTextColor={appColors.gray}
                  onChangeText={text => setTitle(text)}
                  value={title}
                  cursorColor={appColors.gray}
                />
                <TextInput
                  style={{
                    fontSize: 14,
                    minWidth: '70%',
                    backgroundColor: appColors.white,
                    color: appColors.text,
                  }}
                  placeholder="Description"
                  placeholderTextColor={appColors.gray}
                  value={description}
                  onChangeText={text => setDescription(text)}
                  cursorColor={appColors.gray}
                  selectionHandleColor={appColors.text}
                />
              </View>
              <TouchableOpacity>
                <SectionComponent>
                  <Colorfilter size={24} color={appColors.primary2} />
                  <TextComponent text="Color" color={appColors.gray} />
                </SectionComponent>
              </TouchableOpacity>
            </RowComponent>
          </View>
          <SpaceComponent height={10} />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              flex: 1,
              paddingBottom: keyboardVisible ? 140 : 0,
              height: 'auto',
            }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  width: '80%',
                  height: 50,
                  alignSelf: 'center',
                  borderRadius: 10,
                  backgroundColor: '#ffffff',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 4,
                  paddingHorizontal: 5,
                }}>
                <RowComponent
                  styles={{justifyContent: 'flex-start', marginBottom: 15}}>
                  <Clock size={24} color={appColors.gray} />
                  <TextComponent
                    styles={{
                      fontSize: 18,
                      minWidth: '70%',
                      color: appColors.gray,
                      fontFamily: fontFamilies.semiBold,
                      paddingLeft: 5,
                      paddingTop: 10,
                    }}
                    text="All day"
                  />
                  <Switch
                    trackColor={{
                      true: appColors.primary2,
                      false: appColors.gray,
                    }}
                    thumbColor={appColors.white}
                    value={allday}
                    onChange={() => setAllday(!allday)}
                  />
                </RowComponent>
                <SectionComponent>
                  <RowComponent styles={{justifyContent: 'space-between'}}>
                    <TouchableOpacity
                      onPress={() => {
                        setVisiableDateTimePicker(true);
                        setMode('date');
                        setTypeDateTime('dateStart');
                      }}>
                      <RowComponent>
                        <ArrowRight size={24} color="green" />
                        <TextComponent
                          text={`${dateStart}`}
                          styles={{
                            marginLeft: 10,
                            fontSize: 16,
                            fontFamily: fontFamilies.semiBold,
                          }}
                        />
                      </RowComponent>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setVisiableDateTimePicker(true);
                        setMode('time');
                        setTypeDateTime('timeStart');
                      }}>
                      <RowComponent>
                        <Entypo
                          name="clock"
                          size={20}
                          color={appColors.gray2}
                        />
                        <TextComponent
                          text={`${timeStart}`}
                          styles={{
                            fontSize: 16,
                            fontFamily: fontFamilies.semiBold,
                            paddingHorizontal: '2%',
                          }}
                        />
                      </RowComponent>
                    </TouchableOpacity>
                  </RowComponent>
                </SectionComponent>
                <SectionComponent>
                  <RowComponent styles={{justifyContent: 'space-between'}}>
                    <TouchableOpacity
                      onPress={() => {
                        setVisiableDateTimePicker(true);
                        setMode('date');
                        setTypeDateTime('dateEnd');
                      }}>
                      <RowComponent>
                        <ArrowLeft size={24} color="green" />
                        <TextComponent
                          text={`${dateEnd}`}
                          styles={{
                            marginLeft: 10,
                            fontSize: 16,
                            fontFamily: fontFamilies.semiBold,
                          }}
                        />
                      </RowComponent>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setVisiableDateTimePicker(true);
                        setMode('time');
                        setTypeDateTime('timeEnd');
                      }}>
                      <RowComponent>
                        <Entypo
                          name="clock"
                          size={20}
                          color={appColors.gray2}
                        />
                        <TextComponent
                          text={`${timeEnd}`}
                          styles={{
                            fontSize: 16,
                            fontFamily: fontFamilies.semiBold,
                            paddingHorizontal: '2%',
                          }}
                        />
                      </RowComponent>
                    </TouchableOpacity>
                  </RowComponent>
                </SectionComponent>
                <View
                  style={{
                    borderWidth: 0.5,
                    width: '80%',
                    borderColor: appColors.gray2,
                    alignSelf: 'center',
                  }}
                />
                <RowComponent
                  styles={{
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}>
                  <RowComponent styles={{justifyContent: 'flex-start'}}>
                    <ReceiptText size={24} color={appColors.gray} />
                    <TextComponent
                      text="To do"
                      styles={{
                        fontSize: 18,
                        color: appColors.gray,
                        fontFamily: fontFamilies.semiBold,
                        paddingLeft: 5,
                        paddingTop: 10,
                      }}
                    />
                  </RowComponent>
                </RowComponent>
                <View style={{paddingBottom: 40}}>
                  {listTodo.map((todo, index) => (
                    <TextInput
                      key={index}
                      style={{
                        fontSize: 18,
                        backgroundColor: appColors.white,
                        minWidth: '70%',
                        color: appColors.text,
                        paddingLeft: 20,
                      }}
                      placeholder="_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ "
                      placeholderTextColor={appColors.gray}
                      value={todo}
                      multiline={true}
                      onChangeText={text => handleTodoChange(text, index)}
                      cursorColor={appColors.gray}
                    />
                  ))}
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ImageBackground>
        <Modal
          visible={visiableDateTimePicker}
          animationType="none"
          transparent
          statusBarTranslucent={true}>
          <View style={styles.viewContainer}>
            <View style={{flex: 1}}>
              <DatePicker
                mode={mode}
                date={tempDate}
                locale={'vi'}
                onDateChange={val => {
                  setTempDate(val);
                }}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                width: '100%',
                borderColor: appColors.gray2,
              }}
            />
            <RowComponent
              styles={{
                width: '100%',
                height: '25%',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: '40%',
                }}
                onPress={async () => {
                  await setDateTime(tempDate), setVisiableDateTimePicker(false);
                }}>
                <TextComponent
                  text="Okay"
                  styles={{
                    fontFamily: fontFamilies.semiBold,
                    fontSize: 18,
                    paddingLeft: '40%',
                    paddingTop: '10%',
                    height: '100%',
                    width: '100%',
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: appColors.gray2,
                  width: 1,
                  height: '100%',
                }}
              />
              <TouchableOpacity
                onPress={() => setVisiableDateTimePicker(false)}
                style={{
                  width: '40%',
                }}>
                <TextComponent
                  text="Cancel"
                  styles={{
                    fontFamily: fontFamilies.semiBold,
                    fontSize: 18,
                    paddingLeft: '25%',
                    paddingTop: '10%',
                    height: '100%',
                    width: '100%',
                  }}
                />
              </TouchableOpacity>
            </RowComponent>
          </View>
        </Modal>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: '80%',
    borderRadius: 50,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255,1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '8%',
    marginVertical: '74%',
    borderRadius: 10,
    shadowColor: '#0004d7',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default AddTasksModal;

function setIsLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}
