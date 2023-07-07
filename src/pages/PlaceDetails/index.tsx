import connectStore from "redux/connect";
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { SliderBox } from "react-native-image-slider-box";
import { CardBlackText, CardGreyText } from "styles/common.style";
import RatingView from "components/RatingView";
import Icon from "react-native-vector-icons/Ionicons";
import I18nContext from "translations/I18nContext";
import CustomButton from "components/CustomButton";
import { NavigationProps } from "styles/common.interface";
import alertService from "service/alertService";
import firestore from "@react-native-firebase/firestore";
import commonService from "service/commonService";
import Feather from "react-native-vector-icons/Feather";
import moment from "moment";
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
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
          />
        )}
        <View style={{ padding: 8, marginTop: 12 }}>
          <View
            style={{
              alignItems: "baseline",
              position: "absolute",
              top: 12,
              right: 12,
            }}
          >
            <RatingView />
          </View>
          <CardBlackText style={styles.title}>
            {placeDetails?.params?.name}
          </CardBlackText>
          <CardGreyText>
            {placeDetails?.params?.startTime} - {placeDetails?.params?.endTime}
          </CardGreyText>
          {placeDetails?.params?.distance ? (
            <CardGreyText>{placeDetails?.params?.distance}</CardGreyText>
          ) : null}
          {userData.role === "admin" || userData.role === "box-admin" ? (
            <CardGreyText>+91{placeDetails?.params?.phone}</CardGreyText>
          ) : null}
          <CardGreyText>{placeDetails?.params?.description}</CardGreyText>
        </View>
        <View style={styles.separator}></View>
        <View style={{ padding: 8 }}>
          <CardBlackText style={styles.title}>
            {I18nContext.getString("location")}
          </CardBlackText>
          <CardGreyText>{placeDetails?.params?.location}</CardGreyText>
        </View>
        <View style={styles.separator}></View>
        <View style={{ padding: 8 }}>
          <CardBlackText style={styles.title}>
            {I18nContext.getString("amenities")}
          </CardBlackText>
          <CardGreyText>{placeDetails?.params?.amenities}</CardGreyText>
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
  separator: {
    borderWidth: 2,
    opacity: 0.1,
    borderColor: "#808694",
    marginTop: 12,
    marginBottom: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
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
});

export default connectStore(PlaceDetails);
