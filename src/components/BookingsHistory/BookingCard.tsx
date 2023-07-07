import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const BookingCard = ({ bookingDetails }) => {
  const handleDirectionOpen = () => {
    const latLng = `${bookingDetails?.userDetails?.lat},${bookingDetails?.userDetails?.long}`;
    const query = `q=${latLng}`;
    const appleQuery = encodeURIComponent(`@${latLng}`);
    const url = Platform.select({
      ios: `maps://?q=${appleQuery}`,
      android: `geo:${bookingDetails?.userDetails?.lat},${bookingDetails?.userDetails?.long}?${query}`,
    });

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.name}>{bookingDetails?.userDetails?.fullName}</Text>
        <Text style={styles.location}>
          {bookingDetails?.userDetails?.turfLocation}
        </Text>
        <Text>Date & Time</Text>
        <Text
          style={styles.dateAndTime}
        >{`${bookingDetails?.userDetails?.turfBookingDate}, ${bookingDetails?.userDetails?.startTime} - ${bookingDetails?.userDetails?.endTime}`}</Text>

        <View style={styles.trufDetails}>
          <View>
            <Text style={styles.trufDetailsHeading}>Sports</Text>
            <Text style={styles.turfDimAndName}>Cricket</Text>
          </View>
          <View>
            <Text style={styles.trufDetailsHeading}>Turf Size</Text>
            <Text style={styles.turfDimAndName}>
              {bookingDetails?.userDetails?.turfDimensions}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#BDBDBD",
          flexDirection: "row",
          justifyContent: "space-between",
          height: 50,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          marginTop: 10,
        }}
      >
        <View
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            borderRightWidth: 1,
            borderRightColor: "#BDBDBD",
            flexDirection: "row",
          }}
        >
          <MaterialIcons name="call" size={20} color="green" />
          <Text style={styles.bottomText}>Call</Text>
        </View>
        <TouchableOpacity
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={handleDirectionOpen}
        >
          <Ionicons name="location" size={20} color="green" />
          <Text style={styles.bottomText}>Get Direction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#BDBDBD",
    marginBottom: 20,
  },
  cardContainer: {
    padding: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: "900",
    color: "#000000",
  },
  location: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "400",
    color: "#000000",
    marginBottom: 10,
  },
  trufDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
    marginTop: 10,
  },
  trufDetailsHeading: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  turfDimAndName: {
    color: "#000000",
    fontSize: 15.5,
    fontWeight: "800",
    textAlign: "center",
  },
  dateAndTime: {
    color: "#000000",
    fontWeight: "900",
  },
  bottomText: {
    marginLeft: 5,
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
  },
});
