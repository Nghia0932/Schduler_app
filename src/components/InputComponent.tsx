import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TextInputProps,
  KeyboardType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {EyeSlash} from 'iconsax-react-native';

import {appColors} from '../constants/appColors';

import {globalStyle} from '../styles/globalStyles';

interface Props {
  value: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
  placehoder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
  onEnd?: () => void;
  style?: StyleProp<ViewStyle>;
  minHeight?: number;
}

const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    affix,
    placehoder,
    isPassword,
    suffix,
    allowClear,
    type,
    onEnd,
    style,
    minHeight,
  } = props;
  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);
  return (
    <View style={styles.inputContainer}>
      {affix ?? affix}
      <TextInput
        style={[
          styles.input,
          globalStyle.text,
          style,
          {minHeight: minHeight ?? 56},
        ]}
        value={value}
        placeholder={placehoder ?? ''}
        onChangeText={val => onChange(val)}
        secureTextEntry={isShowPass}
        placeholderTextColor={'#747688'}
        keyboardType={type ?? 'default'}
        autoCapitalize="none"
        onEndEditing={onEnd}
      />
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')
        }></TouchableOpacity>
    </View>
  );
};

export default InputComponent;
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray3,
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: appColors.white,
    marginBottom: 19,
  },
  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    paddingHorizontal: 14,
  },
});
