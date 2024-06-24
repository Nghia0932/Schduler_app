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
import {ArrowRight, Lock, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import {LoadingModal} from '../../modals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SocialSignin from './components/SocialSignin';
import {fontFamilies} from '../../constants/fontFamilies';
import {Validate} from '../../utils/validate';
import authenticationAPI from '../../apis/authApi';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import {globalStyle} from '../../styles/globalStyles';

const SigninScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const dispatch = useDispatch();

  const emailValidation = Validate.email(email);
  useEffect(() => {
    const emailValidation = Validate.email(email);
    if (!email || !password || !emailValidation) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  });

  const handleSignin = async () => {
    if (!(email && password)) {
      Alert.alert('Please enter complete information!');
      return;
    }
    if (!emailValidation) {
      Alert.alert('Email invalidate!');
      return;
    }
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await authenticationAPI.HandleAuthentication(
        '/signin',
        {email, password},
        'post',
      );

      dispatch(addAuth(res.data));

      await AsyncStorage.setItem(
        'auth',
        isRemember ? JSON.stringify(res.data) : email,
      );

      Alert.alert('', 'Signed in successfully');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('', 'Email or password is incorrect');
      setIsLoading(false);
    }
  };

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
            style={{width: 150, height: 100, marginBottom: 10}}
          />
          <TextComponent
            text="Scheduler.Hub"
            title
            styles={{color: appColors.primary}}
            font={fontFamilies.bold}
            size={28}
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
                trackColor={{true: appColors.primary, false: appColors.gray}}
                thumbColor={appColors.white}
                value={isRemember}
                onChange={() => setIsRemember(!isRemember)}
              />
              <SpaceComponent width={4} />
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
            onPress={handleSignin}
            icon={
              <View
                style={[
                  globalStyle.iconContainer,
                  {
                    backgroundColor: isDisable ? '#525357' : '#3d56f0',
                  },
                ]}>
                <ArrowRight size={20} color={appColors.white} />
              </View>
            }
            iconFlex="right"
          />
        </SectionComponent>
        <SocialSignin />
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

export default SigninScreen;
