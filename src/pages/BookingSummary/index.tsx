import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { RadioButton } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import { CFPaymentGatewayService } from "react-native-cashfree-pg-sdk";
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from "cashfree-pg-api-contract";
import axios from "axios";
import PaymentModal from "components/SlotBooking/PaymentModal";
import { useDispatch } from "react-redux";
import { setSelectedSlotSession } from "redux/actions/actions";
import Config from "../../config";

const BoxDesign = ({ children }) => {
  return <View style={styles.box}>{children}</View>;
};

const PaymentOptions = ({ totalPrice, price, setPrice }) => {
  const [selectedOption, setSelectedOption] = useState("Full Payment");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === "Full Payment") {
      setPrice(totalPrice);
    } else {
      setPrice(totalPrice / 2);
    }
  };

  return (
    <BoxDesign>
      <Text style={styles.title}>Payment Options</Text>
      <TouchableOpacity
        style={[
          styles.optionContainer,
          selectedOption === "Full Payment" && styles.selectedOption,
        ]}
        onPress={() => handleOptionChange("Full Payment")}
      >
        <View
          style={[
            styles.radioButtonContainer,
            selectedOption === "Full Payment" && styles.selectedRadioButton,
          ]}
        >
          {selectedOption === "Full Payment" && (
            <View style={styles.radioButtonInnerCircle} />
          )}
        </View>
        <Text style={styles.optionText}>Full Payment {totalPrice}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionContainer,
          selectedOption === "Advance Payment" && styles.selectedOption,
        ]}
        onPress={() => handleOptionChange("Advance Payment")}
      >
        <View
          style={[
            styles.radioButtonContainer,
            selectedOption === "Advance Payment" && styles.selectedRadioButton,
          ]}
        >
          {selectedOption === "Advance Payment" && (
            <View style={styles.radioButtonInnerCircle} />
          )}
        </View>
        <Text style={styles.optionText}>Advance Payment {totalPrice / 2}</Text>
      </TouchableOpacity>
    </BoxDesign>
  );
};

