import { firebase } from "@react-native-firebase/auth";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import connectStore from "redux/connect";
import { NavigationProps } from "styles/common.interface";
import BookingCard from "./BookingCard";
import { useNavigation } from "@react-navigation/native";

interface IProps extends NavigationProps {}

const PreviousBooking: React.FC<IProps> = () => {
  const navigation = useNavigation();

  const [previousBooking, setPreviousBooking] = useState([]);

  const currentDate = moment().format("YYYY-MM-DD");
  const currentTime = moment().format("hh:mm A");

  const currentUserId = firebase.auth().currentUser?.uid;

  const getPreviousBookingData = async () => {
    try {
      const querySnapshot1 = await firebase
        .firestore()
        .collection("UserBooking")
        .where("userDetails.userId", "==", currentUserId)
        .get();

      const querySnapshot2 = await firebase
        .firestore()
        .collection("UserBooking")
        .where("userDetails.turfBookingDate", "<=", currentDate)
        .get();

      const documents1 = querySnapshot1.docs;
      const documents2 = querySnapshot2.docs;

      const filteredDocuments = documents1.filter((doc1) => {
        const userId = doc1.data().userDetails.userId;
        return documents2.some(
          (doc2) => doc2.data().userDetails.userId === userId,
        );
      });

      const previousBookings = filteredDocuments
        .map((doc) => doc.data())
        .filter((booking) => {
          const bookingDate = booking?.userDetails?.turfBookingDate;
          const bookingTime = booking?.userDetails?.startTime;

          if (bookingDate < currentDate) {
            return true;
          } else if (
            bookingDate === currentDate &&
            compareTime(bookingTime, currentTime)
          ) {
            return true;
          }

          return false;
        });

      setPreviousBooking(previousBookings);
    } catch (error) {
      console.error("Error fetching upcoming bookings:", error);
    }
  };

  const compareTime = (time1, time2) => {
    const [hour1, minute1, period1] = time1.split(/:| /);
    const [hour2, minute2, period2] = time2.split(/:| /);

    if (period1 === "PM" && period2 === "AM") {
      return false;
    } else if (period1 === "AM" && period2 === "PM") {
      return true;
    } else {
      const hourValue1 = parseInt(hour1);
      const hourValue2 = parseInt(hour2);
      const minuteValue1 = parseInt(minute1);
      const minuteValue2 = parseInt(minute2);

      if (hourValue1 < hourValue2) {
        return true;
      } else if (hourValue1 > hourValue2) {
        return false;
      } else {
        return minuteValue1 < minuteValue2;
      }
    }
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getPreviousBookingData();
    });
    return () => {
      navigation.removeListener("focus", () => {});
    };
  }, [navigation]);

  return (
    <View style={{ flex: 1, paddingHorizontal: 15, marginTop: 20 }}>
      <FlatList
        data={previousBooking}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Booking Details", {
                bookingDetails: item,
              })
            }
          >
            <BookingCard bookingDetails={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item?.order_id}
        ListEmptyComponent={() => {
          return (
            <View style={{ alignSelf: "center" }}>
              <Text style={{ fontSize: 17, color: "#000" }}>
                No Previous Data Found
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default connectStore(PreviousBooking);
