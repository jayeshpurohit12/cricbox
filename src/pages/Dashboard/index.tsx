import React, { useEffect, useState } from "react";
import { NavigationProps } from "../../styles/common.interface";
import connectStore from "../../redux/connect";
import HeaderBar from "../../components/HeaderBar";
import { HeadLine } from "./style";
import {
  CardBlackText,
  CardGreyText,
  EmptyText,
} from "../../styles/common.style";
import I18nContext from "../../translations/I18nContext";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Button,
  Text,
} from "react-native";
import { FontSize } from "styles/sizes";
import { StyleSheet } from "react-native";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import RatingView from "components/RatingView";
import GetLocation from "react-native-get-location";
import geohash from "ngeohash";
import haversine from "haversine-distance";
import ActivityLoader from "components/ActivityLoader";
import CustomGreenButton from "components/CustomGreenButton";

interface IProps extends NavigationProps {
  userData: any;
  loadUserData: (data: any) => void;
}

const boxes = [
  {
    image: require("../../../assets/images/image1.jpeg"),
    name: "Box 1",
    id: "1",
  },
  {
    image: require("../../../assets/images/image2.jpeg"),
    name: "Box 2",
    id: "2",
  },
  {
    image: require("../../../assets/images/image1.jpeg"),
    name: "Box 3",
    id: "3",
  },
  {
    image: require("../../../assets/images/image2.jpeg"),
    name: "Box 4",
    id: "4",
  },
];

