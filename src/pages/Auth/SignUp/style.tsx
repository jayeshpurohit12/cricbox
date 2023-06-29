import styled from "styled-components";
import { FontSize } from "styles/sizes";
export const BoxLabel = styled.Text`
  color: ${({ theme }) => theme.inputLabelColor};
  font-size: ${FontSize.sm};
  font-family: Poppins-Regular;
`;
