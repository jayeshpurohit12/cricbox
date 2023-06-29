import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import I18nContext from "translations/I18nContext";

interface IProps {
  text: string;
  width?: string;
  backgroundColor?: string;
  color?: string;
  onPress: () => void;
  loader: boolean;
  disabled: boolean;
}

const CustomButton: React.FC<IProps> = ({
  backgroundColor = "#0DBE94",
  color = "white",
  width = "100%",
  text,
  loader,
  disabled,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{ width, backgroundColor, padding: 16 }}
      onPress={onPress}
    >
      {loader ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text
          style={{
            color,
            ...styles.textBtn,
          }}
        >
          {I18nContext.getString(text)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textBtn: {
    textAlign: "center",
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
  },
});

export default CustomButton;
