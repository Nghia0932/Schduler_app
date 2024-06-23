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
import SocialSignin from './components/SocialSignin';
import {fontFamilies} from '../../constants/fontFamilies';
import {Validate} from '../../utils/validate';
import authenticationAPI from '../../apis/authApi';

const SigninScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const emailValidation = Validate.email(email);
    if (!email || !password || !emailValidation) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  });

  const handleSignin = async () => {
    try {
      const res = await authenticationAPI.HandleAuthentication('/hello');
      console.log(res);
    } catch (error) {
      console.log(error);
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
