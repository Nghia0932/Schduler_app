import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {globalStyle} from '../../styles/globalStyles';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowRight} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import authenticationAPI from '../../apis/authApi';
import {LoadingModal} from '../../modals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addAuth} from '../../redux/reducers/authReducer';
import {useDispatch} from 'react-redux';
import {Lock} from 'iconsax-react-native';
import {Validate} from '../../utils/validate';

const VerificationScreen = ({navigation, route}: any) => {
  const {code, email, password, userName, resetPassword} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const [currentCode, setCurrentCode] = useState<string>(code);
  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');
  const [limitTime, setLimitTime] = useState(45);

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [newErrorMessage, setNewErrorMessage] = useState<any>();

  const dispatch = useDispatch();
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  useEffect(() => {
    ref1.current.focus();
  }, []);

  useEffect(() => {
    if (limitTime > 0) {
      const interval = setInterval(() => {
        limitTime > 0 && setLimitTime(limitTime => limitTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    let item = ``;
    codeValues.forEach(val => (item += val));
    console.log(item);
    setNewCode(item);
  }, [codeValues]);

  useEffect(() => {
    if (
      !newErrorMessage ||
      (newErrorMessage &&
        (newErrorMessage.newPassword || newErrorMessage.confirmNewPassword)) ||
      !newPassword ||
      !confirmNewPassword
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
    console.log(newErrorMessage, newPassword, confirmNewPassword);
  }, [newErrorMessage, newPassword, confirmNewPassword]);

  const formValidator = (key: string) => {
    const data = {...newErrorMessage};
    let message = '';
    switch (key) {
      case 'newPassword':
        if (!newPassword) {
          message = 'Please confirm password';
        } else if (!Validate.password(newPassword)) {
          message =
            'Password must contain printed characters, numbers and at least 1 special character';
        } else {
          message = '';
        }
        break;
      case 'confirmNewPassword':
        if (!confirmNewPassword) {
          message = 'Please confirm password';
        } else if (confirmNewPassword !== newPassword) {
          message = 'Confirm password does not match !!';
        } else {
          message = '';
        }
        break;
    }

    data[`${key}`] = message;
    setNewErrorMessage(data);
  };

  const handleChangeCode = (val: string, index: number) => {
    const data = codeValues.slice();
    data[index] = val;

    setCodeValues(data);
  };

  const handleResendverification = async () => {
    const api = `/verification`;
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );
      setLimitTime(45);
      setCurrentCode(res.data.code);
      setErrorMessage('');
      setIsLoading(false);
      setCodeValues(['', '', '', '']);
      ref1.current.focus();
    } catch (error) {
      console.log(`can not send verification code ${error}`);
      setIsLoading(false);
    }
  };

  const handleVerification = async () => {
    if (limitTime > 0) {
      const codeValuesString = codeValues.join('');
      if (parseInt(codeValuesString) !== parseInt(currentCode)) {
        setErrorMessage('Invalid code !!!');
      } else {
        if (resetPassword === 0) {
          setIsLoading(true);
          setErrorMessage('');
          const api = '/signup';
          const data = {
            fullname: userName,
            email: email,
            password: password,
          };
          try {
            const res: any = await authenticationAPI.HandleAuthentication(
              api,
              data,
              'post',
            );
            setIsLoading(false);
            Alert.alert('Signed up successfully');

            //dispatch(addAuth(res.data));
            navigation.navigate('SigninScreen');
            await AsyncStorage.setItem('auth', JSON.stringify(res.data));
          } catch (error) {
            setIsLoading(false);
            setErrorMessage('The email has been signed!');
            console.log(`can not register new user ${error}`);
          }
        }
        if (resetPassword === 1) {
          setIsLoading(true);
          setErrorMessage('');

          setTimeout(() => {
            setShowResetPassword(true);
            setIsLoading(false); // stop loading after showing reset password screen
          }, 1000);
        }
      }
    } else {
      setErrorMessage('time-out xxx Plase resend new verification code');
      setCodeValues(['', '', '', '']);
      ref1.current.focus();
    }
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const api = '/resetPassword';
    const data = {
      email: email,
      password: newPassword,
    };
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        data,
        'post',
      );
      setIsLoading(false);
      Alert.alert('Reset password was successfully!');
      navigation.navigate('SigninScreen');
      dispatch(addAuth(res.data));
      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Loi reset password !');
      console.log(`can not resetpassword new user ${error}`);
    }
  };

  return !showResetPassword ? (
    <ContainerComponent isImageBackground isScroll back>
      <SectionComponent>
        <TextComponent
          text="Verification"
          title
          styles={{fontWeight: 'bold'}}
        />
        <SpaceComponent height={12} />
        <TextComponent
          text={`We've send you the verification code on ${email.replace(
            /.{1,5}/,
            (m: any) => '*'.repeat(m.length),
          )}`}
        />
        <SpaceComponent height={26} />
        <RowComponent justiffy="space-around">
          <TextInput
            keyboardType="number-pad"
            ref={ref1}
            style={styles.input}
            value={codeValues[0] ? codeValues[0] : ''}
            maxLength={1}
            placeholder="-"
            onChangeText={val => {
              handleChangeCode(val, 0);
              val.length > 0 && ref2.current.focus();
            }}
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref2}
            style={styles.input}
            value={codeValues[1] ? codeValues[1] : ''}
            placeholder="-"
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 1);
              val.length > 0 && ref3.current.focus();
            }}
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref3}
            style={styles.input}
            value={codeValues[2] ? codeValues[2] : ''}
            placeholder="-"
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 2);
              val.length > 0 && ref4.current.focus();
            }}
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref4}
            style={styles.input}
            value={codeValues[3] ? codeValues[3] : ''}
            placeholder="-"
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 3);
            }}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{marginTop: 40}}>
        <ButtonComponent
          disable={newCode.length !== 4}
          onPress={handleVerification}
          text="CONTINUE"
          type="primary"
          icon={
            <View
              style={[
                globalStyle.iconContainer,
                {
                  backgroundColor: newCode.length !== 4 ? '#525357' : '#3d56f0',
                },
              ]}>
              <ArrowRight size={20} color={appColors.white} />
            </View>
          }
          iconFlex="right"
        />
      </SectionComponent>
      {errorMessage && (
        <SectionComponent>
          <TextComponent
            styles={{textAlign: 'center'}}
            text={errorMessage}
            color={appColors.danger}
          />
        </SectionComponent>
      )}
      <SectionComponent>
        {limitTime > 0 ? (
          <RowComponent>
            <TextComponent text="Re-send code in " flex={0} />
            <TextComponent
              text={`00:${limitTime}`}
              flex={0}
              color={appColors.primary}
            />
          </RowComponent>
        ) : (
          <RowComponent>
            <ButtonComponent
              type="link"
              text="Resend verification code"
              onPress={handleResendverification}
            />
          </RowComponent>
        )}
      </SectionComponent>
      <LoadingModal visibale={isLoading} />
    </ContainerComponent>
  ) : (
    <ContainerComponent isImageBackground isScroll back>
      <SectionComponent>
        <TextComponent
          text="Reset Password"
          title
          styles={{fontWeight: 'bold'}}
        />
        <SpaceComponent height={26} />
        <TextComponent text="Enter your new password." />
        <InputComponent
          value={newPassword}
          placehoder="Your password"
          onChange={val => setNewPassword(val)}
          allowClear
          isPassword
          affix={<Lock size={22} color={appColors.gray} />}
          onEnd={() => formValidator('newPassword')}
        />
        <TextComponent text="Re-enter your new password." />
        <InputComponent
          value={confirmNewPassword}
          placehoder="Confirm password"
          onChange={val => setConfirmNewPassword(val)}
          allowClear
          isPassword
          affix={<Lock size={22} color={appColors.gray} />}
          onEnd={() => formValidator('confirmNewPassword')}
        />
      </SectionComponent>
      {newErrorMessage && (
        <SectionComponent>
          {Object.keys(newErrorMessage).map(
            (error, index) =>
              newErrorMessage[`${error}`] && (
                <TextComponent
                  text={newErrorMessage[`${error}`]}
                  key={`error${index}`}
                  color={appColors.danger}
                />
              ),
          )}
        </SectionComponent>
      )}
      <SectionComponent styles={{marginTop: 40}}>
        <ButtonComponent
          disable={isDisable}
          onPress={handleResetPassword}
          text="CONTINUE"
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

      <LoadingModal visibale={isLoading} />
    </ContainerComponent>
  );
};

export default VerificationScreen;
const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: appColors.text,
  },
});
