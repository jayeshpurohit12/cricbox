import React, { useState } from "react";
import connectStore from "../../redux/connect";
import { NavigationProps } from "../../styles/common.interface";
import HeaderBar from "../../components/HeaderBar";
import {
  SpaceContainer,
  AppScrollView,
  CustomRow,
  GreyView,
  CardGreyText,
} from "../../styles/common.style";
import I18nContext from "../../translations/I18nContext";
import TipToggles from "../../components/TipToggles";
import TipPercentageCounter from "../../components/TipPercentageCounter";
interface IProps extends NavigationProps {}

const ConfigurationTips: React.FC<IProps> = ({ navigation }) => {
  return (
    <React.Fragment>
      <HeaderBar showHelp={true} showBack={true} />
      <AppScrollView>
        <SpaceContainer marginBottom={3.5}>
          <TipToggles
            isHeaderTitle={true}
            marginRight={5}
            title="collect_tips"
          />
        </SpaceContainer>
        <SpaceContainer marginBottom={3}>
          <GreyView>
            <TipToggles
              isHeaderTitle={false}
              marginRight={0}
              textColor="inputLabelColor"
              title="custom_tips"
            />

            <SpaceContainer marginTop={1.5}>
              <CustomRow>
                <CardGreyText marginLeft={0}>
                  {I18nContext.getString("enter_own_tips")}
                </CardGreyText>
              </CustomRow>
            </SpaceContainer>
          </GreyView>
        </SpaceContainer>
        <SpaceContainer marginBottom={3}>
          <TipToggles
            isHeaderTitle={false}
            marginRight={5}
            onColor="blueColor"
            textColor="inputLabelColor"
            title="percentage_tips"
          />
        </SpaceContainer>
        <SpaceContainer>
          <TipPercentageCounter />
        </SpaceContainer>
      </AppScrollView>
    </React.Fragment>
  );
};

export default connectStore(ConfigurationTips);
