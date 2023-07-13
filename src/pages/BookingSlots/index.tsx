import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  BackHandler,
} from "react-native";
import Calendar from "../../components/SlotBooking/Calendar";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import { firebase } from "@react-native-firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSlotSession } from "redux/actions/actions";
import isEmpty from "lodash/isEmpty";

const TimeSlotItem = ({
  slot,
  isSelected,
  onPress,
  isDisabled,
  selectedDate,
}) => {
  const currentDate = moment().format("YYYY-MM-DD");
  const currentTime = moment();

  const parseSlot = slot.split(" - ");
  const startTime = moment(parseSlot[0], "h:mm A");
  const endTime = moment(parseSlot[1], "h:mm A");

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View style={styles.boxContainer}>
        <Text style={styles.slotText}>{slot}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.timeSlot,
          isSelected && styles.activeSlot,
          (isDisabled?.slot === slot ||
            (currentDate === selectedDate &&
              (currentTime >= startTime || currentTime >= endTime))) && {
            backgroundColor: "grey",
          },
        ]}
        onPress={onPress}
        disabled={
          isDisabled?.slot === slot ||
          (currentDate === selectedDate &&
            (currentTime >= startTime || currentTime >= endTime))
        }
      >
        {isSelected && (
          <Text
            style={{
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Selected
          </Text>
        )}
        {(isDisabled?.slot === slot ||
          (currentDate === selectedDate &&
            (currentTime >= startTime || currentTime >= endTime))) && (
          <Text style={{ textAlign: "center", fontWeight: "500" }}>
            Unavailable
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const BookingSlots = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const sessionStored = useSelector((state) => state.SlotReducer.slotSession);

  let updateTurfAndSlot = [],
    timeoutId = null;

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();
  const [soltAvail, setSlotAvail] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD"),
  );

  const currentUserUID = firebase.auth()?.currentUser?.uid;
  const usersCollectionRef = firebase.firestore().collection("Users");
  const {
    startTime,
    endTime,
    midNightPrice,
    placeId,
    name,
    numberOfTurf,
    eveningPrice,
    morningPrice,
    nightPrice,
    weekendEveningPrice,
    weekendMidNightPrice,
    weekendMorningPrice,
    weekendNightPrice,
  } = route?.params || {};

  const slotPrices = [
    {
      startTime: moment("1:12 AM", "h:mm A"),
      endTime: moment("11:59 AM", "h:mm A"),
      price: morningPrice,
    },
    {
      startTime: moment("12:00 PM", "h:mm A"),
      endTime: moment("4:59 PM", "h:mm A"),
      price: eveningPrice,
    },
    {
      startTime: moment("5:00 PM", "h:mm A"),
      endTime: moment("11:59 PM", "h:mm A"),
      price: nightPrice,
    },
    {
      startTime: moment("1:12 AM", "h:mm A"),
      endTime: moment("11:59 AM", "h:mm A"),
      price: weekendMorningPrice,
    },
    {
      startTime: moment("12:00 PM", "h:mm A"),
      endTime: moment("4:59 PM", "h:mm A"),
      price: weekendMidNightPrice,
    },
    {
      startTime: moment("5:00 PM", "h:mm A"),
      endTime: moment("7:59 PM", "h:mm A"),
      price: weekendEveningPrice,
    },
    {
      startTime: moment("8:00 PM", "h:mm A"),
      endTime: moment("11:59 PM", "h:mm A"),
      price: weekendNightPrice,
    },
  ];

  const isDisabled = soltAvail.find(
    (item) =>
      timeSlots.includes(item.slot) && item.numberOfTurfAvail === numberOfTurf,
  );

  const format = "hh:mm A";

  const calculateDuration = (start, end) =>
    moment
      ?.duration(moment(end, format)?.diff(moment(start, format)))
      ?.asHours();

  const calculateSlots = () => {
    const duration = calculateDuration(startTime, endTime);
    let updatedTimeSlots = [];
    let currTime = startTime;
    for (let index = 1; index < duration; index++) {
      const format = "h:mm A";
      const addedTime = moment(currTime, format)
        ?.add(1, "hour")
        ?.format(format);
      const currentSlot = currTime + " - " + addedTime;
      updatedTimeSlots.push(currentSlot);
      currTime = addedTime;
    }
    setTimeSlots(updatedTimeSlots);
  };

  useEffect(() => {
    calculateSlots();
  }, []);

  useEffect(() => {
    usersCollectionRef
      .doc(currentUserUID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const user = doc.data();
          setLoggedInUser(user);
        } else {
          console.log("User does not exist");
        }
      })
      .catch((error) => {
        console.log("Error getting user:", error);
      });
  }, []);

  const addBookingSlot = async (slotData) => {
    try {
      const bookingSlotsCollection = firebase
        .firestore()
        .collection("BookedSlots");

      await bookingSlotsCollection.add(slotData);
    } catch (error) {
      console.error("Error adding booking slot:", error);
    }
  };

  const selectDeselectSlot = ({ selectedSlots, slot, setSelectedSlots }) => {
    if (selectedSlots?.includes(slot)) {
      setSelectedSlots(selectedSlots?.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleSlotSelection = (slot) => {
    const index = timeSlots.indexOf(slot);
    const slotExist = selectedSlots?.includes(slot);
    const prevSlotExists = selectedSlots?.includes(timeSlots[index - 1]);
    const nextSlotExists = selectedSlots?.includes(timeSlots[index + 1]);
    if (!slotExist) {
      if (selectedSlots.length === 0 || prevSlotExists || nextSlotExists) {
        selectDeselectSlot({ selectedSlots, slot, setSelectedSlots });
      }
    } else {
      if (!prevSlotExists || !nextSlotExists)
        selectDeselectSlot({ selectedSlots, slot, setSelectedSlots });
    }
  };

  selectedSlots?.map((slot) => {
    updateTurfAndSlot.push({
      slot: slot,
      numberOfTurfAvail: 1,
    });
  });

  const saveSlots = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    addBookingSlot({
      placeId: placeId,
      name: name,
      slot: updateTurfAndSlot,
      date: selectedDate,
      userId: currentUserUID,
      isBooked: false,
    });

    dispatch(
      setSelectedSlotSession({
        placeId: placeId,
        name: name,
        slot: updateTurfAndSlot,
        date: selectedDate,
        userId: currentUserUID,
      }),
    );

    timeoutId = setTimeout(() => {
      dispatch(setSelectedSlotSession({}));
    }, 5 * 60 * 1000);

    navigation.navigate("BookingSummary", {
      selectedSlots: selectedSlots,
      items: route?.params,
      totalPrice: calculatePrice(),
      date: selectedDate,
      loggedInUser: loggedInUser,
      startTime,
      endTime,
      userId: currentUserUID,
    });
  };

  const calculatePrice = () => {
    let totalPrice = 0;

    selectedSlots.forEach((slot) => {
      const start = moment(slot.split(" - ")[0], "h:mm A");
      const isWeekend = start.day() === 6 || start.day() === 0;

      const matchingSlotPrice = slotPrices.find((slotPrice) => {
        return (
          start.isBetween(
            slotPrice.startTime,
            slotPrice.endTime,
            undefined,
            "[)",
          ) &&
          (isWeekend
            ? (start.isBetween(
                moment("1:12 AM", "h:mm A"),
                moment("11:59 AM", "h:mm A"),
              ) &&
                slotPrice.price === weekendMorningPrice) ||
              (start.isBetween(
                moment("12:00 PM", "h:mm A"),
                moment("4:59 PM", "h:mm A"),
              ) &&
                slotPrice.price === weekendMidNightPrice) ||
              (start.isBetween(
                moment("5:00 PM", "h:mm A"),
                moment("7:59 PM", "h:mm A"),
              ) &&
                slotPrice.price === weekendEveningPrice) ||
              (start.isBetween(
                moment("8:00 PM", "h:mm A"),
                moment("11:59 PM", "h:mm A"),
              ) &&
                slotPrice.price === weekendNightPrice)
            : true)
        );
      });

      if (matchingSlotPrice) {
        totalPrice += matchingSlotPrice.price;
      }
    });
    return totalPrice;
  };

  const isSlotSelected = (slot) => selectedSlots?.includes(slot);

  const handleGoBack = async () => {
    try {
      dispatch(setSelectedSlotSession({}));
      navigation.goBack();
      const collectionRef = firebase
        .firestore()
        .collection("BookedSlots")
        .where("userId", "==", currentUserUID);

      const querySnapshot = await collectionRef.get();

      querySnapshot.docs.forEach((doc) => {
        if (!doc.data().isBooked) {
          doc.ref.delete();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAndroidBackButton = async () => {
    try {
      dispatch(setSelectedSlotSession({}));
      navigation.goBack();
      const collectionRef = firebase
        .firestore()
        .collection("BookedSlots")
        .where("userId", "==", currentUserUID);

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
    BackHandler.addEventListener("hardwareBackPress", handleAndroidBackButton);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleAndroidBackButton,
      );
    };
  }, []);

  useEffect(() => {
    const isSlotAvailable = async () => {
      try {
        const bookedSlotCollectionRef = firebase
          .firestore()
          .collection("BookedSlots");

        const querySnapshot = await bookedSlotCollectionRef
          .where("date", "==", selectedDate)
          .get();

        const bookedSlots = querySnapshot.docs.reduce((result, doc) => {
          const slotData = doc.data().slot;
          slotData.forEach((slot) => {
            const existingSlot = result.find((item) => item.slot === slot.slot);
            if (existingSlot) {
              existingSlot.numberOfTurfAvail += slot.numberOfTurfAvail;
            } else {
              result.push(slot);
            }
          });
          return result;
        }, []);
        setSlotAvail(bookedSlots);
      } catch (error) {
        console.log(error);
      }
    };
    setSlotAvail([]);
    isSlotAvailable();
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      {/* <View style={styles.appBar}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <FontAwesomeIcon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Booking Summary</Text>
      </View> */}
      <Calendar
        onSelectDate={setSelectedDate}
        selected={selectedDate}
        setSelectedSlots={setSelectedSlots}
      />

      <Text style={styles.title}>Select Timeslots</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: "25%" }}
        style={{ marginBottom: "23%" }}
      >
        {timeSlots.map((slot) => (
          <TimeSlotItem
            key={slot}
            slot={slot}
            isSelected={isSlotSelected(slot)}
            onPress={() => handleSlotSelection(slot)}
            isDisabled={isDisabled}
            selectedDate={selectedDate}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.button,
          isEmpty(selectedSlots) && { backgroundColor: "grey" },
        ]}
        onPress={saveSlots}
        disabled={isEmpty(selectedSlots)}
      >
        <Text style={styles.buttonText}>Next</Text>
        <Text style={styles.priceText}>Total Price: {calculatePrice()}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 13,
    marginLeft: 16,
  },
  timeSlot: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ccc",
    width: "60%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  activeSlot: {
    backgroundColor: "#32a852",
  },
  boxContainer: {
    backgroundColor: "#e0e0e0",
    padding: 2,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  slotText: {
    color: "#333",
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
    fontSize: 18,
    color: "#fff",
  },
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 16,
    elevation: 2,
    marginBottom: 5,
  },
  backButton: {
    marginRight: 10,
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 20,
  },
});

export default BookingSlots;
