import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import {SplashScreen} from '../screens';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const AppRouters = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const {getItem} = useAsyncStorage('auth');
  const dispatch = useDispatch();

  useEffect(() => {
    checkSigin();
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const auth = useSelector(authSelector);
  console.log(auth);

  const checkSigin = async () => {
    const res = await getItem();

    res && dispatch(addAuth(JSON.parse(res)));
  };
  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : auth.accesstoken ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default AppRouters;
