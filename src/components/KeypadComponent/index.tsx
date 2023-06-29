import React from "react";
import { StyleSheet } from "react-native";
import { FontSize } from "../../styles/sizes";
import styled from "styled-components";
import { RespScreenHeight } from "../../styles/screen.style";

interface IProps {
  digit: string;
  onKeyPress: (value) => void;
}

const KeyPad = styled.TouchableOpacity`
  width: 33.3%;
  height: ${RespScreenHeight(10)};
`;

const Number = styled.Text`
  font-size: ${FontSize.xxl};
  color: ${({ theme }) => theme.inputLabelColor};
  font-family: Poppins-Regular;
  margin: auto;
`;

const ClearIcon = styled.Image`
  margin: auto;
`;

const KeypadComponent: React.FC<IProps> = ({ digit, onKeyPress }) => {
  return (
    <KeyPad onPress={() => onKeyPress(digit)}>
      {digit === "X" ? (
        <ClearIcon
          resizeMode={"cover"}
          style={styles.iconStyle}
          source={require("../../../assets/images/clear-icon.png")}
        />
      ) : (
        <Number>{digit}</Number>
      )}
    </KeyPad>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 35,
    height: 25,
  },
});

export default KeypadComponent;
