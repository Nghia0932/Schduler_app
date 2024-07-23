import React from 'react';
import {ActivityIndicator, Image, ImageBackground} from 'react-native';
import {SpaceComponent, TextComponent} from '../components';
import {appInfo} from '../constants/appInfors';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/splash.png')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      imageStyle={{flex: 1}}>
      <Image
        source={require('../assets/images/logo1.png')}
        style={{
          width: appInfo.sizes.WIDTH * 0.7,
          height: appInfo.sizes.HEIGHT * 0.2,
          resizeMode: 'contain',
        }}
      />
      <SpaceComponent height={16} />
      <TextComponent
        text="Schedule.Hub"
        size={32}
        color={appColors.primary}
        font={fontFamilies.bold}
      />
      <ActivityIndicator color={appColors.primary} size={36} />
    </ImageBackground>
  );
};

export default SplashScreen;
