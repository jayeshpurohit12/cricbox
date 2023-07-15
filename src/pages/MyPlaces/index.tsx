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

interface IProps extends NavigationProps {
  userData: any;
}

const MyPlaces: React.FC<IProps> = ({ userData }) => {
  const [showLoader, setLoader] = useState(false);
  const [myItems, setMyItems] = useState([]);
  useEffect(() => {
    if (userData.userId) {
      setLoader(true);
      firestore()
        .collection("Places")
        .where("userId", "==", userData.userId)
        .get()
        .then((querySnapshot) => {
          const data: any = [];
          querySnapshot.forEach((document) => {
            data.push({ ...document.data(), docId: document.id });
          });
          setMyItems(data);
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
        });
    }
  }, [userData]);

  return (
    <React.Fragment>
      <HeaderBar showHelp={true} showBack={true} />
      <AppFlatList
        data={myItems}
        contentContainerStyle={{ paddingBottom: 60, flex: 1 }}
        ListHeaderComponent={
          <SpaceContainer marginBottom={2}>
            <ContainTitle>{I18nContext.getString("my_places")}</ContainTitle>
          </SpaceContainer>
        }
        ListEmptyComponent={
          <>
            {showLoader ? <ActivityLoader /> : null}
            {!showLoader && myItems.length == 0 ? (
              <CardBlackText style={{ textAlign: "center" }}>
                {I18nContext.getString("no_my_place")}
              </CardBlackText>
            ) : null}
          </>
        }
        renderItem={({ item, index }) => (
          <GreyCard key={index}>
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

export default connectStore(MyPlaces);
