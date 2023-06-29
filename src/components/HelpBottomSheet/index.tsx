import React from "react";
import styled from "styled-components";
import { StyleSheet } from "react-native";

import { RespScreenHeight, RespScreenWidth } from "../../styles/screen.style";
import I18nContext from "../../translations/I18nContext";
import { FontSize } from "../../styles/sizes";
import { CustomModal, ModalContainer } from "../../styles/common.style";

const Label = styled.Text`
  color: ${({ theme }) => theme.inputLabelColor};
  font-family: Poppins-SemiBold;
  font-size: ${FontSize.md};
  margin-top: auto;
  margin-bottom: auto;
  margin-left: ${RespScreenWidth(7)};
`;

const Icon = styled.Image`
  margin-left: auto;
  margin-right: auto;
`;

const CloseContainer = styled.TouchableOpacity`
  position: absolute;
  left: ${RespScreenWidth(5)};
  top: ${RespScreenHeight(2)};
`;

const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  border-bottom-width: ${RespScreenWidth(0.2)};
  border-bottom-color: ${({ theme }) => theme.borderColor};
  padding: ${RespScreenHeight(2)} ${RespScreenWidth(0)};
`;

const ListIcon = styled.Image``;

const CloseIcon = styled.Image``;

interface IProps {
  isVisible: boolean;
  onClose: (value: string) => void;
}

const HelpBottomSheet: React.FC<IProps> = ({ isVisible, onClose }) => {
  return (
    <CustomModal isVisible={isVisible}>
      <ModalContainer>
        <ListItem onPress={() => onClose("chat")}>
          <ListIcon
            style={styles.iconStyle}
            source={require("../../../assets/images/chat.png")}
          />
          <Label>{I18nContext.getString("open_chat")}</Label>
        </ListItem>
        <ListItem onPress={() => onClose("send_email")}>
          <ListIcon
            style={styles.iconStyle}
            source={require("../../../assets/images/send_email.png")}
          />
          <Label>{I18nContext.getString("send_email")}</Label>
        </ListItem>
      </ModalContainer>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  closeStyle: {
    width: 32,
    height: 32,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
});

export default HelpBottomSheet;
