import React, { useState } from "react";
import {
  CustomRow,
  RegularText,
  ContainTitle,
} from "../../styles/common.style";
import styled from "styled-components";
import { RespScreenHeight, RespScreenWidth } from "../../styles/screen.style";
import I18nContext from "../../translations/I18nContext";
import ToggleSwitch from "toggle-switch-react-native";
import { useTheme } from "styled-components";

const ToggleRight = styled.View`
  margin-left: auto;
  margin-top: ${RespScreenHeight(0.4)};
  margin-bottom: auto;
  ${(props) =>
    props.marginRight && `margin-right:${RespScreenWidth(props.marginRight)}`};
`;

interface IProps {
  title: string;
  onColor?: string;
  isHeaderTitle: boolean;
  marginRight: number;
  textColor?: string;
}

const TipToggles: React.FC<IProps> = ({
  title,
  onColor,
  isHeaderTitle,
  marginRight,
  textColor,
}) => {
  const theme = useTheme();
  const [isOn, setOn] = useState(false);
  return (
    <CustomRow>
      {isHeaderTitle ? (
        <ContainTitle>{I18nContext.getString(title)}</ContainTitle>
      ) : (
        <RegularText fontSize="md" color={textColor}>
          {I18nContext.getString(title)}
        </RegularText>
      )}

      <ToggleRight marginRight={marginRight}>
        <ToggleSwitch
          isOn={isOn}
          onColor={theme[onColor ? onColor : "greenColor"]}
          offColor={theme.toggleOffColor}
          size={"medium"}
          onToggle={(isOn) => setOn(isOn)}
        />
      </ToggleRight>
    </CustomRow>
  );
};

export default TipToggles;
