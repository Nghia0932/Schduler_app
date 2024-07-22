import {View, Text, TouchableOpacity, ViewStyle, StyleProp} from 'react-native';
import React, {ReactNode} from 'react';
import {appColors} from '../constants/appColors';

interface Props {
  size?: number;
  children: ReactNode;
  color?: string;
  onPress?: () => {};
  style?: StyleProp<ViewStyle>;
}

const CircleComponent = (props: Props) => {
  const {size, children, color, onPress, style} = props;
  const localStyle: any = {
    width: size ?? 40,
    height: size ?? 40,
    backgroundColor: color ?? appColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  };
  return onPress ? (
    <TouchableOpacity onPress={onPress} style={[localStyle, style]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[localStyle, style]}>{children}</View>
  );
};

export default CircleComponent;
