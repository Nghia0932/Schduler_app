import React from 'react';
import {
  ButtonComponent,
  SectionComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Google, Meta} from '../../../assets/svg';

const SocialSignin = () => {
  return (
    <SectionComponent>
      <TextComponent
        styles={{
          textAlign: 'center',
          top: -12,
        }}
        text="OR"
        color={appColors.text}
        size={16}
        fontFamily={fontFamilies.medium}
      />
      <ButtonComponent
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Sign in with Google"
        icon={<Google />}
        textFont={fontFamilies.regular}
        iconFlex="left"
      />
      <ButtonComponent
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Sign in with Facebook"
        icon={<Meta />}
        textFont={fontFamilies.regular}
        iconFlex="left"
      />
    </SectionComponent>
  );
};

export default SocialSignin;
