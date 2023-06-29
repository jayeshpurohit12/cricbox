import React, { useEffect } from "react";
import connectStore from "../../../redux/connect";
import {
  ButtonText,
  ContainBg,
  Ilustration,
  BottomContainer,
  AlignCenterContain,
  ButtonRow,
} from "./style";
import {
  LogoImage,
  SpaceContainer,
  RegularText,
  BlueButton,
  GreenButton,
} from "../../../styles/common.style";
import I18nContext from "../../../translations/I18nContext";
import { NavigationProps } from "../../../styles/common.interface";
import CustomGreenButton from "../../../components/CustomGreenButton";
import CustomBlueButton from "../../../components/CustomBlueButton";

interface IProps extends NavigationProps {
  darkThemeEnabled: boolean;
  setTheme: (value: boolean) => void;
}

const StartUp: React.FC<IProps> = ({ darkThemeEnabled, navigation }) => {
  useEffect(() => {
    // crashlytics().crash();
  }, []);

  return (
    <ContainBg source={require("../../../../assets/images/start-bg.png")}>
      <Ilustration
        resizeMode="contain"
        source={require("../../../../assets/images/ilustration.png")}
      />
      <BottomContainer>
        <AlignCenterContain>
          <LogoImage
            source={require("../../../../assets/images/heavenpay.png")}
          />
        </AlignCenterContain>
        <SpaceContainer marginTop={3} marginBottom={5}>
          <AlignCenterContain>
            <RegularText textAlign="center">
              {I18nContext.getString("start_up_page_subtitle")}
            </RegularText>
          </AlignCenterContain>
        </SpaceContainer>
        <ButtonRow>
          <CustomBlueButton
            width={48}
            onPress={() => navigation.navigate("SignUp")}
            text={"sign_up"}
          />
          <CustomGreenButton
            width={48}
            showLoader={false}
            onPress={() => navigation.navigate("SignIn")}
            text={"sign_in"}
          />
        </ButtonRow>
      </BottomContainer>
    </ContainBg>
  );
};

export default connectStore(StartUp);
