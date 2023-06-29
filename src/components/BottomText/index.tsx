import React from "react";
import { CustomRow } from "../../styles/common.style";
import styled from "styled-components";
import { FontSize } from "../../styles/sizes";
import I18nContext from "../../translations/I18nContext";
import { RespScreenWidth } from "../../styles/screen.style";

interface IProps {
  firstText: string;
  secondText: string;
  onPress: () => void;
}

const FirstText = styled.Text`
  color: ${(props) =>
    props.color ? props.color : ({ theme }) => theme.regularTextColor};
  font-size: ${(props) => (props.fontSize ? props.fontSize : FontSize.sm)};
  font-family: Poppins-Regular;
  margin-left: auto;
`;

const TouchButton = styled.TouchableOpacity`
  margin-right: auto;
  margin-left: ${RespScreenWidth(1.5)};
`;

const SecondText = styled.Text`
  color: ${(props) =>
    props.color ? props.color : ({ theme }) => theme.greenColor};
  font-size: ${(props) => (props.fontSize ? props.fontSize : FontSize.sm)};
  font-family: Poppins-Regular;
`;

const BottomText: React.FC<IProps> = ({ firstText, secondText, onPress }) => {
  return (
    <CustomRow>
      <FirstText>{I18nContext.getString(firstText)}</FirstText>
      <TouchButton onPress={onPress}>
        <SecondText>{I18nContext.getString(secondText)}</SecondText>
      </TouchButton>
    </CustomRow>
  );
};

export default BottomText;
