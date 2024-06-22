import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {globalStyle} from '../../styles/globalStyles';
import Swiper from 'react-native-swiper';
import {appInfo} from '../../constants/appInfors';
import {appColors} from '../../constants/appColors';

const OnboardingScreen = ({navigation}: any) => {
  const [index, setIndex] = useState(0);

  return (
    <View style={[globalStyle.container]}>
      <Swiper
        style={{}}
        loop={false}
        showsButtons
        onIndexChanged={num => setIndex(num)}
        activeDotColor={appColors.white}
        index={index}>
        <Image
          source={require('../../assets/images/Onboarding1.png')}
          style={styles.img}
        />
        <Image
          source={require('../../assets/images/Onboarding2.png')}
          style={styles.img}
        />
        <Image
          source={require('../../assets/images/Onboarding3.png')}
          style={styles.img}
        />
      </Swiper>
      <View style={styles.view}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.text}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')
          }>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
const styles = StyleSheet.create({
  text: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  img: {
    flex: 1,
    width: appInfo.sizes.WIDTH,
    height: appInfo.sizes.HEIGHT,
    resizeMode: 'cover',
  },
  view: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
