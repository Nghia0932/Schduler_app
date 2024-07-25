import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextComponent} from '../../components';
import {appColors} from '../../constants/appColors';
import {useDispatch} from 'react-redux';
import {setIsCloseBottomTab} from '../../redux/reducers/bottomTabReducer';
const CalendarsScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const tabBarHeight = useBottomTabBarHeight();

  const [scrollDirection, setScrollDirection] = useState<
    'up' | 'down' | 'none'
  >('none');
  const lastOffsetY = useRef(0);

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: new Animated.Value(0)}}}],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const currentOffsetY = event.nativeEvent.contentOffset.y;
        if (currentOffsetY > lastOffsetY.current) {
          setScrollDirection('down');
        } else if (currentOffsetY < lastOffsetY.current) {
          setScrollDirection('up');
        }
        lastOffsetY.current = currentOffsetY;
      },
    },
  );

  useEffect(() => {
    console.log('scrollDirection:', scrollDirection);

    dispatch(setIsCloseBottomTab(scrollDirection === 'down'));
  }, [scrollDirection, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
          <TextComponent
            text="Hello HAHAH"
            styles={{
              height: 100,
              backgroundColor: appColors.green,
              padding: 5,
              margin: 10,
              flex: 1,
            }}
          />
          <TextComponent
            text="Hello HAHAH"
            styles={{
              height: 100,
              backgroundColor: appColors.green,
              padding: 5,
              margin: 10,
            }}
          />
          <TextComponent
            text="Hello HAHAH"
            styles={{
              height: 100,
              backgroundColor: appColors.green,
              padding: 5,
              margin: 10,
            }}
          />
          <TextComponent
            text="Hello HAHAH"
            styles={{
              height: 100,
              backgroundColor: appColors.green,
              padding: 5,
              margin: 10,
            }}
          />
          <TextComponent
            text="Hello HAHAH"
            styles={{
              height: 100,
              backgroundColor: appColors.green,
              padding: 5,
              margin: 10,
            }}
          />
          <TextComponent
            text="Hello HAHAH"
            styles={{
              height: 100,
              backgroundColor: appColors.green,
              padding: 5,
              margin: 10,
            }}
          />
          <TextComponent
            text="Hello HAHAH"
            styles={{
              height: 100,
              backgroundColor: appColors.green,
              padding: 5,
              margin: 10,
            }}
          />
          <TextComponent
            text="Hello HAHAH"
            styles={{
              height: 100,
              backgroundColor: appColors.green,
              padding: 5,
              margin: 10,
            }}
          />
          <TextComponent
            text="Hello HAHAH"
            styles={{
              height: 100,
              backgroundColor: appColors.green,
              padding: 5,
              margin: 10,
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default CalendarsScreen;