const Dashboard: React.FC<IProps> = ({ navigation, loadUserData }) => {
  const [listItems, setListItems] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);

  const userCurrentId = auth().currentUser?.uid;
  useEffect(() => {
    let userSubscriber: any = null;
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        userSubscriber = firestore()
          .collection("Users")
          .doc(user?.uid)
          .onSnapshot((documentSnapshot: any) => {
            loadUserData(documentSnapshot.data());
          });
      }
    });
    loadPlaces();
    return () => {
      subscriber();
      if (userSubscriber) {
        userSubscriber();
      }
    };
  }, []);
  const getGeohashRange = (
    latitude: number,
    longitude: number,
    distance: number, // miles
  ) => {
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile

    const lowerLat = latitude - lat * distance;
    const lowerLon = longitude - lon * distance;

    const upperLat = latitude + lat * distance;
    const upperLon = longitude + lon * distance;

    const lower = geohash.encode(lowerLat, lowerLon);
    const upper = geohash.encode(upperLat, upperLon);

    return {
      lower,
      upper,
    };
  };

  const handleRemoveSession = async () => {
    try {
      const collectionRef = firebase
        .firestore()
        .collection("BookedSlots")
        .where("userId", "==", userCurrentId);

      const querySnapshot = await collectionRef.get();

      querySnapshot.docs.forEach((doc) => {
        if (!doc.data().isBooked) {
          doc.ref.delete();
        }
      });
    } catch (error) {
      console.log(error);
    }
    return true;
  };

  useEffect(() => {
    handleRemoveSession();
  }, []);

  const loadPlaces = () => {
    setLoader(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then((location) => {
        setLocationPermission(true);
        const { latitude, longitude } = location;
        const range = getGeohashRange(latitude, longitude, 100);
        firestore()
          .collection("Places")
          // .where("geoHash", ">=", range.lower)
          // .where("geoHash", "<=", range.upper)
          .where("status", "==", "approved")
          .onSnapshot(
            (snapshot) => {
              const data: any = [];
              snapshot.forEach((document) => {
                const documentData: any = document.data();
                var haversine_m = haversine(
                  { lat: latitude, lng: longitude },
                  { lat: documentData.lat, lng: documentData.long },
                ); //Results in meters (default)
                console.log(haversine_m, "haversine_m");
                const haversine_km = haversine_m / 1000; //Results in
                documentData.distance = haversine_km.toFixed(2) + " km";
                data.push({ ...documentData, docId: document.id });
              });
              setLoader(false);
              setListItems(data);
            },
            (error) => {
              setLoader(false);
              console.log(error, "error");
            },
          );
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(code, message);
        if (code === "UNAUTHORIZED") {
          setLocationPermission(false);
        }
        setLoader(false);
        // console.warn(code, message);
      });
  };

  // const [isModalVisible, setModalVisible] = useState(false);
  return (
    <React.Fragment>
      <HeaderBar showHelp={true} showBack={false} />
      <FlatList
        data={listItems}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListEmptyComponent={
          <>
            {showLoader ? <ActivityLoader /> : null}
            {!showLoader && locationPermission && listItems.length == 0 ? (
              <CardBlackText style={{ textAlign: "center" }}>
                {I18nContext.getString("no_places")}
              </CardBlackText>
            ) : null}
            {!showLoader && !locationPermission ? (
              <>
                <EmptyText
                  marginLeft={0}
                  style={{
                    textAlign: "center",
                    marginTop: "auto",
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                >
                  {I18nContext.getString("unable_to_locate")}
                </EmptyText>
                <View
                  style={{
                    marginBottom: "auto",
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                >
                  <CustomGreenButton
                    showLoader={false}
                    onPress={() => {
                      Linking.openSettings();
                    }}
                    text="settings"
                  />
                </View>
              </>
            ) : null}
          </>
        }
        ListHeaderComponent={
          <React.Fragment>
            {locationPermission ? (
              <HeadLine style={styles.headLine}>
                <CardBlackText style={{ fontWeight: "bold" }} marginLeft={0}>
                  {I18nContext.getString("most_popular")}
                </CardBlackText>
              </HeadLine>
            ) : null}
            {!showLoader && locationPermission ? (
              <React.Fragment>
                <FlatList
                  data={listItems}
                  style={{ padding: 16 }}
                  horizontal={true}
                  keyExtractor={(item) => item.docId}
                  renderItem={({ item, index, separators }) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("PlaceDetails", {
                          params: item,
                        });
                      }}
                    >
                      <View style={{ marginRight: 16 }}>
                        <Image
                          style={{ width: 160, height: 160, borderRadius: 12 }}
                          source={{ uri: item.images[0] }}
                        />
                        <CardBlackText
                          style={{ fontWeight: 500, marginTop: 6 }}
                          fontSize={FontSize.sm}
                          marginLeft={0}
                        >
                          {item.name}
                        </CardBlackText>
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <HeadLine style={styles.headLine}>
                  <CardBlackText style={{ fontWeight: "bold" }} marginLeft={0}>
                    {I18nContext.getString("available_venues")}
                  </CardBlackText>
                </HeadLine>
              </React.Fragment>
            ) : null}
          </React.Fragment>
        }
        keyExtractor={(item) => item.docId}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PlaceDetails", {
                params: item,
              });
            }}
          >
            <View key={index} style={{ padding: 16 }}>
              <View style={{ flexDirection: "row" }}>
                <CardBlackText
                  style={{ fontWeight: 500 }}
                  fontSize={FontSize.sm}
                  marginLeft={0}
                >
                  {item.name}
                </CardBlackText>
                <View
                  style={{
                    alignItems: "baseline",
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                >
                  <RatingView />
                </View>
              </View>

              <CardGreyText marginLeft={0}>{item.location}</CardGreyText>
              <CardGreyText marginLeft={0}>({item.distance})</CardGreyText>
              <Image
                style={{
                  height: 170,
                  marginTop: 8,
                  width: "100%",
                  borderRadius: 12,
                }}
                source={{ uri: item.images[0] }}
              />
            </View>
            <View
              style={{
                borderColor: "#808694",
                borderWidth: 0.3,
                marginTop: 12,
                opacity: 0.3,
              }}
            ></View>
          </TouchableOpacity>
        )}
      />
      {/* <TouchableOpacity
        onPress={handleBooking}
        style={{
          alignSelf: "center",
          marginTop: 200,
          borderWidth: 1,
          width: "40%",
        }}
      >
        <Text>click me</Text>
      </TouchableOpacity> */}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  headLine: { paddingLeft: 16, paddingRight: 16 },
});

export default connectStore(Dashboard);
