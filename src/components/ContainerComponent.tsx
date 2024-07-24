import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {forwardRef, ReactNode} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {globalStyle} from '../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import RowComponent from './RowComponent';
import ButtonComponent from './ButtonComponent';
import {ArrowLeft, Back} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import TextComponent from './TextComponent';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?: boolean;
  onScroll?: (e: any) => void;
  onScrollEndDrag?: () => void;
  ref?: React.RefObject<ScrollView>;
}

const ContainerComponent = (props: Props) => {
  const {
    children,
    isImageBackground,
    isScroll,
    title,
    back,
    onScroll,
    onScrollEndDrag,
    ref,
  } = props;

  const navigation: any = useNavigation();
  const headerComponent = () => {
    return (
      <View>
        {(title || back) && (
          <RowComponent
            styles={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              minWidth: 48,
              minHeight: 48,
              justifyContent: 'flex-start',
            }}>
            {back && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{marginRight: 12}}>
                <Back size={24} color={appColors.text} />
              </TouchableOpacity>
            )}
            {title ? (
              <TextComponent
                text={title}
                styles={{fontWeight: 'bold'}}
                size={16}
              />
            ) : (
              <></>
            )}
          </RowComponent>
        )}

        <View>{returnContainer}</View>
      </View>
    );
  };

  const returnContainer = isScroll ? (
    <ScrollView
      ref={ref}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      onScrollEndDrag={onScrollEndDrag}
      scrollEventThrottle={16}>
      {children}
    </ScrollView>
  ) : (
    <View>{children}</View>
  );
  return isImageBackground ? (
    <ImageBackground
      source={require('../assets/images/backg_splashcreen.png')}
      style={{flex: 1}}
      imageStyle={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>{headerComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <View style={globalStyle.container}>
      <View>{headerComponent()}</View>
    </View>
  );
};

export default ContainerComponent;
