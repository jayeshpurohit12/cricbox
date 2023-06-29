import React from "react";
import { BlueButton, ButtonText } from "../../styles/common.style";
import I18nContext from "../../translations/I18nContext";

interface IProps {
  text: string;
  width?: number;
  onPress: () => void;
}

const CustomBlueButton: React.FC<IProps> = ({ text, width, onPress }) => {
  return (
    <BlueButton onPress={onPress} width={width}>
      <ButtonText>{I18nContext.getString(text)}</ButtonText>
    </BlueButton>
  );
};

export default CustomBlueButton;
