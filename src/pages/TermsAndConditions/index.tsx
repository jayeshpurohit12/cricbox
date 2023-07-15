import React from "react";
import { NavigationProps } from "../../styles/common.interface";
import connectStore from "../../redux/connect";
import HeaderBar from "../../components/HeaderBar";

import {
  AppScrollView,
  SpaceContainer,
  ContainTitle,
  CardBlackText,
  CardGreyText,
} from "../../styles/common.style";
import I18nContext from "../../translations/I18nContext";

interface IProps extends NavigationProps {}

const TermsAndConditions: React.FC<IProps> = ({ navigation }) => {
  return (
    <React.Fragment>
      <HeaderBar showHelp={true} showBack={true} />
      <AppScrollView>
        <SpaceContainer marginBottom={3}>
          <ContainTitle>
            {I18nContext.getString("term_and_conditions")}
          </ContainTitle>
        </SpaceContainer>
        <SpaceContainer marginBottom={3}>
          <CardBlackText marginLeft={0}>General Data</CardBlackText>
          <CardGreyText marginLeft={0}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </CardGreyText>
        </SpaceContainer>
        <SpaceContainer marginBottom={3}>
          <CardBlackText marginLeft={0}>General Data</CardBlackText>
          <CardGreyText marginLeft={0}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </CardGreyText>
        </SpaceContainer>

        <SpaceContainer marginBottom={3}>
          <CardBlackText marginLeft={0}>General Data</CardBlackText>
          <CardGreyText marginLeft={0}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </CardGreyText>
        </SpaceContainer>

        <SpaceContainer marginBottom={3}>
          <CardBlackText marginLeft={0}>General Data</CardBlackText>
          <CardGreyText marginLeft={0}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </CardGreyText>
        </SpaceContainer>

        <SpaceContainer marginBottom={3}>
          <CardBlackText marginLeft={0}>General Data</CardBlackText>
          <CardGreyText marginLeft={0}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </CardGreyText>
        </SpaceContainer>
        <SpaceContainer marginBottom={3}>
          <CardBlackText marginLeft={0}>General Data</CardBlackText>
          <CardGreyText marginLeft={0}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </CardGreyText>
        </SpaceContainer>
      </AppScrollView>
    </React.Fragment>
  );
};

export default connectStore(TermsAndConditions);
