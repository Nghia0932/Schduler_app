import {View, Image, Switch, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {Lock, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import {LoadingModal} from '../../modals';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  //useEffect(() => {
  //  const emailValidation = Validate.email(email);
  //  if (!email || !password || !emailValidation) {
  //    setIsDisable(true);
  //  } else {
  //    setIsDisable(false);
  //  }
  //});

  //const handleSignin = async () => {
  //  if (!(email && password)) {
  //    Alert.alert('Please enter complete information!');
  //    return;
  //  }
  //  if (!emailValidation) {
  //    Alert.alert('Email invalidate!');
  //    return;
  //  }
  //  setIsLoading(true);
  //  try {
  //    setIsLoading(true);
  //    const res = await authenticationAPI.HandleAuthentication(
  //      '/login',
  //      {email, password},
  //      'post',
  //    );

  //    dispatch(addAuth(res.data));

  //    await AsyncStorage.setItem(
  //      'auth',
  //      isRemember ? JSON.stringify(res.data) : email,
  //    );

  //    Alert.alert('', 'Logged in successfully');
  //    setIsLoading(false);
  //  } catch (error) {
  //    console.log(error);
  //    Alert.alert('', 'Email or Password is not correct');
  //    setIsLoading(false);
  //  }
  //};

  return (
    <>
      <ContainerComponent isImageBackground isScroll>
        <SectionComponent
          styles={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 45,
          }}>
          <Image
            source={require('../../assets/images/logo1.png')}
            style={{width: 300, height: 200, marginBottom: 10}}
          />
        </SectionComponent>
        <SectionComponent>
          <TextComponent
            size={24}
            text="Sign in"
            title
            styles={{fontWeight: 'bold'}}
          />
          <SpaceComponent height={21} />
          <InputComponent
            value={email}
            placehoder="Email"
            onChange={val => setEmail(val)}
            allowClear
            affix={<Sms size={22} color={appColors.gray} />}
          />
          <InputComponent
            value={password}
            placehoder="Password"
            onChange={val => setPassword(val)}
            isPassword
            affix={<Lock size={22} color={appColors.gray} />}
          />
          <RowComponent justiffy="space-between">
            <RowComponent onPress={() => setIsRemember(!isRemember)}>
              <Switch
                trackColor={{true: appColors.primary}}
                thumbColor={appColors.white}
                value={isRemember}
                onChange={() => setIsRemember(!isRemember)}
              />
              <TextComponent text="Remember Me" color={appColors.text} />
            </RowComponent>
            <ButtonComponent
              text="Forgot Password?"
              type="link"
              onPress={() => navigation.navigate('ForgotPasswordScreen')}
            />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <ButtonComponent
            disable={isDisable}
            text="SIGN IN"
            type="primary"
            textStyles={{fontWeight: 'bold'}}
            onPress={() => ''}
          />
        </SectionComponent>

        <SectionComponent>
          <RowComponent justiffy="center">
            <TextComponent text="Don't have an account ?" />
            <ButtonComponent
              type="link"
              text=" Sign up"
              onPress={() => navigation.navigate('SignupScreen')}
            />
          </RowComponent>
        </SectionComponent>
      </ContainerComponent>
      <LoadingModal visibale={isLoading} />
    </>
  );
};

export default LoginScreen;
