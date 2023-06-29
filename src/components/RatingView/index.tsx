import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const RatingView = () => {
  return (
    <View
      style={{
        backgroundColor: "#f59630",
        padding: 4,
        paddingLeft: 6,
        paddingRight: 6,
        flexDirection: "row",
        borderRadius: 4,
        width: "auto",
      }}
    >
      <Icon color="white" size={17} name="star-circle" />
      <Text style={{ color: "white", fontWeight: 500, marginLeft: 3 }}>
        4.3
      </Text>
    </View>
  );
};

export default RatingView;
