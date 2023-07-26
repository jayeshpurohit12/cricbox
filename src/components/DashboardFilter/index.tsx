import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import FilterFields from "./FilterFields";
import { useSelector } from "react-redux";

const DashboardFilter = ({ isFilterVisible, setFilterVisible }) => {
  const turfSize = useSelector((state) => state.FilterReducer.turfSize);
  const turfTime = useSelector((state) => state.FilterReducer.startTime);

  const price = [
    { label: "Low to High", value: "low" },
    { label: "High to Low", value: "high" },
  ];

  const slots = [
    { label: "All", value: "All" },
    { label: "Morning", value: "Morning" },
    { label: "Afternoon", value: "Afternoon" },
    { label: "Evening", value: "Evening" },
    { label: "Night", value: "Night" },
  ];

  const timeSlots = [];

  for (let hour = 6; hour < 21; hour++) {
    const timeLabel = hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
    const formattedLabel = hour === 12 ? `12 PM` : timeLabel;

    timeSlots.push({ label: formattedLabel, value: formattedLabel });
    // timeSlots.push({
    //   label: `${formattedLabel}`,
    //   value: formattedLabel,
    // });
  }

  return (
    <Modal animationType="slide" transparent visible={isFilterVisible}>
      <View style={{ flex: 1, backgroundColor: "rgba(51, 51, 51, 0.5)" }}>
        <FlatList
          style={{
            backgroundColor: "#fff",
            width: "100%",
            height: "83%",
            position: "absolute",
            bottom: 0,
            padding: 15,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          nestedScrollEnabled
          scrollEnabled
          contentContainerStyle={{ paddingBottom: 70 }}
          showsVerticalScrollIndicator={false}
          data={[""]}
          renderItem={() => (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 25,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "600" }}>Filter</Text>
                <Entypo
                  name="cross"
                  size={27}
                  color="grey"
                  onPress={() => setFilterVisible(false)}
                />
              </View>

              <FilterFields
                filterData={turfSize}
                title="Turf Size"
                zIndex={100}
              />
              <FilterFields filterData={price} title="Price" zIndex={80} />
              <FilterFields filterData={slots} title="Slots" zIndex={60} />
              <FilterFields
                filterData={turfTime}
                title="Start Time"
                zIndex={50}
              />
              <FilterFields
                filterData={turfTime}
                title="End Time"
                zIndex={49}
              />

              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  padding: 15,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  Apply Filter
                </Text>
              </TouchableOpacity>
            </>
          )}
        />
      </View>
    </Modal>
  );
};

export default DashboardFilter;
