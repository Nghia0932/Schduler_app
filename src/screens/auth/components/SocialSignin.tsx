import {View, Text} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  SectionComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {appInfo} from '../../../constants/appInfors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Google} from 'iconsax-react-native';

const SocialSignin = () => {
  return (
    <SectionComponent>
      <TextComponent
        styles={{
          textAlign: 'center',
          top: -12,
        }}
        text="OR"
        color={appColors.gray3}
        size={16}
        fontFamily={fontFamilies.semiBold}
      />
      <ButtonComponent
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Sign in with Google"
        icon={<Google size={24} color={appColors.primary} />}
        iconFlex="left"
      />
    </SectionComponent>
  );
};

export default SocialSignin;
