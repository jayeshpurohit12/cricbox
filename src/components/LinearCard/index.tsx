import React from "react";
import {
  EnterAmount,
  SpaceContainer,
  AmountText,
} from "../../styles/common.style";
import I18nContext from "../../translations/I18nContext";
import styled from "styled-components";
import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";
import LinearGradient from "react-native-linear-gradient";
import { RespScreenHeight, RespScreenWidth } from "../../styles/screen.style";

const Card = styled(LinearGradient)`
  padding: ${RespScreenHeight(2)} ${RespScreenWidth(5)};
  border-radius: ${RespScreenHeight(1.2)};
`;

const Icon = styled.Image`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${RespScreenHeight(0.4)};
`;

interface IProps {
  amount: string;
  image?: string;
  shortText?: string;
}

const LinearCard: React.FC<IProps> = ({ amount, image, shortText }) => {
  const theme = useTheme();
  return (
    <Card
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[theme.lightBlueColor, theme.lightGreenColor]}
    >
      {image ? (
        <Icon resizeMode={"cover"} style={styles.iconStyle} source={image} />
      ) : null}
      <AmountText>{amount}</AmountText>
      <SpaceContainer marginTop={1}>
        <EnterAmount>
          {I18nContext.getString(shortText ? shortText : "enter_amount")}
        </EnterAmount>
      </SpaceContainer>
    </Card>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 42,
    height: 42,
  },
});

export default LinearCard;
