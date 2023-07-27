import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import connectStore from "../../../redux/connect";
import {
  AppScrollView,
  SpaceContainer,
  AuthTitle,
  RegularText,
  SubtitleContainer,
} from "../../../styles/common.style";
import { useTheme } from "styled-components";
import { NavigationProps } from "../../../styles/common.interface";
import HeaderBar from "../../../components/HeaderBar";
import I18nContext from "../../../translations/I18nContext";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import CustomGreenButton from "../../../components/CustomGreenButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { OtpContainer, OtpBox, CirculerTimer } from "./style";
import BottomText from "../../../components/BottomText";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

interface IProps extends NavigationProps {}

const VerifyCode: React.FC<IProps> = ({ navigation }) => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [showLoader, setLoader] = useState(false);

  const refs = useRef([]);

  const theme = useTheme();
  const route = useRoute();

  const {
    confirmation,
    userData,
    values,
    pushTokenData,
    toggleCheckBox,
    phone,
  } = route.params;
  const formatTime = (remainingTime) => {
    let minutes = Math.floor(remainingTime / 60).toString();
    let seconds = (remainingTime % 60).toString();
    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }

    if (seconds.length === 1) {
      seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
  };
  async function confirmCode() {
    setLoader(true);
    const code = otp.join("");
    console.log(code);
    try {
      await confirmation.confirm(code);
      console.log("successfully...");

      firestore()
        .collection("Users")
        .doc(userData.user.uid)
        .set({
          ...pushTokenData,
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          role: toggleCheckBox ? "box-admin" : "normal",
          userId: userData.user.uid,
          dateISO: moment().toISOString(),
          milliseconds: moment().valueOf(),
        });
      navigation.navigate("SignIn");
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log("Invalid code.");
    }
  }

  const handleOTPEnter = (index, input) => {
    setOTP((prevOTP) => {
      const newOTP = [...prevOTP];
      newOTP[index] = input;
      return newOTP;
    });

    if (input !== "") {
      if (index < 5) {
        refs.current[index + 1].focus();
      }
    } else {
      if (index > 0) {
        refs.current[index - 1].focus();
      }
    }
  };

  const handleOTPKeyPress = (index, e) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      refs.current[index - 1].focus();
    }
  };

  const handleResend = async () => {
    try {
      await auth().signInWithPhoneNumber(phone);
      console.log("Code Resent!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <HeaderBar dummyRight={true} showBack={true} />
      <KeyboardAwareScrollView>
        <AppScrollView>
          <SpaceContainer marginTop={1} marginBottom={5}>
            <AuthTitle>{I18nContext.getString("verify_code")}</AuthTitle>
          </SpaceContainer>
          <SpaceContainer marginBottom={10}>
            <SubtitleContainer>
              <RegularText textAlign={"center"}>
                {I18nContext.getString("we_have_sent_verification_code_to")}
                Phone Number{" "}
                <RegularText color={"greenColor"}>{phone}</RegularText>
              </RegularText>
            </SubtitleContainer>
          </SpaceContainer>
          <SpaceContainer marginBottom={6}>
            <OtpContainer>
              <View style={styles.container}>
                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      style={styles.otpBox}
                      value={digit}
                      onChangeText={(input) => handleOTPEnter(index, input)}
                      onKeyPress={(e) => handleOTPKeyPress(index, e)}
                      keyboardType="numeric"
                      maxLength={1}
                      ref={(input) => (refs.current[index] = input)}
                    />
                  ))}
                </View>
              </View>
            </OtpContainer>
          </SpaceContainer>
          <CustomGreenButton
            showLoader={showLoader}
            text={"verify"}
            onPress={() => confirmCode()}
          />
          <SpaceContainer marginTop={7}>
            <CirculerTimer>
              <CountdownCircleTimer
                isPlaying
                duration={60}
                size={100}
                strokeWidth={2}
                trailColor={theme.circleBorder}
                colors={theme.greenColor}
              >
                {({ remainingTime, animatedColor }) => (
                  <RegularText fontSize={"md"} style={{ color: animatedColor }}>
                    {formatTime(remainingTime)}
                  </RegularText>
                )}
              </CountdownCircleTimer>
            </CirculerTimer>
          </SpaceContainer>
          <SpaceContainer marginTop={6} marginBottom={12}>
            <BottomText
              firstText={"did_not_receive_code"}
              secondText={"resend"}
              onPress={handleResend}
            />
          </SpaceContainer>
        </AppScrollView>
      </KeyboardAwareScrollView>
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  otpBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 5,
    textAlign: "center",
    fontSize: 20,
  },
});
export default connectStore(VerifyCode);
