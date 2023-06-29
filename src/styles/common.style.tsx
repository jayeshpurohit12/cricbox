import styled from "styled-components";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  VirtualizedList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "./colors";
import Modal from "react-native-modal";
import { FontSize } from "./sizes";
import { RespScreenHeight, RespScreenWidth } from "./screen.style";
import LinearGradient from "react-native-linear-gradient";

export const AuthContainer = styled.View`
  height: 100%;
`;

export const AuthBackground = styled.Image`
  width: 100%;
`;

export const SplashBackGround = styled.Image`
  width: 100%;
  height: 100%;
`;

export const CustomRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  ${(props) => props.justifySpace && `justify-content: space-between`};
`;

export const Column = styled.View`
  flex: ${(props) => (props.flex !== undefined ? props.flex : 0.6)};
`;

export const TitleContainer = styled.View`
  margin-left: auto;
  margin-right: auto;
`;

export const FieldContainer = styled.View`
  margin-top: ${RespScreenHeight(5)};
  margin-bottom: ${RespScreenHeight(2)};
`;
export const Container = styled.View`
  margin-top: ${(props) =>
    props.marginTop !== undefined
      ? RespScreenHeight(props.marginTop)
      : RespScreenHeight(2)};
  margin-bottom: ${(props) =>
    props.marginBottom !== undefined
      ? RespScreenHeight(props.marginBottom)
      : RespScreenHeight(2)};
`;

export const Gradient = styled(LinearGradient)`
  height: 100%;
`;
export const HalfGradient = styled(LinearGradient)`
  height: ${RespScreenHeight(30)};
`;

export const AppContainer = (props) => {
  return (
    <Gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[Colors.gradient1, Colors.gradient2]}
    >
      {props.children}
    </Gradient>
  );
};

export const HalfContainer = (props) => {
  return (
    <HalfGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[Colors.gradient1, Colors.gradient2]}
    >
      <SafeAreaView>{props.children}</SafeAreaView>
    </HalfGradient>
  );
};

export const ErrorMessage = styled.Text`
  color: red;
  text-align: left;
  margin-top: 5px;
`;

export const CardStyle = StyleSheet.create({
  Card: {
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
});

export const SpaceContainer = styled.View`
  margin-top: ${(props) =>
    props.marginTop ? RespScreenHeight(props.marginTop) : RespScreenHeight(0)};
  margin-bottom: ${(props) =>
    props.marginBottom
      ? RespScreenHeight(props.marginBottom)
      : RespScreenHeight(0)};
`;

export const CustomVirtualizedList = styled(VirtualizedList)`
  margin-bottom: ${RespScreenHeight(10)};
`;

export const CustomFlatList = styled.FlatList`
  margin-bottom: ${RespScreenHeight(10)};
`;

export const CustomActivityLoader = styled(ActivityIndicator)`
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
`;

export const CenterWarning = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-horizontal: ${RespScreenWidth(3)};
  margin-top: ${RespScreenHeight(15)};
  margin-bottom: ${RespScreenHeight(15)};
`;

export const WarningText = styled.Text`
  font-size: ${FontSize.lg};
  color: ${Colors.black};
  text-align: center;
`;

export const BgStyle = StyleSheet.create({
  fullImage: {
    width: "100%",
    height: "100%",
  },
});

export const BackgroundImage = styled.ImageBackground`
  width: ${RespScreenWidth(100)};
`;

export const RowWithOutFlex = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CenterText = styled.Text`
  color: ${Colors.primaryColor};
  text-align: center;
  font-size: 18px;
`;

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 2,
    backgroundColor: `${Colors.boxBackgroundColor}`,
    color: "black",
    width: `100%`,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 2,
    backgroundColor: `${Colors.boxBackgroundColor}`,
    color: "black",
    width: `100%`,
  },
});

export const LogoImage = styled.Image`
  width: ${RespScreenWidth(40)};
  height: ${RespScreenHeight(6)};
`;

export const RegularText = styled.Text`
  color: ${({ theme }) =>
    (props) =>
      props.color ? theme[props.color] : theme.regularTextColor};
  font-size: ${(props) =>
    props.fontSize ? FontSize[props.fontSize] : FontSize.sm};
  font-family: Poppins-Regular;
  letter-spacing: ${RespScreenWidth(0.2)};
  line-height: ${RespScreenHeight(2.8)};
  ${(props) => props.textAlign && `text-align : ${props.textAlign}`};
  ${(props) => props.marginLeft && `margin-left : ${props.marginLeft}`};
  ${(props) => props.marginRight && `margin-right : ${props.marginRight}`};
  ${(props) => props.marginTop && `margin-top : ${props.marginTop}`};
  ${(props) => props.marginBottom && `margin-bottom : ${props.marginBottom}`};
`;

