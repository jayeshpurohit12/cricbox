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
  TextInput,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
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
import Card from "components/Dashboard/Card";
import DashboardFilter from "components/DashboardFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterEndTime,
  setFilterStartTime,
  setFilterTurfSize,
} from "redux/actions/actions";
import { set } from "react-native-reanimated";

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
  const dispatch = useDispatch();

  const [listItems, setListItems] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [turfSize, setTurfSize] = useState([]);
  const [turfTime, setTurfTime] = useState([]);
  const [filteredListItems, setFilteredListItems] = useState([]);

  const selectedTurfSize = useSelector(
    (state) => state.FilterReducer.selectedTurfSize,
  );
  const selectedPrice = useSelector(
    (state) => state.FilterReducer.selectedPrice,
  );
  const selectedStartTime = useSelector(
    (state) => state.FilterReducer.selectedStartTime,
  );
  const selectedEndTime = useSelector(
    (state) => state.FilterReducer.selectedTurfSize,
  );

  const userCurrentId = auth().currentUser?.uid;

  // console.log(listItems, "listItems...");

  useEffect(() => {
    dispatch(setFilterTurfSize(turfSize));
    dispatch(setFilterStartTime(turfTime));
    dispatch(setFilterEndTime(turfTime));
  }, [turfSize, turfTime]);
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
                const haversine_km = haversine_m / 1000; //Results in
                documentData.distance = haversine_km.toFixed(2) + " km";
                data.push({ ...documentData, docId: document.id });
              });
              setLoader(false);
              setListItems(data);
              setFilteredListItems(data);
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

  const getPriceKey = (dateISO) => {
    const date = new Date(dateISO);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const hour = date.getHours();
    let timeOfDay;

    if (hour >= 0 && hour < 6) {
      timeOfDay = "Midnight";
    } else if (hour >= 6 && hour < 12) {
      timeOfDay = "Morning";
    } else if (hour >= 12 && hour < 18) {
      timeOfDay = "Afternoon/Evening";
    } else {
      timeOfDay = "Night";
    }

    if (isWeekend) {
      if (timeOfDay === "Morning") {
        return "weekendMorningPrice";
      } else if (timeOfDay === "Afternoon/Evening") {
        return "weekendEveningPrice";
      } else if (timeOfDay === "Night") {
        return "weekendNightPrice";
      } else {
        return "weekendMidNightPrice";
      }
    } else {
      if (timeOfDay === "Morning") {
        return "morningPrice";
      } else if (timeOfDay === "Afternoon/Evening") {
        return "eveningPrice";
      } else {
        return "midNightPrice";
      }
    }
  };

  const filterTurfs = () => {
    console.log("data filteres");
    console.log("selectedTurfSize:", selectedTurfSize);
    console.log("selectedPrice:", selectedPrice);
    console.log("selectedStartTime:", selectedStartTime);
    console.log("selectedEndTime:", selectedEndTime);
    // let filteredData = listItems.filter((item: any) =>
    //   item.boxDimension.includes(selectedTurfSize),
    // );
    // setFilteredListItems(filteredData);
    // const priceKey = getPriceKey(new Date().toISOString());
    // console.log("pricekey:", priceKey);
    setFilterVisible(false);
  };

  return (
    <React.Fragment>
      <HeaderBar showHelp={true} showBack={false} />
      <View style={{ marginVertical: 15 }}>
        <Feather
          name="search"
          size={20}
          style={{
            position: "absolute",
            zIndex: 1,
            left: 30,
            alignSelf: "center",
            top: "30%",
          }}
          color="grey"
        />
        <TextInput
          placeholder="Search by venue and location"
          style={{
            borderWidth: 1,
            padding: 15,
            paddingLeft: "13%",
            marginHorizontal: 15,
            borderRadius: 10,
            backgroundColor: "#e0e0e0",
            borderColor: "#e0e0e0",
          }}
        />
      </View>
      <FlatList
        data={filteredListItems}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListEmptyComponent={
          <>
            {showLoader ? <ActivityLoader /> : null}
            {!showLoader &&
            locationPermission &&
            filteredListItems.length == 0 ? (
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                marginBottom: 15,
              }}
            >
              <HeadLine>
                <CardBlackText style={{ fontWeight: "bold" }} marginLeft={0}>
                  {I18nContext.getString("available_venues")}
                </CardBlackText>
              </HeadLine>
              <Feather
                name="filter"
                size={24}
                onPress={() => setFilterVisible(true)}
              />
            </View>
          </React.Fragment>
        }
        keyExtractor={(item) => item.docId}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("PlaceDetails", {
                params: item,
              });
            }}
            style={{
              paddingHorizontal: 15,
            }}
          >
            <Card
              venueDetails={item}
              setTurfSize={setTurfSize}
              turfSize={turfSize}
              turfTime={turfTime}
              setTurfTime={setTurfTime}
            />
          </TouchableOpacity>
        )}
      />

      <DashboardFilter
        isFilterVisible={isFilterVisible}
        setFilterVisible={setFilterVisible}
        filterTurfs={filterTurfs}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  headLine: { paddingLeft: 16, paddingRight: 16 },
});

export default connectStore(Dashboard);
