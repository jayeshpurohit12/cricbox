import styled from 'styled-components';
import {RespScreenHeight, RespScreenWidth} from '../../../styles/screen.style';

export const Button = styled.TouchableOpacity`
  margin-top: ${RespScreenHeight(6)};
  background-color: ${({theme}) => theme.greenButton};
  padding: ${RespScreenHeight(2)} ${RespScreenWidth(4)};
`;

export const ButtonText = styled.Text`
  color: ${({theme}) => theme.whiteColor};
  margin-left: auto;
  margin-right: auto;
`;

export const ContainBg = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export const Ilustration = styled.Image`
  width: 100%;
  height: ${RespScreenHeight(58)};
`;

export const BottomContainer = styled.View`
  background-color: ${({theme}) => theme.bottomContainer};
  position: absolute;
  width: 100%;
  text-align: center;
  border-top-left-radius: ${RespScreenWidth(8)};
  border-top-right-radius: ${RespScreenWidth(8)};
  bottom: 0px;
  padding: ${RespScreenHeight(5)} ${RespScreenWidth(8)};
`;

export const AlignCenterContain = styled.View`
  margin-left: auto;
  margin-right: auto;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
