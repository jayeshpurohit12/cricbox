import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import styled from "styled-components";
import { RespScreenHeight, RespScreenWidth } from "../../styles/screen.style";
import { useNavigation } from "@react-navigation/native";
import HelpBottomSheet from "../../components/HelpBottomSheet";

const HeaderContainer = styled.View`
  flex-direction: row;
  padding: ${RespScreenHeight(0)} ${RespScreenWidth(3)};
`;

const HeaderLogo = styled.Image`
  margin: auto;
`;

const Container = styled.TouchableOpacity``;

const RightContainer = styled.TouchableOpacity``;

const Icon = styled.Image`
  margin-top: auto;
  margin-bottom: auto;
`;

interface IProps {
  showBack: boolean;
  showMenu?: boolean;
  dummyLeft?: boolean;
  dummyRight?: boolean;
  showHelp?: boolean;
}

const HeaderBar: React.FC<IProps> = ({
  showBack,
  showMenu,
  showHelp,
  dummyLeft,
  dummyRight,
}) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <HeaderContainer>
        {showBack ? (
          <Container onPress={() => navigation.goBack()}>
            <Icon
              resizeMode={"cover"}
              style={styles.iconStyle}
              source={require("../../../assets/images/back.png")}
            />
          </Container>
        ) : null}
        {dummyLeft ? <View style={styles.iconStyle}></View> : null}
        {showMenu ? (
          <Container onPress={() => navigation.openDrawer()}>
            <Icon
              resizeMode={"cover"}
              style={styles.iconStyle}
              source={require("../../../assets/images/menu.png")}
            />
          </Container>
        ) : null}
        <HeaderLogo
          style={styles.logoStyle}
          resizeMode={"contain"}
          source={require("../../../assets/images/icon.png")}
        />
        {dummyRight ? <View style={styles.iconStyle}></View> : null}
        {showHelp ? (
          <RightContainer onPress={() => setModalVisible(true)}>
            <Icon
              resizeMode={"cover"}
              style={styles.iconStyle}
              source={require("../../../assets/images/help.png")}
            />
          </RightContainer>
        ) : null}
      </HeaderContainer>
      <HelpBottomSheet
        isVisible={isModalVisible}
        onClose={(value) => {
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 34,
    height: 35,
  },
  safeAreaStyle: {},
  logoStyle: {
    width: 56,
    height: 56,
  },
});

export default HeaderBar;
