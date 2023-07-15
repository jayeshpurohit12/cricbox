import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import UpcomingBooking from "components/BookingsHistory/UpcomingBooking";
import PreviousBooking from "components/BookingsHistory/PreviousBooking";

const renderScene = SceneMap({
  upcoming: UpcomingBooking,
  history: PreviousBooking,
});

const initialLayout = { width: Dimensions.get("window").width };

const Bookings = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "upcoming", title: "Upcoming" },
    { key: "history", title: "Previous History" },
  ]);
  const navigation = useNavigation();

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      activeColor="#1a1818"
      labelStyle={styles.tabLabel}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>My Bookings</Text>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#e0e0e0",
    shadowColor: "transparent",
    elevation: 0,
    marginHorizontal: 15,
    borderRadius: 10,
    height: 56,
  },
  indicator: {
    backgroundColor: "white",
    height: "85%",
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 4,
    width: "47.5%",
  },
  tabLabel: {
    fontWeight: "bold",
    color: "grey",
    top: 4,
  },
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default Bookings;
