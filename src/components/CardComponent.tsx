import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyle} from '../styles/globalStyles';
import {appColors} from '../constants/appColors';

interface Props {
  children: ReactNode;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
}

const CardComponent = (props: Props) => {
  const {children, bgColor, styles} = props;
  return (
    <View
      style={[
        globalStyle.inputContainer,
        {
          paddingHorizontal: 5,
          paddingVertical: 5,
          backgroundColor: bgColor ?? appColors.green,
        },
        styles,
      ]}>
      {children}
    </View>
  );
};

export default CardComponent;
