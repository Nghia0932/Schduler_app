import {View, Text, Button} from 'react-native';
import React from 'react';
import {appColors} from '../../constants/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  authReducer,
  authSelector,
  removeAuth,
} from '../../redux/reducers/authReducer';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: appColors.text}}>HomeScreen</Text>
      <Button
        title="Log out"
        onPress={async () => {
          await AsyncStorage.setItem('auth', auth.email);
          dispatch(removeAuth({}));
        }}
      />
    </View>
  );
};

export default HomeScreen;
