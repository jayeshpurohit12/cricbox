import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import BookingCard from "./BookingCard";
import { firebase } from "@react-native-firebase/auth";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const UpcomingBooking = () => {
  const navigation = useNavigation();

  const [upcomingBookingData, setUpcomingBookingData] = useState([]);

  const currentUserId = firebase.auth().currentUser?.uid;

  const currentDate = moment().format("DD MMM YYYY");
  const currentTime = moment().format("hh:mm A");

  const getUpcomingBookingData = async () => {
    try {
      const querySnapshot1 = await firebase
        .firestore()
        .collection("UserBooking")
        .where("userDetails.userId", "==", currentUserId)
        .get();

      const querySnapshot2 = await firebase
        .firestore()
        .collection("UserBooking")
        .where("userDetails.turfBookingDate", ">=", currentDate)
        .get();

      const documents1 = querySnapshot1.docs;
      const documents2 = querySnapshot2.docs;

      const filteredDocuments = documents1.filter((doc1) => {
        const userId = doc1.data().userDetails.userId;
        return documents2.some(
          (doc2) => doc2.data().userDetails.userId === userId,
        );
      });

      const upcomingBookings = filteredDocuments
        .map((doc) => doc.data())
        .filter((booking) => {
          const bookingDate = booking?.userDetails?.turfBookingDate;
          const bookingTime = booking?.userDetails?.startTime;
          const paymentStatus = booking?.payment_status;

          return (
            (bookingDate > currentDate ||
              (bookingDate === currentDate &&
                !compareTime(bookingTime, currentTime))) &&
            paymentStatus === "SUCCESS"
          );
        });

      setUpcomingBookingData(upcomingBookings);
    } catch (error) {
      console.error("Error fetching upcoming bookings:", error);
    }
  };

  // Function to compare time values in "hh:mm a" format
  const compareTime = (time1, time2) => {
    const [hour1, minute1, period1] = time1.split(/:|\s/);
    const [hour2, minute2, period2] = time2.split(/:|\s/);

    if (period1 === period2) {
      const hourValue1 = parseInt(hour1);
      const hourValue2 = parseInt(hour2);
      const minuteValue1 = parseInt(minute1);
      const minuteValue2 = parseInt(minute2);

      if (hourValue1 === hourValue2) {
        return minuteValue1 < minuteValue2;
      }

      return hourValue1 < hourValue2;
    }

    return period1 === "AM" && period2 === "PM";
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getUpcomingBookingData();
    });
    return () => {
      navigation.removeListener("focus", () => {});
    };
  }, [navigation]);

  return (
    <View style={{ flex: 1, paddingHorizontal: 15, marginTop: 20 }}>
      <FlatList
        data={upcomingBookingData}
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
                No Upcoming Data Found
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default UpcomingBooking;
