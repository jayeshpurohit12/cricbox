import React from "react";

import { View, ActivityIndicator } from "react-native";

interface IProps {}

const ActivityLoader: React.FC<IProps> = ({}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" color="#081021" />
    </View>
  );
};

export default ActivityLoader;
