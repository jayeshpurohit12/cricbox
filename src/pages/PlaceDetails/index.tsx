import connectStore from "redux/connect";
import {
  ScrollView,
  SafeAreaView,
  View,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { SliderBox } from "react-native-image-slider-box";
import { CardBlackText, CardGreyText } from "styles/common.style";
import RatingView from "components/RatingView";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import I18nContext from "translations/I18nContext";
import CustomButton from "components/CustomButton";
import { NavigationProps } from "styles/common.interface";
import alertService from "service/alertService";
import firestore from "@react-native-firebase/firestore";
import commonService from "service/commonService";
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
  }, [route]);

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

        <SliderBox imageLoadingColor="#081021" images={placeDetails.images} />
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
            {placeDetails.name}
          </CardBlackText>
          <CardGreyText>
            {placeDetails.startTime} - {placeDetails.endTime}
          </CardGreyText>
          {placeDetails.distance ? (
            <CardGreyText>{placeDetails.distance}</CardGreyText>
          ) : null}
          {userData.role === "admin" || userData.role === "box-admin" ? (
            <CardGreyText>+91{placeDetails.phone}</CardGreyText>
          ) : null}

          <CardGreyText>{placeDetails.description}</CardGreyText>
        </View>
        <View style={styles.separator}></View>
        <View style={{ padding: 8 }}>
          <CardBlackText style={styles.title}>
            {I18nContext.getString("location")}
          </CardBlackText>
          <CardGreyText>{placeDetails.location}</CardGreyText>
        </View>
        <View style={styles.separator}></View>
        <View style={{ padding: 8 }}>
          <CardBlackText style={styles.title}>
            {I18nContext.getString("amenities")}
          </CardBlackText>
          <CardGreyText>{placeDetails.amenities}</CardGreyText>
        </View>
      </ScrollView>
      <View>
        {userData.role === "admin" && placeDetails.page === "pending" ? (
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
    fontWeight: "400",
    fontSize: 14,
  },
  footer: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    bottom: 0,
  },
});

export default connectStore(PlaceDetails);
