import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {Image} from 'react-native';
import {appColors} from '../constants/appColors';
import {globalStyle} from '../styles/globalStyles';
import {fontFamilies} from '../constants/fontFamilies';

const AvatarGroupComponent = () => {
  const uIdlength = 10;
  const imagUrl = `https://hoaigiangshop.com/wp-content/uploads/2022/11/mat-na-sieu-nhan-do.jpg`;
  return (
    <RowComponent styles={{justifyContent: 'flex-start'}}>
      {Array.from({length: uIdlength}).map(
        (item, index) =>
          index < 4 && (
            <Image
              source={{uri: imagUrl}}
              key={`images${index}`}
              style={[
                globalStyle.shadow,
                {
                  marginLeft: index > 0 ? -10 : 0,
                },
                styles.avatar,
              ]}
            />
          ),
      )}
      {uIdlength > 5 && (
        <View
          style={[
            styles.avatar,
            {
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: -10,
              backgroundColor: appColors.white,
            },
          ]}>
          <TextComponent
            text={`+${uIdlength - 4}`}
            styles={{fontFamily: fontFamilies.medium}}
          />
        </View>
      )}
    </RowComponent>
  );
};

export default AvatarGroupComponent;
const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: appColors.white,
  },
});
