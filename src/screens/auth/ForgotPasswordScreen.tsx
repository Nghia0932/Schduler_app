import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyle} from '../../styles/globalStyles';
import {ArrowLeft, ArrowRight, Sms, Code} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import {Validate} from '../../utils/validate';
import {LoadingModal} from '../../modals';
import authenticationAPI from '../../apis/authApi';

const initValue = {
  userName: '',
  password: '',
  confirmPassword: '',
};

const ForgotPasswordScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState(initValue);

  const handleCheckEmail = () => {
    const isValidEmail = Validate.email(email);
    setIsDisable(!isValidEmail);
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    const api = `/verification`;

    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );
      navigation.navigate('VerificationScreen', {
        code: res.data.code,
        email: email,
        ...values,
        resetPassword: 1,
      });

      console.log(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <ContainerComponent isImageBackground isScroll back>
      <SectionComponent>
        <TextComponent
          text="Reset Password"
          title
          styles={{fontWeight: 'bold'}}
        />
        <TextComponent text="Please enter your email address to request a password reset" />
        <SpaceComponent height={26} />
        <InputComponent
          placehoder="abc@gmail.com"
          value={email}
          onChange={val => setEmail(val)}
          affix={<Sms size={20} color={appColors.gray} />}
          onEnd={handleCheckEmail}
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          onPress={handleForgotPassword}
          disable={isDisable}
          text="SEND"
          type="primary"
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
      <LoadingModal visiable={isLoading} />
    </ContainerComponent>
  );
};

export default ForgotPasswordScreen;
