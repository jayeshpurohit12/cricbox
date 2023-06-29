import React from "react";
import { NavigationProps } from "../../styles/common.interface";
import connectStore from "../../redux/connect";
import HeaderBar from "../../components/HeaderBar";

import {
  AppScrollView,
  SpaceContainer,
  AmountText,
  EnterAmount,
  ContainTitle,
  CardBlackText,
  CardGreyText,
} from "../../styles/common.style";
import I18nContext from "../../translations/I18nContext";
import CustomGreenButton from "../../components/CustomGreenButton";
import KeypadComponent from "../../components/KeypadComponent";

interface IProps extends NavigationProps {}

const PrivacyAndPolicies: React.FC<IProps> = ({ navigation }) => {
  return (
    <React.Fragment>
      <HeaderBar showHelp={true} showMenu={true} showBack={false} />
      <AppScrollView>
        <SpaceContainer marginBottom={3}>
          <ContainTitle>{I18nContext.getString("privacy_policy")}</ContainTitle>
        </SpaceContainer>
        <SpaceContainer marginBottom={3}>
          <CardGreyText marginLeft={0}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </CardGreyText>
        </SpaceContainer>
        <SpaceContainer marginBottom={3}>
          <CardGreyText marginLeft={0}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </CardGreyText>
        </SpaceContainer>

        <SpaceContainer marginBottom={3}>
          <CardGreyText marginLeft={0}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </CardGreyText>
        </SpaceContainer>

        <SpaceContainer marginBottom={3}>
          <CardGreyText marginLeft={0}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </CardGreyText>
        </SpaceContainer>
        <SpaceContainer marginBottom={3}>
          <CardGreyText marginLeft={0}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </CardGreyText>
        </SpaceContainer>
        <SpaceContainer marginBottom={3}>
          <CardGreyText marginLeft={0}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </CardGreyText>
        </SpaceContainer>
      </AppScrollView>
    </React.Fragment>
  );
};

export default connectStore(PrivacyAndPolicies);
