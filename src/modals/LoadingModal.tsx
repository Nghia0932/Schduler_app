import {View, Text, Modal, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextComponent} from '../components';
import {appColors} from '../constants/appColors';

interface Props {
  visibale: boolean;
  mess?: string;
  time?: number;
}

const LoadingModal = (props: Props) => {
  const {visibale, mess, time} = props;
  const [percentage, setPercentage] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visibale && !intervalId) {
      const id = setInterval(
        () => {
          setPercentage(prevPercentage => {
            const nextPercentage = prevPercentage + 1;
            return nextPercentage > 100 ? 0 : nextPercentage;
          });
        },
        time ? time : 1000,
      ); // Thay đổi giá trị này để điều chỉnh tốc độ tăng
      setIntervalId(id);
    } else if (!visibale && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [visibale, intervalId]);

  return (
    <Modal visible={visibale} transparent statusBarTranslucent>
      <View style={styles.modalContainer}>
        <ActivityIndicator color={appColors.white} size={100} />
        <TextComponent
          text={`Loading... ${percentage}%`}
          flex={0}
          color={appColors.white}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: '80%',
    borderRadius: 50,
  },
});

export default LoadingModal;