const BookingSummary = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    totalPrice,
    selectedSlots,
    loggedInUser,
    date,
    userId,
    items: { location, lat, long, boxDimension },
  } = route?.params || {};

  const [price, setPrice] = useState(totalPrice);
  const [orderDetails, setOrderDetails] = useState({});
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [timeReduce, setTimeReduce] = useState(300000);
  const [formattedTime, setFormattedTime] = useState("5:00");
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const intervalIdRef = React.useRef(null);

  const fetchOrderSession = async () => {
    try {
      const orderData = await axios.post(
        "https://sandbox.cashfree.com/pg/orders",
        {
          order_amount: price,
          order_currency: "INR",
          customer_details: {
            customer_id: userId,
            customer_name: loggedInUser?.fullName,
            customer_email: loggedInUser?.email,
            customer_phone: loggedInUser?.phone,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-client-id": Config.CF_CLIENT_ID,
            "x-client-secret": Config.CF_CLIENT_SECRET,
            "x-api-version": Config.CF_API_VERSION,
            "x-request-id": Config.CF_DEVELOPER_NAME,
          },
        },
      );
      setOrderDetails(orderData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (price) fetchOrderSession();
  }, [price]);

  useEffect(() => {
    if (isPaymentSuccess) {
      setIsPaymentModalOpen(true);
    }
  }, [isPaymentSuccess]);

  const handlePayment = async () => {
    setIsPaymentLoading(true);
    try {
      const session = new CFSession(
        orderDetails.payment_session_id,
        orderDetails.order_id,
        CFEnvironment.SANDBOX,
      );
      await CFPaymentGatewayService.setCallback({
        onVerify(res) {
          if (res && Platform.OS === "ios") {
            setIsPaymentLoading(false);
            setIsPaymentSuccess(true);
            console.log("response....");
          }
        },
        onError(error) {
          console.log(error, "error");
        },
      });
      await CFPaymentGatewayService.doWebPayment(JSON.stringify(session));
    } catch (e: any) {
      console.log(e.message, "err");
    }
  };

  const parsedSlots = selectedSlots.map((slot) => {
    const [startTime, endTime] = slot.split(" - ");
    return { startTime, endTime };
  });

  const bookingDetails = [
    { key: "Date", value: moment(date, "YYYY-MM-DD").format("DD MMM YYYY") },
    { key: "Sport", value: "Cricket" },
    { key: "Start Time", value: parsedSlots[0]?.startTime },
    { key: "End Time", value: parsedSlots[selectedSlots.length - 1]?.endTime },
    { key: "Price", value: price },
  ];

  const userDetails = {
    userId: userId,
    fullName: loggedInUser?.fullName,
    turfLocation: location,
    lat: lat,
    long: long,
    turfDimensions: boxDimension,
    phoneNumber: loggedInUser?.phone,
    turfBookingDate: moment(date, "YYYY-MM-DD").format("DD MMM YYYY"),
    startTime: parsedSlots[0]?.startTime,
    endTime: parsedSlots[selectedSlots.length - 1]?.endTime,
    totalPrice: totalPrice,
  };
  useEffect(() => {
    intervalIdRef.current = setInterval(async () => {
      if (timeReduce > 0 && !isPaymentSuccess) {
        setTimeReduce((prevTime) => {
          const minutes = Math.floor(prevTime / 60000);
          const seconds = Math.floor((prevTime % 60000) / 1000);
          const newFormattedTime = `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;

          setFormattedTime(newFormattedTime);
          return prevTime - 1000;
        });
      }
    }, 1000);

    return () => clearInterval(intervalIdRef.current);
  }, [isPaymentSuccess]);

  useEffect(() => {
    const check = async () => {
      if (timeReduce < 0) {
        dispatch(setSelectedSlotSession({}));
        setTimeout(() => {
          navigation.goBack();
        }, 500);
        clearInterval(intervalIdRef.current);
      }
    };
    check();
  }, [timeReduce]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.appBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesomeIcon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Booking Summary</Text>
      </View>
      <BoxDesign>
        <Text style={styles.title}>Booking Summary</Text>
        {bookingDetails.map((detail) => (
          <View style={styles.detailsContainer} key={detail.key}>
            <Text style={styles.key}>{detail.key}:</Text>
            <Text style={styles.value}>{detail.value}</Text>
          </View>
        ))}
      </BoxDesign>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 20,
        }}
      >
        <View style={styles.timeContainer}>
          <Icon
            name="time-outline"
            size={24}
            color="black"
            style={styles.timeIcon}
          />
          <Text style={styles.timeText}>You have 5 min to Book the slots</Text>
        </View>
        <Text style={[styles.timeText, { color: "#8B8000" }]}>
          {formattedTime}
        </Text>
      </View>

      <PaymentOptions
        totalPrice={totalPrice}
        price={price}
        setPrice={setPrice}
      />

      <TouchableOpacity
        style={[styles.button, isPaymentLoading && { backgroundColor: "grey" }]}
        onPress={handlePayment}
        disabled={isPaymentLoading}
      >
        {isPaymentLoading ? (
          <ActivityIndicator
            size="large"
            style={{ alignSelf: "center" }}
            color="green"
          />
        ) : (
          <Text style={styles.buttonText}>Pay &#8377;{price}</Text>
        )}
      </TouchableOpacity>

      <PaymentModal
        isPaymentModalOpen={isPaymentModalOpen}
        setIsPaymentModalOpen={setIsPaymentModalOpen}
        paymentOrderId={orderDetails.order_id}
        setIsPaymentSuccess={setIsPaymentSuccess}
        userDetails={userDetails}
        setIsPaymentLoading={setIsPaymentLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 10,
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  box: {
    backgroundColor: "#dee0e3",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  key: {
    fontWeight: "bold",
    marginRight: 8,
  },
  value: {
    flex: 1,
    textAlign: "right",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    padding: 10,
  },
  selectedOption: {
    backgroundColor: "#5bc953",
    height: 40,
    borderRadius: 5,
    padding: 10,
  },
  radioButtonContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  selectedRadioButton: {
    backgroundColor: "green",
  },
  radioButtonInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  optionText: {
    marginLeft: 8,
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
    marginBottom: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",

    textAlign: "center",
    marginLeft: 15,
    padding: 10,
  },
  timeIcon: {
    marginRight: 8,
  },
  timeText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default BookingSummary;
