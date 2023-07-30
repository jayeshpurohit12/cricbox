import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { setFilterTurfSize } from "redux/actions/actions";
import { useDispatch } from "react-redux";

const Card = ({
  venueDetails,
  setTurfSize,
  turfSize,
  turfTime,
  setTurfTime,
}) => {
  const generateHourIntervals = (startTime, endTime) => {
    const intervals = [];
    const startParts = startTime.match(/(\d+):(\d+) ([ap]m)/i);
    const endParts = endTime.match(/(\d+):(\d+) ([ap]m)/i);

    if (!startParts || !endParts) {
      console.error("Invalid time format. Use 'hh:mm am/pm' format.");
      return intervals;
    }

    const start = new Date();
    start.setHours(
      parseInt(startParts[1]) + (startParts[3].toLowerCase() === "pm" ? 12 : 0),
      parseInt(startParts[2]),
    );

    const end = new Date();
    end.setHours(
      parseInt(endParts[1]) + (endParts[3].toLowerCase() === "pm" ? 12 : 0),
      parseInt(endParts[2]),
    );

    while (start <= end) {
      const formattedTime = start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      intervals.push({ label: formattedTime, value: formattedTime });
      start.setHours(start.getHours() + 1);
    }
    setTurfTime(intervals);
  };

  useEffect(() => {
    if (
      venueDetails?.boxDimension &&
      !turfSize?.label?.includes(venueDetails?.boxDimension)
    ) {
      turfSize.push({
        label: venueDetails?.boxDimension,
        value: venueDetails?.boxDimension,
      });
      const uniqueNamesArray = turfSize.reduce((accumulator, currentValue) => {
        const isLabelInAccumulator = accumulator.some(
          (item) => item?.label === currentValue?.label,
        );
        if (!isLabelInAccumulator) {
          accumulator.push(currentValue);
        }
        return accumulator;
      }, []);

      setTurfSize(uniqueNamesArray);
    }
  }, []);

  useEffect(() => {
    generateHourIntervals(venueDetails?.startTime, venueDetails?.endTime);
  }, []);

  return (
    <View style={{ marginBottom: 25, flexDirection: "row" }}>
      <Image
        source={{ uri: venueDetails?.images[0] }}
        style={{ width: 170, height: 120, borderRadius: 10 }}
      />
      <View style={{ marginLeft: 15, width: "48%" }}>
        <Text
          style={{ fontSize: 16, fontWeight: "600", marginBottom: 5 }}
          numberOfLines={2}
        >
          {venueDetails?.name}
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "600", marginBottom: 5 }}>
          &#8377;{venueDetails?.eveningPrice}/ hr
        </Text>
        <Text numberOfLines={1}>{venueDetails?.description}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
            position: "relative",
            justifyContent: "space-between",
          }}
        >
          <MaterialIcons name="sports-cricket" size={22} color="grey" />
          <View
            style={{
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: "green",
              borderColor: "green",
            }}
          >
            <Text
              style={{
                padding: 5,
                color: "#fff",
                fontWeight: "600",
              }}
            >
              Book
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
