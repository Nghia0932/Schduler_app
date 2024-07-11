import React, {useState} from 'react';
import {
  ButtonComponent,
  SectionComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Google, Meta} from '../../../assets/svg';
import {Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import authenticationAPI from '../../../apis/authApi';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Settings} from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId:
    '866168640176-gaf2bnk1sje9pop1msokp3p4ipics3c2.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

const SocialSignin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSigninWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    const api = '/handleSigninWithGoogle';

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user;
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        user,
        'post',
      );
      console.log(res.data);
      dispatch(addAuth(res.data));
      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOutWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signOut();
      console.log(userInfo);
    } catch (error) {
      console.log('Sign out');
    }
  };

  return (
    <SectionComponent>
      <TextComponent
        styles={{
          textAlign: 'center',
          top: -12,
        }}
        text="OR"
        color={appColors.text}
        size={16}
        fontFamily={fontFamilies.medium}
      />
      <ButtonComponent
        onPress={handleSigninWithGoogle}
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Sign in with Google"
        icon={<Google />}
        textFont={fontFamilies.regular}
        iconFlex="left"
      />
      {/*<ButtonComponent
        onPress={handleSignOutWithGoogle}
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Sign in with Facebook"
        icon={<Meta />}
        textFont={fontFamilies.regular}
        iconFlex="left"
      />*/}
    </SectionComponent>
  );
};

export default SocialSignin;
