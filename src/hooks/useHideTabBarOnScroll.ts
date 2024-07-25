import {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Animated} from 'react-native';

export const useHideTabBarOnScroll = (animatedValue: Animated.Value) => {
  const navigation = useNavigation();
  const lastOffsetY = useRef(0);

  useEffect(() => {
    const listenerId = animatedValue.addListener(({value}) => {
      if (value > lastOffsetY.current) {
        navigation.setOptions({
          tabBarStyle: {display: 'none'},
        });
      } else {
        navigation.setOptions({
          tabBarStyle: {display: 'flex'},
        });
      }
      lastOffsetY.current = value;
    });

    return () => {
      animatedValue.removeListener(listenerId);
    };
  }, [animatedValue, navigation]);
};
