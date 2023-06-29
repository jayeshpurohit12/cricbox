import { NavigationProps } from "../../styles/common.interface";
import React from "react";
import HeaderBar from "../../components/HeaderBar";
import {
  AppScrollView,
  SpaceContainer,
  RegularText,
} from "../../styles/common.style";
import LinearCard from "../../components/LinearCard";
import I18nContext from "../../translations/I18nContext";
import { TipBlockRow, TipCard, Percentage } from "./styled";
import { tips } from "../../constants";
import BottomText from "../../components/BottomText";

interface IProps extends NavigationProps {}

const AddTips: React.FC<IProps> = ({ navigation }) => {
  return (
    <React.Fragment>
      <HeaderBar showHelp={true} showBack={true} />
      <AppScrollView>
        <LinearCard
          image={require("../../../assets/images/bitcoin.png")}
          amount="$348.000"
        />
        <SpaceContainer marginTop={8} marginBottom={6}>
          <RegularText color="blackColor" fontSize="md" textAlign="center">
            {I18nContext.getString("add_tips")}
          </RegularText>
        </SpaceContainer>
        <TipBlockRow>
          {tips.map((item, index) => {
            return (
              <TipCard width={48} key={index}>
                <RegularText color="blackColor" fontSize="md" marginLeft="auto">
                  {item.price}
                </RegularText>
                <Percentage>{item.percentage}</Percentage>
              </TipCard>
            );
          })}
        </TipBlockRow>
        <TipCard width={100}>
          <RegularText
            color="blackColor"
            fontSize="md"
            marginLeft="auto"
            marginRight="auto"
          >
            {I18nContext.getString("custom_tip")}
          </RegularText>
        </TipCard>
        <SpaceContainer marginTop={4}>
          <BottomText
            firstText="empty"
            secondText="no_tip"
            onPress={() => navigation.navigate("ScanBarcode")}
          />
        </SpaceContainer>
      </AppScrollView>
    </React.Fragment>
  );
};

export default AddTips;
