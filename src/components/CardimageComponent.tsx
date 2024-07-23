import {View, Text, ImageBackground} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyle} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  color?: string;
}

const CardimageComponent = (props: Props) => {
  const {children, color} = props;
  return (
    <ImageBackground
      source={require('../assets/images/bgCard.png')}
      imageStyle={{borderRadius: 12}}
      style={[globalStyle.card]}>
      <View
        style={[
          {
            backgroundColor: color ?? 'rgba(134, 172, 255, 0.85)',
            borderRadius: 12,
            padding: 12,
          },
        ]}>
        {children}
      </View>
    </ImageBackground>
  );
};

export default CardimageComponent;
