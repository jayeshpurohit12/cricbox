import React from "react";
import styled from "styled-components";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { RespScreenHeight, RespScreenWidth } from "../../styles/screen.style";
import { SpaceContainer } from "../../styles/common.style";
import I18nContext from "../../translations/I18nContext";
import { FontSize } from "../../styles/sizes";

const CustomModal = styled(Modal)`
  margin: 0px;
`;

const Container = styled.View`
  background-color: ${({ theme }) => theme.bodyBackground};
  position: absolute;
  bottom: 0px;
  width: 100%;
  border-radius: ${RespScreenHeight(3)};
  padding: ${RespScreenHeight(6)} ${RespScreenWidth(5)};
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

const Title = styled.Text`
  color: ${({ theme }) => theme.blackColor};
  font-family: Poppins-SemiBold;
  font-size: ${FontSize.lg};
  margin: auto;
`;

const SubTitle = styled.Text`
  color: ${({ theme }) => theme.lightGreyColor};
  font-family: Poppins-Regular;
  font-size: ${FontSize.xs};
  margin: auto;
  width: 85%;
  text-align: center;
`;

const CloseIcon = styled.Image``;

interface IProps {
  isVisible: boolean;
  type: string;
  onClose: (value: boolean) => void;
}

const CustomAlert: React.FC<IProps> = ({ isVisible, type, onClose }) => {
  const getIcons = () => {
    if (type === "success") {
      return require("../../../assets/images/success.png");
    } else if (type === "errors") {
      return require("../../../assets/images/errors.png");
    } else if (type === "information") {
      return require("../../../assets/images/information.png");
    }
  };

  return (
    <CustomModal isVisible={isVisible}>
      <Container>
        <CloseContainer onPress={() => onClose(false)}>
          <CloseIcon
            resizeMode={"cover"}
            style={styles.closeStyle}
            source={require("../../../assets/images/cancel.png")}
          />
        </CloseContainer>
        <Icon
          resizeMode={"cover"}
          style={styles.iconStyle}
          source={getIcons()}
        ></Icon>
        <SpaceContainer marginTop={3} marginBottom={3}>
          <Title>{I18nContext.getString(type)}</Title>
        </SpaceContainer>
        <SpaceContainer marginBottom={3}>
          <SubTitle>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </SubTitle>
        </SpaceContainer>
      </Container>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 140,
    height: 140,
  },
  closeStyle: {
    width: 32,
    height: 32,
  },
});

export default CustomAlert;
