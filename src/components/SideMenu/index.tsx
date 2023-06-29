import React, { useState } from "react";
import styled from "styled-components";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SpaceContainer } from "../../styles/common.style";
import { useNavigation } from "@react-navigation/native";
import { FontSize } from "../../styles/sizes";
import { RespScreenHeight, RespScreenWidth } from "../../styles/screen.style";
import I18nContext from "../../translations/I18nContext";
import { sideMenus } from "../../constants";
import AccountModal from "../../components/AccountModal";
import auth from "@react-native-firebase/auth";
import connectStore from "redux/connect";
const Title = styled.Text`
  color: ${({ theme }) => theme.blackColor};
  font-size: ${FontSize.md};
  font-family: Poppins-SemiBold;
  margin-left: auto;
  margin-right: auto;
`;

const Avatar = styled.Image`
  margin-left: auto;
  margin-right: auto;
`;

const Email = styled.Text`
  color: ${({ theme }) => theme.lightGreyColor};
  font-size: ${FontSize.sm};
  font-family: Poppins-Regular;
  margin-left: auto;
  margin-right: auto;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.blackColor};
  font-size: ${FontSize.sm};
  font-family: Poppins-Regular;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: ${RespScreenWidth(5)};
`;

const Icon = styled.Image``;

const ListContainer = styled.TouchableOpacity`
  padding: ${RespScreenHeight(1)} ${RespScreenWidth(6)};
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: ${RespScreenHeight(2)};
  max-width: ${RespScreenWidth(40)};
  margin-left: auto;
  margin-right: auto;
  padding: ${RespScreenHeight(0.8)} ${RespScreenWidth(4)};
`;

const ButtonText = styled.Text`
  color: ${({ theme }) => theme.blackColor};
  font-size: ${FontSize.sm};
  font-family: Poppins-Regular;
`;

interface IProps {
  userData: any;
}

const SideMenu: React.FC<IProps> = ({ userData }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const selectOption = (item) => {
    // navigation.closeDrawer();
    if (item && item.route) {
      if (item.subRoute) {
        navigation.navigate(item.route, { screen: item.subRoute });
      } else {
        navigation.navigate(item.route);
      }
    } else {
      auth()
        .signOut()
        .then(() => {
          // navigation.closeDrawer();
          setTimeout(() => {
            navigation.navigate("SignIn");
          }, 700);
        });
      //
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <SpaceContainer marginTop={3} marginBottom={3}>
          <Avatar
            resizeMode={"cover"}
            style={styles.avatarStyle}
            source={require("../../../assets/images/avatar.png")}
          />
        </SpaceContainer>
        <SpaceContainer marginBottom={1.4}>
          <Title>{userData.fullName}</Title>
        </SpaceContainer>
        <SpaceContainer marginBottom={2.6}>
          <Email>{userData.email}</Email>
        </SpaceContainer>
        {/* <SpaceContainer marginBottom={2.8}>
          <Button onPress={() => setModalVisible(true)}>
            <ButtonText>{I18nContext.getString("switch_account")}</ButtonText>
          </Button>
        </SpaceContainer> */}

        {/* <DrawerContentScrollView {...props}> */}
        {sideMenus.map((item, index) => {
          if (item.type.includes(userData.role)) {
            return (
              <ListContainer onPress={() => selectOption(item)} key={index}>
                <Icon
                  resizeMode={"cover"}
                  style={styles.iconStyle}
                  source={item.image}
                />
                <Label>{I18nContext.getString(item.name)}</Label>
              </ListContainer>
            );
          } else {
            return null;
          }
        })}
        {/* </DrawerContentScrollView> */}
      </ScrollView>
      <AccountModal
        isVisible={isModalVisible}
        onClose={(value) => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatarStyle: {
    width: 120,
    height: 120,
  },
  iconStyle: {
    width: 34,
    height: 34,
  },
});

export default connectStore(SideMenu);
