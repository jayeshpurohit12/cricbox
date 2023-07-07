import React from "react";
import { NavigationProps } from "../../styles/common.interface";
import connectStore from "../../redux/connect";
import HeaderBar from "../../components/HeaderBar";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  SpaceContainer,
  ContainTitle,
  AppScrollView,
  CustomRow,
} from "../../styles/common.style";
import I18nContext from "../../translations/I18nContext";
import { Avatar, RightContainer, Title, Email } from "./style";

interface IProps extends NavigationProps {}

const Settings: React.FC<IProps> = ({ navigation }) => {
  return (
    <React.Fragment>
      <HeaderBar showHelp={true} showBack={false} />
      <AppScrollView>
        <SpaceContainer marginTop={0} marginBottom={3}>
          <CustomRow>
            <Avatar
              resizeMode={"cover"}
              style={styles.avatarStyle}
              source={require("../../../assets/images/avatar.png")}
            />
            <RightContainer>
              <Title>Dadang Sumangkar</Title>
              <Email>dadang@gmail.com</Email>
            </RightContainer>
          </CustomRow>
        </SpaceContainer>
        <SpaceContainer marginBottom={3}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ConfigurationTips")}
          >
            <ContainTitle>{I18nContext.getString("settings")}</ContainTitle>
          </TouchableOpacity>
        </SpaceContainer>
      </AppScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  avatarStyle: {
    width: 90,
    height: 90,
  },
  iconStyle: {
    width: 34,
    height: 34,
  },
});

export default connectStore(Settings);
