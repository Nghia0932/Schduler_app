import {View, Text, DimensionValue} from 'react-native';
import React from 'react';
import {appColors} from '../constants/appColors';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  size?: 'small' | 'default' | 'large';
  color?: string;
  percent: DimensionValue;
}

const ProgressBarComponent = (props: Props) => {
  const {percent, color, size} = props;
  const heightContent = size === 'small' ? 6 : size === 'large' ? 10 : 8;
  return (
    <View style={{marginBottom: 16, marginTop: 12}}>
      <View
        style={{
          height: heightContent,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: 100,
        }}>
        <View
          style={{
            backgroundColor: color ?? appColors.primary,
            width: percent,
            height: heightContent,
            borderRadius: 100,
          }}
        />
      </View>
      <RowComponent styles={{justifyContent: 'space-between', marginTop: 4}}>
        <TextComponent
          text="Progress"
          size={12}
          styles={{fontFamily: fontFamilies.semiBold}}
        />
        <TextComponent
          text={`${percent}`}
          size={12}
          flex={0}
          styles={{fontFamily: fontFamilies.bold}}
        />
      </RowComponent>
    </View>
  );
};

export default ProgressBarComponent;
