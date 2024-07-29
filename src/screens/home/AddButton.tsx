import React, {useState} from 'react';

import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import {appColors} from '../../constants/appColors';
import {globalStyle} from '../../styles/globalStyles';
import {
  AddSquare,
  CalendarEdit,
  DocumentText,
  ReceiptText,
  Task,
  TickCircle,
} from 'iconsax-react-native';
import {TextComponent} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';

const AddButton = () => {
  const animation = React.useRef(new Animated.Value(0)).current;
  const [opened, setOpened] = useState(false);
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 300,
      //friction: 2,
      useNativeDriver: false,
    }).start();
  }, [opened, animation]);

  const opacity = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              {backgroundColor: '#9ace84'},
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -80],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -30],
                    }),
                  },
                ],
              },
            ]}>
            <CalendarEdit size={20} color="green" />
            <TextComponent
              text="Event"
              styles={{
                color: appColors.text,
                fontSize: 10,
                fontFamily: fontFamilies.medium,
              }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              {backgroundColor: '#e6b988'},
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -40],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -90],
                    }),
                  },
                ],
              },
            ]}>
            <TickCircle size={20} color="red" />
            <TextComponent
              text="To do"
              styles={{
                color: appColors.text,
                fontSize: 10,
                fontFamily: fontFamilies.medium,
              }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              {backgroundColor: '#dded9b'},
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 40],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -90],
                    }),
                  },
                ],
              },
            ]}>
            <DocumentText size={20} color="#6FDCE3" />
            <TextComponent
              text="Memo"
              styles={{
                color: appColors.text,
                fontSize: 10,
                fontFamily: fontFamilies.medium,
              }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              {backgroundColor: '#a885dd'},
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 80],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -30],
                    }),
                  },
                ],
              },
            ]}>
            <ReceiptText size={20} color="pink" />
            <TextComponent
              text="Dairy"
              styles={{
                color: appColors.text,
                fontSize: 10,
                fontFamily: fontFamilies.medium,
              }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setOpened(!opened);
          }}
          style={styles.addButton}>
          <Animated.View
            style={[
              styles.addButtonInner,
              {
                transform: [
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '45deg'],
                    }),
                  },
                ],
              },
            ]}>
            <AddSquare size={20} color={appColors.white} variant="Bold" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: 0,
  },
  box: {
    position: 'relative',
    width: 60,
    height: 60,
    marginTop: -30,
  },
  addButton: {
    shadowColor: appColors.text,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  addButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.primary,
    width: 50,
    height: 50,
    borderRadius: 30,
    marginTop: 10,
  },
  addButtonIcon: {
    width: 40,
    height: 40,
    tintColor: appColors.white,
  },
  item: {
    position: 'absolute',
    top: 5,
    left: 5,
    alignItems: 'center',
    justifyContent: 'center',

    width: 50,
    height: 50,
    borderRadius: 25,
  },

  itemIcon: {
    width: 32,
    height: 32,
    tintColor: appColors.white,
  },
});

export default AddButton;
