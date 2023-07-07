import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react-native";
import successImage from "../../assets/lottie/success.json";
import failedImage from "../../assets/lottie/failed.json";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import moment from "moment";
import { firebase } from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { setSelectedSlotSession } from "redux/actions/actions";
import Config from "../../config";

const PaymentModal = ({
  isPaymentModalOpen,
  setIsPaymentModalOpen,
  paymentOrderId,
  setIsPaymentSuccess,
  userDetails,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [paymentDetails, setPaymentDetails] = useState([]);

  const transactionDateConversion = paymentDetails
    ? moment(paymentDetails[0]?.payment_completion_time).format(
        "DD MMM YYYY, hh:mm A",
      )
    : "";

  useEffect(() => {
    const paymentSuccessDetails = async () => {
      try {
        const res = await axios.get(
          `https://sandbox.cashfree.com/pg/orders/${paymentOrderId}/payments`,
          {
            headers: {
              "x-client-id": Config.CF_CLIENT_ID,
              "x-client-secret": Config.CF_CLIENT_SECRET,
              "x-api-version": Config.CF_API_VERSION,
            },
          },
        );

        setPaymentDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    paymentSuccessDetails();
    const intervalId = setInterval(() => {
      if (paymentDetails.length === 0) {
        paymentSuccessDetails();
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [paymentOrderId, paymentDetails.length, setIsPaymentSuccess]);

  //   useEffect(() => {
  //     const paymentSuccess = async () => {
  //       try {
  //         const bookingSlotsCollection = firebase
  //           .firestore()
  //           .collection("UserBooking");
  //         await bookingSlotsCollection.add({
  //           ...paymentDetails[0],
  //           userDetails,
  //         });

  //         const slotBooked = firebase
  //           .firestore()
  //           .collection("BookedSlots")
  //           .where("userId", "==", userDetails.userId);

  //         const bookedSlotQuerySnapshot = await slotBooked.get();

  //         bookedSlotQuerySnapshot.docs.forEach(async (doc) => {
  //           const isTurfBooked = doc.data().isBooked;
  //           const userId = doc.data().userId;

  //           if (paymentDetails[0]?.payment_status === "FAILED") {
  //             if (!isTurfBooked && userId === userDetails.userId) {
  //               await doc.ref.delete();
  //             }
  //           } else {
  //             await doc.ref.update({ isBooked: true });
  //           }
  //         });
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     paymentSuccess();
  //   }, []);

  const handleBookingDone = async () => {
    // const paymentSuccess = async () => {
    try {
      const bookingSlotsCollection = firebase
        .firestore()
        .collection("UserBooking");

      await bookingSlotsCollection.add({
        ...paymentDetails[0],
        userDetails,
      });

      const slotBooked = firebase
        .firestore()
        .collection("BookedSlots")
        .where("userId", "==", userDetails.userId);

      const bookedSlotQuerySnapshot = await slotBooked.get();

      bookedSlotQuerySnapshot.docs.forEach(async (doc) => {
        const isTurfBooked = doc.data().isBooked;
        const userId = doc.data().userId;

        if (paymentDetails[0]?.payment_status === "FAILED") {
          if (!isTurfBooked && userId === userDetails.userId) {
            await doc.ref.delete();
          }
        } else {
          await doc.ref.update({ isBooked: true });
        }
      });
    } catch (err) {
      console.log(err);
    }
    //   };
    navigation.navigate("Booking");
    setIsPaymentModalOpen(false);
  };

  if (paymentDetails.length) {
    setIsPaymentSuccess(true);
    dispatch(setSelectedSlotSession({}));
  }

  return (
    <Modal visible={isPaymentModalOpen} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.innerModalView}>
          {paymentDetails[0]?.payment_status === "FAILED" ? (
            <Lottie
              source={failedImage}
              style={{
                alignSelf: "center",
                marginVertical: 20,
                width: 70,
                height: 120,
              }}
              autoPlay
              loop
              autoSize
            />
          ) : (
            <Lottie
              source={successImage}
              style={{ alignSelf: "center", marginVertical: 20 }}
              autoPlay
              loop
              autoSize
            />
          )}

          <Text
            style={[
              styles.paymentSuccesssText,
              paymentDetails[0]?.payment_status === "FAILED" && {
                color: "red",
              },
            ]}
          >
            {paymentDetails[0]?.payment_status === "FAILED"
              ? "Payment Failed"
              : "Payment Successful"}
          </Text>
          <View style={styles.paymentDesc}>
            {paymentDetails[0]?.payment_status === "FAILED" ? (
              <>
                <Text>
                  Your payment of &#8377;{paymentDetails[0]?.order_amount} has
                  failed.
                </Text>
                <Text>Please try again.</Text>
              </>
            ) : (
              <>
                <Text>Your payment has been processed!</Text>
                <Text>Details of transaction are included below</Text>
              </>
            )}
          </View>

          {paymentDetails[0]?.payment_status === "SUCCESS" && (
            <>
              <View style={styles.flexContainer}>
                <Text style={styles.heading}>TOTAL AMOUNT PAID</Text>
                <Text style={styles.subData}>
                  ₹ {paymentDetails[0]?.order_amount}
                </Text>
              </View>
              <View style={styles.flexContainer}>
                <Text style={styles.heading}>PAID BY</Text>
                <Text style={styles.subData}>
                  {paymentDetails[0]?.payment_group}
                </Text>
              </View>
              <View style={styles.flexContainer}>
                <Text style={styles.heading}>TRANSACTION DATE</Text>
                <Text style={styles.subData}>{transactionDateConversion}</Text>
              </View>
            </>
          )}
          <TouchableOpacity
            style={[
              styles.doneButton,
              paymentDetails[0]?.payment_status === "FAILED" && {
                backgroundColor: "red",
                borderColor: "red",
              },
            ]}
            onPress={handleBookingDone}
          >
            <Text style={[styles.doneText]}>Done</Text>
          </TouchableOpacity>
          <View
            style={{ alignSelf: "center", position: "absolute", bottom: 10 }}
          >
            <Text style={{ fontSize: 14, color: "red" }}>
              Note: Please click on done to complete your payment!!
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(51, 51, 51, 0.6)",
    flex: 1,
  },
  innerModalView: {
    flex: 1,
    backgroundColor: "#fff",
    height: "63%",
    width: "100%",
    bottom: 0,
    position: "absolute",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  paymentSuccesssText: {
    marginTop: 25,
    textAlign: "center",
    fontSize: 25,
    color: "#31D0AA",
  },
  flexContainer: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#758393",
  },
  subData: {
    fontWeight: "bold",
    fontSize: 16,
    width: "50%",
    textAlign: "right",
  },
  paymentDesc: {
    alignSelf: "center",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  doneButton: {
    borderWidth: 1,
    position: "absolute",
    bottom: "8%",
    alignSelf: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 40,
    backgroundColor: "#31D0AA",
    borderColor: "#31D0AA",
  },
  doneText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
  },
});
