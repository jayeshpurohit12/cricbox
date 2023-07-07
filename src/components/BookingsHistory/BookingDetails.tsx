import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BookingCard from "./BookingCard";
import { useRoute } from "@react-navigation/native";

const BookingDetails = () => {
  const route = useRoute();

  const { bookingDetails } = route.params;

  return (
    <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 20 }}>
      <BookingCard bookingDetails={bookingDetails} />
      <View style={styles.paymentSummaryContainer}>
        <Text style={styles.paymentSummary}>Payment Summary</Text>

        <Text style={styles.bookingId}>
          Booking ID: {bookingDetails?.cf_payment_id}
        </Text>

        <View style={styles.flexContainer}>
          <Text style={styles.summaryTextHeading}>Amount to Pay</Text>
          <Text style={styles.summaryDetails}>
            &#8377;
            {bookingDetails?.userDetails?.totalPrice -
              bookingDetails?.payment_amount}
          </Text>
        </View>

        <View style={[styles.flexContainer, { marginTop: 15 }]}>
          <Text style={styles.summaryTextHeading}>Advanced Payment</Text>
          <Text style={[styles.summaryDetails]}>
            {bookingDetails?.payment_amount <
            bookingDetails?.userDetails?.totalPrice
              ? `₹${bookingDetails?.payment_amount}`
              : "-"}
          </Text>
        </View>

        <View style={[styles.flexContainer, { marginTop: 30 }]}>
          <Text style={styles.summaryTextHeading}>Total</Text>
          <Text style={[styles.summaryDetails]}>
            &#8377;{bookingDetails?.userDetails?.totalPrice}
          </Text>
        </View>
      </View>
      <Text
        style={{
          marginTop: 18,
          color: "green",
          fontWeight: "700",
          textAlign: "right",
          marginRight: 10,
        }}
      >
        PAID
      </Text>
    </View>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({
  paymentSummaryContainer: {
    borderWidth: 1,
    padding: 15,
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
    borderColor: "#E0E0E0",
  },
  paymentSummary: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 20,
    color: "#000000",
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryTextHeading: {
    fontWeight: "bold",
  },
  summaryDetails: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000000",
  },
  bookingId: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000000",
    marginBottom: 20,
    textAlign: "right",
  },
});
