import React from "react";
import { GreenButton, ButtonText } from "../../styles/common.style";
import I18nContext from "../../translations/I18nContext";
import styled from "styled-components";

interface IProps {
  text: string;
  width?: number;
  showLoader: boolean;
  onPress: () => void;
}

const Loader = styled.ActivityIndicator`
  color: ${({ theme }) => theme.whiteColor};
  margin-left: auto;
  margin-right: auto;
`;

const CustomGreenButton: React.FC<IProps> = ({
  text,
  width,
  onPress,
  showLoader,
}) => {
  return (
    <GreenButton disabled={showLoader} onPress={onPress} width={width}>
      {showLoader ? (
        <Loader size="small" color="#FFFFFF" />
      ) : (
        <ButtonText>{I18nContext.getString(text)}</ButtonText>
      )}
    </GreenButton>
  );
};

export default CustomGreenButton;
