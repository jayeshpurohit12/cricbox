import React from "react";
import { ButtonText, SocialButtonContainer } from "../../styles/common.style";
import I18nContext from "../../translations/I18nContext";
import styled from "styled-components";
import { RespScreenWidth, RespScreenHeight } from "../../styles/screen.style";

const SocialIcon = styled.Image`
  width: ${RespScreenWidth(8)};
  height: ${RespScreenHeight(3.5)};
`;

interface IProps {
  text: string;
  width?: number;
  source: string;
  onPress: () => void;
}

const SocialButton: React.FC<IProps> = ({ text, width, onPress, source }) => {
  return (
    <SocialButtonContainer onPress={onPress} width={width}>
      <SocialIcon source={source} />
      <ButtonText color={"blackColor"}>
        {I18nContext.getString(text)}
      </ButtonText>
    </SocialButtonContainer>
  );
};

export default SocialButton;
