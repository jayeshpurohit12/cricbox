import React from "react";
import connectStore from "../../redux/connect";
import { NavigationProps } from "../../styles/common.interface";
import HeaderBar from "../../components/HeaderBar";
import {
  SpaceContainer,
  ContainTitle,
  AppFlatList,
} from "../../styles/common.style";
import I18nContext from "../../translations/I18nContext";
import SearchBar from "../../components/SearchBar";
import PaymentCard from "../../components/PaymentCard";
import { cryptoMethods } from "../../constants";
import LinearCard from "../../components/LinearCard";
interface IProps extends NavigationProps {}

const CryptoMethods: React.FC<IProps> = ({ navigation }) => {
  return (
    <React.Fragment>
      <HeaderBar showHelp={true} showBack={true} />
      <AppFlatList
        data={cryptoMethods}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListHeaderComponent={
          <React.Fragment>
            <LinearCard amount="$348.000" />
            <SpaceContainer marginTop={5} marginBottom={3}>
              <SearchBar placeholder={"search"} />
            </SpaceContainer>
            <SpaceContainer marginBottom={3}>
              <ContainTitle>
                {I18nContext.getString("select_crypto")}
              </ContainTitle>
            </SpaceContainer>
          </React.Fragment>
        }
        renderItem={({ item, index }) => (
          <PaymentCard
            key={index}
            onPress={() => {
              navigation.navigate("AddTips");
            }}
            item={item}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </React.Fragment>
  );
};

export default connectStore(CryptoMethods);
