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

const CreateNewPassword: React.FC<IProps> = ({ navigation }) => {
  return (
    <React.Fragment>
      <HeaderBar dummyRight={true} showBack={true} />
      <KeyboardAwareScrollView>
        <AppScrollView>
          <SpaceContainer marginTop={1} marginBottom={5}>
            <AuthTitle>
              {I18nContext.getString("create_new_password")}
            </AuthTitle>
          </SpaceContainer>
          <SpaceContainer marginBottom={8}>
            <SubtitleContainer>
              <RegularText textAlign={"center"}>
                {I18nContext.getString("create_new_password_subtitle")}
              </RegularText>
            </SubtitleContainer>
          </SpaceContainer>
          <CustomInput
            secureTextEntry={true}
            label={"password"}
            placeholder={"12345"}
          />
          <CustomInput
            secureTextEntry={true}
            label={"confirm_password"}
            placeholder={"12345"}
          />
          <CustomGreenButton
            showLoader={false}
            text={"reset_password"}
            onPress={() => ""}
          />
        </AppScrollView>
      </KeyboardAwareScrollView>
    </React.Fragment>
  );
};
export default connectStore(CreateNewPassword);
