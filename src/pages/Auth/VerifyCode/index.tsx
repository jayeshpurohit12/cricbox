import React from "react";
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

interface IProps extends NavigationProps {}

const VerifyCode: React.FC<IProps> = ({ navigation }) => {
  const theme = useTheme();

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
                email{" "}
                <RegularText color={"greenColor"}>test@gmail.com</RegularText>
              </RegularText>
            </SubtitleContainer>
          </SpaceContainer>
          <SpaceContainer marginBottom={6}>
            <OtpContainer>
              <OtpBox
                keyboardType={"number-pad"}
                autoCorrect={false}
                maxLength={1}
              />
              <OtpBox
                keyboardType={"number-pad"}
                autoCorrect={false}
                maxLength={1}
              />
              <OtpBox
                keyboardType={"number-pad"}
                autoCorrect={false}
                maxLength={1}
              />
              <OtpBox
                keyboardType={"number-pad"}
                autoCorrect={false}
                maxLength={1}
              />
            </OtpContainer>
          </SpaceContainer>
          <CustomGreenButton
            showLoader={false}
            text={"verify"}
            onPress={() => ""}
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
              onPress={() => ""}
            />
          </SpaceContainer>
        </AppScrollView>
      </KeyboardAwareScrollView>
    </React.Fragment>
  );
};
export default connectStore(VerifyCode);
