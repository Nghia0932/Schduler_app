import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponent from './TextComponent';
import {globalStyle} from '../styles/globalStyles';
import {appColors} from '../constants/appColors';
import RowComponent from './RowComponent';

interface Props {
  icon?: ReactNode;
  text: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyles?: StyleProp<TextStyle>;
  onPress?: () => void;
  iconFlex?: 'right' | 'left';
  disable?: boolean;
  width?: number;
}

const ButtonComponent = (props: Props) => {
  const {
    icon,
    text,
    type,
    color,
    styles,
    textColor,
    textStyles,
    onPress,
    iconFlex,
    disable,
    width,
  } = props;
  return type === 'primary' ? (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        disabled={disable}
        onPress={onPress}
        style={[
          globalStyle.button,
          globalStyle.shadow,
          {
            backgroundColor: color
              ? color
              : disable
              ? appColors.gray
              : appColors.primary,
            marginBottom: width ? 0 : 15,
            width: width ? width : '80%',
          },
          styles,
        ]}>
        {icon && iconFlex === 'left' && icon}
        <TextComponent
          text={text}
          color={textColor ?? appColors.white}
          styles={[
            textStyles,
            {
              marginLeft: icon ? 12 : 0,
              textAlign: 'center',
            },
          ]}
          flex={icon && iconFlex === 'right' ? 1 : 0}
          size={16}
        />
        {icon && iconFlex === 'right' && icon}
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <RowComponent>
        {icon && iconFlex === 'left' && icon}
        <TextComponent
          flex={0}
          text={text}
          color={type === 'link' ? appColors.primary : appColors.text}
        />
      </RowComponent>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
