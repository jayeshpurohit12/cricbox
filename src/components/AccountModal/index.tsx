import React from "react";
import styled from "styled-components";
import { StyleSheet, TouchableOpacity } from "react-native";
import { RespScreenHeight, RespScreenWidth } from "../../styles/screen.style";
import I18nContext from "../../translations/I18nContext";
import { FontSize } from "../../styles/sizes";
import {
  CustomModal,
  ModalContainer,
  SpaceContainer,
  CustomRow,
  RegularText,
} from "../../styles/common.style";

const Label = styled.Text`
  color: ${({ theme }) => theme.inputLabelColor};
  font-family: Poppins-SemiBold;
  font-size: ${FontSize.md};
  margin-top: auto;
`;

const AccountEmail = styled.Text`
  color: ${({ theme }) => theme.lightGreyColor};
  font-size: ${FontSize.sm};
  font-family: Poppins-Regular;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
`;

const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  border-bottom-width: ${RespScreenWidth(0.2)};
  border-bottom-color: ${({ theme }) => theme.borderColor};
  padding: ${RespScreenHeight(2)} ${RespScreenWidth(0)};
`;

const AccountContainer = styled.View`
  margin-left: ${RespScreenWidth(7)};
`;

const ListIcon = styled.Image`
  margin-top: auto;
`;

const Checked = styled.Image`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
`;

const PlusIcon = styled.Image`
  margin-top: auto;
  margin-bottom: auto;
`;

interface IProps {
  isVisible: boolean;
  onClose: (value: string) => void;
}

const accounts = [
  {
    selected: true,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
];

const AccountModal: React.FC<IProps> = ({ isVisible, onClose }) => {
  return (
    <CustomModal isVisible={isVisible}>
      <ModalContainer>
        {accounts.map((item, index) => {
          return (
            <ListItem key={index} onPress={() => onClose("")}>
              <ListIcon
                style={styles.iconStyle}
                resizeMode={"cover"}
                source={require("../../../assets/images/avatar.png")}
              />
              <AccountContainer>
                <Label>Axton Kalendraa</Label>
                <AccountEmail>Axton23@gmail.com</AccountEmail>
              </AccountContainer>
              {item.selected ? (
                <Checked
                  resizeMode={"cover"}
                  style={styles.selectedIconStyle}
                  source={require("../../../assets/images/check.png")}
                />
              ) : null}
            </ListItem>
          );
        })}
        <SpaceContainer marginTop={4} marginBottom={2}>
          <TouchableOpacity>
            <CustomRow>
              <PlusIcon
                resizeMode={"cover"}
                style={styles.plusStyle}
                source={require("../../../assets/images/plus.png")}
              />
              <RegularText
                marginLeft={RespScreenWidth(4)}
                fontSize="md"
                color="greenColor"
              >
                {I18nContext.getString("add_account")}
              </RegularText>
            </CustomRow>
          </TouchableOpacity>
        </SpaceContainer>
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
    width: 50,
    height: 50,
  },
  selectedIconStyle: {
    width: 38,
    height: 38,
  },
  plusStyle: {
    width: 24,
    height: 24,
  },
});

export default AccountModal;
