import React from "react";
import connectStore from "../../../redux/connect";
import {
  AppScrollView,
  SpaceContainer,
  AuthTitle,
  RegularText,
  SubtitleContainer,
} from "../../../styles/common.style";
import { NavigationProps } from "../../../styles/common.interface";
import HeaderBar from "../../../components/HeaderBar";
import I18nContext from "../../../translations/I18nContext";
import CustomInput from "../../../components/CustomInput";
import CustomGreenButton from "../../../components/CustomGreenButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface IProps extends NavigationProps {}

const ForgotUsername: React.FC<IProps> = ({ navigation }) => {
  return (
    <React.Fragment>
      <HeaderBar dummyRight={true} showBack={true} />
      <KeyboardAwareScrollView>
        <AppScrollView>
          <SpaceContainer marginTop={1} marginBottom={5}>
            <AuthTitle textAlign={"center"}>
              {I18nContext.getString("forgot_username")}
            </AuthTitle>
          </SpaceContainer>
          <SpaceContainer marginBottom={8}>
            <SubtitleContainer>
              <RegularText textAlign={"center"}>
                {I18nContext.getString("forgot_username_subtitle")}
              </RegularText>
            </SubtitleContainer>
          </SpaceContainer>
          <CustomInput label={"phone_number"} placeholder={"+62-85734256745"} />
          <CustomGreenButton
            showLoader={false}
            text={"submit"}
            onPress={() => navigation.navigate("VerifyCode")}
          />
        </AppScrollView>
      </KeyboardAwareScrollView>
    </React.Fragment>
  );
};
export default connectStore(ForgotUsername);
