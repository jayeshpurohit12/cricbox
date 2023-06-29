import styled from 'styled-components';
import {FontSize} from '../../styles/sizes';
import {RespScreenHeight} from '../../styles/screen.style';

export const QrCodeContainer = styled.View`
  margin-left: auto;
  margin-right: auto;
`;

export const WatingText = styled.Text`
  color: ${({theme}) => theme.extraLightGreyColor};
  font-size: ${FontSize.sm};
  font-family: Poppins-Regular;
  margin-left: auto;
  margin-right: auto;
  margin-top: ${RespScreenHeight(8)};
  margin-bottom: ${RespScreenHeight(4)};
`;
