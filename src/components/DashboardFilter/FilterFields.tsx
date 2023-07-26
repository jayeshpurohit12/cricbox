import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedEndTime,
  setSelectedPrice,
  setSelectedStartTime,
  setSelectedTurfSize,
} from "redux/actions/actions";

const FilterFields = ({ filterData, title, zIndex, uniqueKey }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (uniqueKey === "turfSize") {
      dispatch(setSelectedTurfSize(value));
    } else if (uniqueKey === "price") {
      dispatch(setSelectedPrice(value));
    } else if (uniqueKey === "startTime") {
      dispatch(setSelectedStartTime(value));
    } else {
      dispatch(setSelectedEndTime(value));
    }
  }, [dispatch, value, uniqueKey]);

  return (
    <View style={{ marginBottom: 20, zIndex: zIndex }}>
      <Text style={{ marginBottom: 10, fontWeight: "600" }}>{title}</Text>
      <Dropdown
        data={filterData}
        value={value}
        labelField="label"
        valueField="value"
        onChange={(item) => {
          setValue(item.value);
          setIsFocused(false);
        }}
        style={{
          borderColor: "lightblue",
          borderWidth: 1,
          borderRadius: 10,
          padding: 5,
          borderBottomWidth: isFocused ? 0 : 1,
          borderBottomLeftRadius: isFocused ? 0 : 10,
          borderBottomRightRadius: isFocused ? 0 : 10,
        }}
        showsVerticalScrollIndicator={false}
        maxHeight={150}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default FilterFields;