export const BlueButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.blueColor};
  width: ${(props) => (props.width ? props.width : 100)}%;
  border-radius: ${RespScreenHeight(1.2)};
  text-align: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.blueColor};
  padding: ${RespScreenHeight(2)} ${RespScreenWidth(6)};
`;

export const GreenButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.greenColor};
  border-radius: ${RespScreenHeight(1.2)};
  border-width: 1px;
  border-color: ${({ theme }) => theme.greenColor};
  width: ${(props) => (props.width ? props.width : 100)}%;
  text-align: center;
  padding: ${RespScreenHeight(2)} ${RespScreenWidth(6)};
`;

export const SocialButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.whiteColor};
  border-radius: ${RespScreenHeight(1.2)};
  border-width: 1px;
  border-color: ${({ theme }) => theme.greyBorder};
  width: ${(props) => (props.width ? props.width : 100)}%;
  text-align: center;
  flex-direction: row;
  padding: ${RespScreenHeight(2)} ${RespScreenWidth(6)};
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) =>
    (props) =>
      props.color ? theme[props.color] : theme.whiteColor};
  font-size: ${FontSize.md};
  font-family: Poppins-Medium;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
`;

export const AppScrollView = styled.ScrollView`
  padding: ${RespScreenHeight(4)} ${RespScreenWidth(6)};
`;

export const AppFlatList = styled.FlatList`
  padding: ${RespScreenHeight(4)} ${RespScreenWidth(6)};
`;

export const AuthTitle = styled.Text`
  color: ${({ theme }) => theme.blackColor};
  font-size: ${FontSize.xxl};
  font-family: Poppins-Medium;
  margin-left: auto;
  margin-right: auto;
`;

export const SubtitleContainer = styled.View`
  width: ${RespScreenWidth(64)};
  margin-left: auto;
  margin-right: auto;
`;

export const AmountText = styled.Text`
  color: ${({ theme }) => theme.whiteColor};
  font-size: ${FontSize.xxxl};
  font-family: Poppins-Medium;
  margin-left: auto;
  margin-right: auto;
`;

export const EnterAmount = styled.Text`
  color: ${({ theme }) => theme.whiteColor};
  font-size: ${FontSize.sm};
  font-family: Poppins-Regular;
  margin-left: auto;
  margin-right: auto;
`;

export const ContainTitle = styled.Text`
  color: ${({ theme }) => theme.blackColor};
  font-size: ${FontSize.lg};
  letter-spacing: ${RespScreenWidth(0.3)};
  font-family: Poppins-Medium;
`;

export const GreyCard = styled.TouchableOpacity`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${RespScreenHeight(2)} ${RespScreenWidth(2)};
  border-radius: ${RespScreenHeight(1)};
  margin-bottom: ${RespScreenHeight(2)};
  background-color: ${({ theme }) => theme.inputBoxColor};
`;

export const GreyView = styled.View`
  padding: ${RespScreenHeight(2)} ${RespScreenWidth(5)};
  border-radius: ${RespScreenHeight(1)};
  margin-bottom: ${RespScreenHeight(2)};
  background-color: ${({ theme }) => theme.inputBoxColor};
  ${(props) => props.width && `width:${props.width}%`};
`;

export const CardBlackText = styled.Text`
  color: ${({ theme }) => theme.inputLabelColor};
  font-family: Poppins-Regular;
  font-size: ${(props) =>
    props.fontSize !== undefined ? props.fontSize : FontSize.md};
  margin-top: auto;
  margin-left: ${(props) =>
    props.marginLeft !== undefined
      ? RespScreenWidth(props.marginLeft)
      : RespScreenWidth(3)};
  margin-bottom: auto;
`;

export const EmptyText = styled.Text`
  color: ${({ theme }) => theme.inputLabelColor};
  font-family: Poppins-Regular;
  font-size: ${(props) =>
    props.fontSize !== undefined ? props.fontSize : FontSize.md};
  margin-left: ${(props) =>
    props.marginLeft !== undefined
      ? RespScreenWidth(props.marginLeft)
      : RespScreenWidth(3)};
`;

export const CardGreyText = styled.Text`
  color: ${({ theme }) => theme.lightGreyColor};
  font-family: Poppins-Regular;
  font-size: ${FontSize.xs};
  margin-left: ${(props) =>
    props.marginLeft !== undefined
      ? RespScreenWidth(props.marginLeft)
      : RespScreenWidth(3)};
  margin-top: ${RespScreenHeight(0.4)};
  letter-spacing: 0.3px;
  line-height: 22px;
`;

export const TextContainer = styled.View``;

export const DownArrow = styled.Image`
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
`;

export const CustomModal = styled(Modal)`
  margin: 0px;
`;

export const ModalContainer = styled.View`
  background-color: ${({ theme }) => theme.bodyBackground};
  position: absolute;
  bottom: 0px;
  width: 100%;
  border-radius: ${RespScreenHeight(3)};
  padding: ${RespScreenHeight(3)} ${RespScreenWidth(8)};
`;
