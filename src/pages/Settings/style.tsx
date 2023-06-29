import styled from 'styled-components';
import {FontSize} from '../../styles/sizes';
import {RespScreenWidth, RespScreenHeight} from '../../styles/screen.style';

export const Avatar = styled.Image``;

export const Title = styled.Text`
  color: ${({theme}) => theme.blackColor};
  font-size: ${FontSize.md};
  font-family: Poppins-SemiBold;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: ${RespScreenHeight(1.4)};
`;

export const Email = styled.Text`
  color: ${({theme}) => theme.lightGreyColor};
  font-size: ${FontSize.sm};
  font-family: Poppins-Regular;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
`;

export const RightContainer = styled.View`
  margin-left: ${RespScreenWidth(5)};
  margin-top: auto;
`;
