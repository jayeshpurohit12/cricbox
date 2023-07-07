import React, { useEffect, useState } from "react";
import { NavigationProps } from "../../styles/common.interface";
import connectStore from "../../redux/connect";
import HeaderBar from "../../components/HeaderBar";
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
import firestore from "@react-native-firebase/firestore";
import ActivityLoader from "components/ActivityLoader";

interface IProps extends NavigationProps {}

const PendingPlaces: React.FC<IProps> = ({ navigation }) => {
  const [showLoader, setLoader] = useState(false);
  const [pendingItems, setPendingItems] = useState([]);
  useEffect(() => {
    loadPendingPlaces();
  }, []);

  const loadPendingPlaces = () => {
    setLoader(true);
    firestore()
      .collection("Places")
      // Filter results
      .where("status", "==", "pending")
      .get()
      .then((querySnapshot) => {
        const data: any = [];
        querySnapshot.forEach((document) => {
          data.push({ ...document.data(), docId: document.id });
        });
        setPendingItems(data);
        setLoader(false);
        /* ... */
      })
      .catch(() => {
        setLoader(false);
      });
  };

  return (
    <React.Fragment>
      <HeaderBar showHelp={true} showBack={false} />
      <AppFlatList
        data={pendingItems}
        contentContainerStyle={{ paddingBottom: 60, flex: 1 }}
        ListHeaderComponent={
          <SpaceContainer marginBottom={2}>
            <ContainTitle>
              {I18nContext.getString("pending_place")}
            </ContainTitle>
          </SpaceContainer>
        }
        ListEmptyComponent={
          <>
            {showLoader ? <ActivityLoader /> : null}
            {!showLoader && pendingItems.length == 0 ? (
              <CardBlackText style={{ textAlign: "center" }}>
                {I18nContext.getString("no_pending")}
              </CardBlackText>
            ) : null}
          </>
        }
        renderItem={({ item, index }) => (
          <GreyCard
            onPress={() => {
              navigation.navigate("PendingPlaceStack", {
                screen: "PlaceDetails",
                params: { ...item, page: "pending" },
              });
            }}
            key={index}
          >
            <TextContainer>
              <CardBlackText>{item.name}</CardBlackText>
              <CardGreyText numberOfLines={3}>{item.location}</CardGreyText>
              <CardGreyText numberOfLines={3}>
                {item.startTime} - {item.endTime}
              </CardGreyText>
            </TextContainer>
          </GreyCard>
        )}
        keyExtractor={(item) => item.docId}
      />
    </React.Fragment>
  );
};

export default connectStore(PendingPlaces);
