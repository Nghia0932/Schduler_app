import {View, Text} from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  color?: string;
  value: number;
  maxValue?: number;
  radius?: number;
}

const CicularComponent = (props: Props) => {
  const {value, color, maxValue, radius} = props;
  return (
    <CircularProgress
      title={`${value}%`}
      titleFontSize={20}
      radius={radius ?? 40}
      titleStyle={{
        fontFamily: fontFamilies.bold,
        color: color ?? appColors.primary,
      }}
      value={value}
      showProgressValue={false}
      activeStrokeColor={color ?? appColors.primary2}
      activeStrokeWidth={12}
      inActiveStrokeWidth={12}
    />
  );
};

export default CicularComponent;
