import {View, Text, StyleProp, TextStyle, Platform} from 'react-native';
import React from 'react';
import {appColors} from '../constants/appColors';
import {globalStyle} from '../styles/globalStyles';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  fontFamily?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
}

const TextComponent = (props: Props) => {
  const {text, size, flex, font, color, styles, title} = props;

  const fontDesignDefault = Platform.OS === 'ios' ? 16 : 14;
  return (
    <Text
      style={[
        globalStyle.text,
        {
          color: color ?? appColors.text,
          flex: flex ?? 0,
          fontSize: size ? size : title ? 24 : 14,
          fontFamily: font ? font : fontFamilies.regular,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
