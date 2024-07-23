import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {globalStyle} from '../styles/globalStyles';
import TextComponent from './TextComponent';
import {appColors} from '../constants/appColors';

interface Props {
  text: string;
  color?: string;
  tagStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const TagComponent = (props: Props) => {
  const {text, color, onPress, tagStyles, textStyles} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[
        globalStyle.tag,
        tagStyles,
        {backgroundColor: color ?? appColors.primary},
      ]}>
      <TextComponent text={text} styles={textStyles} />
    </TouchableOpacity>
  );
};

export default TagComponent;
