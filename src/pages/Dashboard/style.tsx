import styled from "styled-components";
import { RespScreenHeight, RespScreenWidth } from "../../styles/screen.style";
import LinearGradient from "react-native-linear-gradient";

export const Card = styled(LinearGradient)`
  height: ${RespScreenHeight(22)};
  padding: ${RespScreenHeight(2)} ${RespScreenWidth(5)};
  border-radius: ${RespScreenHeight(1.2)};
`;

export const CardBody = styled.View`
  margin: auto;
`;

export const KeyPadRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const HeadLine = styled.View`
  margin-top: ${RespScreenHeight(3)};
`;
