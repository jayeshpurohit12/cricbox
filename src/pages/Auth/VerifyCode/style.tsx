import styled from 'styled-components';
import {FontSize} from '../../../styles/sizes';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {RespScreenHeight} from '../../../styles/screen.style';

export const OtpContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const OtpBox = styled.TextInput`
  padding-vertical: 0;
  background-color: ${({theme}) => theme.inputBoxColor};
  font-family: Poppins-Regular;
  font-size: ${FontSize.md};
  text-align: center;
  width: ${RespScreenHeight(8)};
  height: ${RespScreenHeight(8)};
  border-radius: ${RespScreenHeight(8)};
`;

export const CirculerTimer = styled.View`
  margin-left: auto;
  margin-right: auto;
`;
