import styled from 'styled-components';
import {RespScreenHeight, RespScreenWidth} from '../../styles/screen.style';
import {FontSize} from '../../styles/sizes';

export const TipCard = styled.TouchableOpacity`
  padding: ${RespScreenHeight(2)} ${RespScreenWidth(4)};
  border-radius: ${RespScreenHeight(1)};
  width: ${props => (props.width ? props.width : 40)}%;
  margin-bottom: ${RespScreenHeight(2)};
  flex-direction: row;
  text-align: center;
  background-color: ${({theme}) => theme.inputBoxColor};
`;

export const TipBlockRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Percentage = styled.Text`
  color: ${({theme}) => theme.complementaryColor};
  font-size: ${FontSize.xs};
  margin-top: auto;
  margin-left: ${RespScreenWidth(1)};
  margin-bottom: auto;
  margin-right: auto;
`;
