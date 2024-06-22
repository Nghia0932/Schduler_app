import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyle} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
}

const SectionComponent = (props: Props) => {
  const {children, styles} = props;
  return <View style={[globalStyle.section, styles]}>{children}</View>;
};

export default SectionComponent;
