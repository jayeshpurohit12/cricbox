import connectStore from "redux/connect";
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { SliderBox } from "react-native-image-slider-box";
import Icon from "react-native-vector-icons/Ionicons";
import I18nContext from "translations/I18nContext";
import CustomButton from "components/CustomButton";
import { NavigationProps } from "styles/common.interface";
import alertService from "service/alertService";
import firestore from "@react-native-firebase/firestore";
import commonService from "service/commonService";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
interface IProps extends NavigationProps {
  userData: any;
  route: any;
}

const PlaceDetails: React.FC<IProps> = ({ route, navigation, userData }) => {
  const [placeDetails, setPlaceDetails] = useState<any>({ images: [] });
  const [loader, setLoader] = useState("");

  useEffect(() => {
    if (route.params) {
      setPlaceDetails(route.params);
    }
  }, [route.params]);

  const updateDetails = (status: string) => {
    if (userData.role === "admin") {
      setLoader(status);
      firestore()
        .collection("Places")
        .doc(placeDetails.docId)
        .update({
          status,
        })
        .then(() => {
          setLoader("");
          navigation.navigate("DashboardStack");
          commonService.showToast(
            "success",
            status === "approved" ? "place_approved" : "place_rejected",
          );
        })
        .catch(() => {
          commonService.showToast("error", "default_error");
          setLoader("");
        });
    }
  };

  const handleDirectionOpen = () => {
    const latLng = `${placeDetails?.params?.lat},${placeDetails?.params?.long}`;
    const query = `q=${latLng}`;
    const appleQuery = encodeURIComponent(`@${latLng}`);
    const url = Platform.select({
      ios: `maps://?q=${appleQuery}`,
      android: `geo:${placeDetails?.params?.lat},${placeDetails?.params?.long}?${query}`,
    });

    Linking.openURL(url);
  };

  console.log(placeDetails?.params, "placeDetails?.params");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: "24%" }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 12, left: 12, zIndex: 999 }}
        >
          <Icon size={34} color="white" name="chevron-back-circle-sharp" />
        </TouchableOpacity>
        {placeDetails?.params?.images.length && (
          <SliderBox
            imageLoadingColor="#081021"
            images={placeDetails?.params?.images}
            autoplay
            ImageComponentStyle={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              height: 250,
            }}
          />
        )}
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={styles.venueHeading}>Venue Name & Address</Text>
          <View style={styles.venueDetails}>
            <View style={{ width: "70%" }}>
              <Text style={styles.venueName}>{placeDetails?.params?.name}</Text>
              <Text style={styles.venueLocation}>
                {placeDetails?.params?.location}
              </Text>
              <TouchableOpacity
                onPress={handleDirectionOpen}
                activeOpacity={0.8}
              >
                <Text style={styles.getLocation}>Get Direction</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderRadius: 50,
                borderWidth: 1,
                backgroundColor: "green",
                alignSelf: "center",
                padding: 4,
                borderColor: "green",
              }}
            >
              <MaterialIcons name="call" color="white" size={25} />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderRadius: 12,
                paddingHorizontal: 15,
                backgroundColor: "#e0e0e0",
                borderColor: "#e0e0e0",
                flexDirection: "row",
                width: "55%",
                alignItems: "center",
              }}
            >
              <Feather name="clock" size={20} color="black" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text
                  style={{ fontSize: 16, color: "black", fontWeight: "bold" }}
                >
                  Monday - Sunday
                </Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 12,
                paddingVertical: 5,
                paddingHorizontal: 10,
                backgroundColor: "#e0e0e0",
                borderColor: "#e0e0e0",
              }}
            >
              <Text style={styles.priceText}>
                ₹{placeDetails?.params?.midNightPrice}/
              </Text>
              <Text style={[styles.priceText, { fontSize: 12 }]}>per hr</Text>
            </View>
          </View>
          <Text
            style={{
              marginTop: 20,
              marginBottom: 15,
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            About Venue
          </Text>
          <Text>{placeDetails?.params?.description}</Text>
        </View>
      </ScrollView>
      <View>
        {userData.role === "admin" &&
        placeDetails?.params?.page === "pending" ? (
          <View style={styles.footer}>
            <CustomButton
              text="reject"
              disabled={loader !== ""}
              loader={loader === "rejected"}
              onPress={() => {
                alertService
                  .confirmAlert(
                    I18nContext.getString("confirm"),
                    I18nContext.getString("are_you_sure_reject"),
                  )
                  .then(() => {
                    updateDetails("rejected");
                  });
              }}
              backgroundColor="red"
              width="50%"
            />

            <CustomButton
              text="accept"
              disabled={loader !== ""}
              loader={loader === "accepted"}
              onPress={() => {
                alertService
                  .confirmAlert(
                    I18nContext.getString("confirm"),
                    I18nContext.getString("are_you_sure_accept"),
                  )
                  .then(() => {
                    updateDetails("approved");
                  });
              }}
              backgroundColor="#0DBE94"
              width="50%"
            />
          </View>
        ) : null}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("BookingSlots", placeDetails?.params)
        }
      >
        <Text style={styles.buttonText}>Book</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  venueHeading: {
    marginTop: 15,
    color: "#000",
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    bottom: 0,
  },
  button: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "green",
    width: "85%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  venueDetails: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E0E0E0",
    borderColor: "#E0E0E0",
  },
  venueName: {
    fontSize: 17,
    color: "#000",
    fontWeight: "600",
  },
  venueLocation: {
    fontSize: 15,
    color: "#000",
    fontWeight: "400",
    marginVertical: 5,
  },
  getLocation: {
    color: "#8B8000",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  priceText: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
});

export default connectStore(PlaceDetails);
