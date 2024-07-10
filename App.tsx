import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SplashScreen} from './src/screens';
import {StatusBar} from 'react-native';
import AuthNavigator from './src/navigators/AuthNavigator';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppRouters from './src/navigators/AppRouters';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '866168640176-4l9gdt2isdrqnidtt2ovthljf4rc2dm7.apps.googleusercontent.com',
});

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const {getItem, setItem} = useAsyncStorage('accessToken');
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Provider store={store}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        {isShowSplash ? (
          <SplashScreen />
        ) : (
          <NavigationContainer>
            <AppRouters />
          </NavigationContainer>
        )}
      </Provider>
    </>
  );
};

export default App;
