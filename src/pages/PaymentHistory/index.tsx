import React from "react";
import { NavigationProps } from "../../styles/common.interface";
import connectStore from "../../redux/connect";
import HeaderBar from "../../components/HeaderBar";
import { CardImage, styles, PriceContainer } from "./style";
import {
  SpaceContainer,
  AppFlatList,
  ContainTitle,
  GreyCard,
  CardBlackText,
  CardGreyText,
  TextContainer,
} from "../../styles/common.style";
import I18nContext from "../../translations/I18nContext";
import { paymentHistory } from "../../constants";

interface IProps extends NavigationProps {}

const PaymentHistory: React.FC<IProps> = ({ navigation }) => {
  return (
    <React.Fragment>
      <HeaderBar showHelp={true} showBack={false} />
      <AppFlatList
        data={paymentHistory}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListHeaderComponent={
          <SpaceContainer marginBottom={3}>
            <ContainTitle>
              {I18nContext.getString("payment_history")}
            </ContainTitle>
          </SpaceContainer>
        }
        renderItem={({ item, index }) => (
          <GreyCard key={index}>
            <CardImage
              style={styles.iconStyle}
              source={
                item.incoming
                  ? require("../../../assets/images/incoming.png")
                  : require("../../../assets/images/outgoing.png")
              }
            />
            <TextContainer>
              <CardBlackText>Dogout</CardBlackText>
              <CardGreyText>22 June 2019</CardGreyText>
            </TextContainer>
            <PriceContainer>
              <CardBlackText>{item.price}</CardBlackText>
            </PriceContainer>
          </GreyCard>
          //   <PaymentCard
          //     key={index}
          //     onPress={() => {
          //       navigation.navigate('AddTips');
          //     }}
          //     item={item}
          //   />
        )}
        keyExtractor={(item) => item.id}
      />
    </React.Fragment>
  );
};

export default connectStore(PaymentHistory);
