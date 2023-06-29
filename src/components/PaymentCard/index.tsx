import React from "react";
import styled from "styled-components";
import { StyleSheet } from "react-native";
import { RespScreenWidth, RespScreenHeight } from "../../styles/screen.style";
import { FontSize } from "../../styles/sizes";
import I18nContext from "../../translations/I18nContext";
import { CryptoMethods } from "../../styles/common.interface";

interface IProps {
  item: CryptoMethods;
  onPress: (value) => void;
}

const Card = styled.TouchableOpacity`
  flex-direction: row;
  padding: ${RespScreenHeight(2)} ${RespScreenWidth(5)};
  border-radius: ${RespScreenHeight(1)};
  margin-bottom: ${RespScreenHeight(2)};
  background-color: ${({ theme }) => theme.inputBoxColor};
`;

const Icon = styled.Image``;

const Name = styled.Text`
  color: ${({ theme }) => theme.inputLabelColor};
  font-family: Poppins-Regular;
  font-size: ${FontSize.md};
  margin-top: auto;
  margin-left: ${RespScreenWidth(3)};
  margin-bottom: auto;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.lightGreyColor};
  font-family: Poppins-Regular;
  font-size: ${FontSize.md};
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
`;

const PaymentCard: React.FC<IProps> = ({ item, onPress }) => {
  return (
    <Card onPress={() => onPress(item)}>
      <Icon resizeMode={"cover"} style={styles.iconStyle} source={item.image} />
      <Name>{I18nContext.getString(item.name)}</Name>
      <Label>{I18nContext.getString(item.label)}</Label>
    </Card>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 50,
    height: 50,
  },
});

export default PaymentCard;
