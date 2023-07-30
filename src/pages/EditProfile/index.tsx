import {
  ActivityIndicator,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
import { Formik } from "formik";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";

export const Input = ({
  placeholder,
  inputName,
  isDisabled,
  value,
  isNumber,
  onChangeText,
  onError,
}) => {
  return (
    <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
      <Text
        style={{
          marginBottom: 20,
          fontSize: 12,
          color: "grey",
          fontWeight: "700",
        }}
      >
        {inputName}
      </Text>
      <TextInput
        placeholder={placeholder}
        style={{
          borderBottomWidth: 1,
          paddingBottom: 10,
          borderBottomColor: onError ? "red" : "grey",
          color: isDisabled ? "grey" : "black",
          fontWeight: "700",
          fontSize: 15,
        }}
        editable={!isDisabled}
        value={value}
        onChangeText={onChangeText}
        keyboardType={isNumber ? "number-pad" : "default"}
      />
      {onError && <Text style={{ color: "red", fontSize: 11 }}>{onError}</Text>}
    </View>
  );
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Please enter your first name")
    .min(2, "Name must have at least 2 characters"),
  lastName: Yup.string()
    .required("Please enter your last name")
    .min(2, "Name must have at least 2 characters"),
  phoneNumber: Yup.string()
    .required("Please enter phone number.")
    .min(10, "Please enter valid number")
    .max(10, "Please enter valid number"),
});

const EditProfile = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { userDetails } = route?.params;

  const [imageFiles, setImageFiles] = useState("");
  const [loader, setLoader] = useState(false);

  const openImagePicker = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      selectionLimit: 1,
      includeExif: true,
    }).then((images) => {
      setImageFiles(images);
    });
  };

  const handleUpdate = async (values) => {
    try {
      setLoader(true);
      const sourceUrl =
        Platform.OS === "ios" ? imageFiles?.sourceURL : imageFiles?.path;
      const fileName = sourceUrl?.substring(sourceUrl?.lastIndexOf("/") + 1);
      if (!imageFiles) {
        const docRef = firebase
          .firestore()
          .collection("Users")
          .doc(userDetails?.userId);

        const data = {
          fullName: `${values?.firstName} ${values?.lastName}`,
          phone: values?.phoneNumber,
        };

        docRef.update(data).then(() => {
          navigation.navigate("Profile");
          setLoader(false);
        });
      } else {
        const reference = storage().ref(imageFiles?.filename ?? fileName);
        const uploadUri =
          Platform.OS === "ios"
            ? imageFiles?.sourceURL?.replace("file://", "")
            : imageFiles?.path;
        await reference.putFile(uploadUri);
        const url = await reference.getDownloadURL();

        const docRef = firebase
          .firestore()
          .collection("Users")
          .doc(userDetails?.userId);

        const data = {
          fullName: `${values?.firstName} ${values?.lastName}`,
          phone: values?.phoneNumber,
          profileUrl: url,
        };

        docRef.update(data).then(() => {
          navigation.navigate("Profile");
          setLoader(false);
        });
      }
    } catch (error) {
      setLoader(false);
      console.log(error, "error...");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {userDetails?.profileUrl || imageFiles ? (
        <TouchableOpacity activeOpacity={1} onPress={openImagePicker}>
          <Image
            source={{
              uri:
                Platform.OS === "ios"
                  ? imageFiles?.sourceURL
                    ? imageFiles?.path
                    : userDetails?.profileUrl
                  : "",
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignSelf: "center",
              marginTop: 20,
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity activeOpacity={1} onPress={openImagePicker}>
          <Icon
            name="user-circle"
            size={100}
            color="#e0e0e0"
            style={{ marginTop: 20, alignSelf: "center" }}
            onPress={openImagePicker}
          />
        </TouchableOpacity>
      )}

      <View
        style={{
          borderWidth: 1,
          borderRadius: 30,
          padding: 5,
          position: "absolute",
          backgroundColor: "blue",
          borderColor: "blue",
          top: "12.5%",
          left: "55%",
        }}
      >
        <MaterialIcons
          name="edit"
          size={18}
          color="white"
          onPress={openImagePicker}
        />
      </View>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          firstName: userDetails?.fullName?.split(" ")[0],
          lastName: userDetails?.fullName?.split(" ")[1],
          phoneNumber: userDetails?.phone,
          email: userDetails?.email,
        }}
        onSubmit={(values) => handleUpdate(values)}
      >
        {({ setFieldValue, setFieldTouched, values, errors, handleSubmit }) => {
          return (
            <View style={{ flex: 1 }}>
              <Input
                placeholder="Enter your First Name"
                inputName="First Name"
                value={values?.firstName}
                onChangeText={(text) => {
                  setFieldValue("firstName", text);
                  setFieldTouched("firstName", true);
                }}
                onError={errors?.firstName}
              />
              <Input
                placeholder="Enter your Last Name"
                inputName="Last Name"
                value={values?.lastName}
                onChangeText={(text) => {
                  setFieldValue("lastName", text);
                  setFieldTouched("lastName", true);
                }}
                onError={errors?.lastName}
              />
              <Input
                placeholder="Enter your Phone Number"
                inputName="Phone"
                value={values?.phoneNumber}
                isNumber
                isDisabled
                onChangeText={(text) => {
                  setFieldValue("phoneNumber", text);
                  setFieldTouched("phoneNumber", true);
                }}
                onError={errors?.phoneNumber}
              />
              <Input
                placeholder="Enter your Name"
                inputName="E-mail"
                isDisabled
                value={values?.email}
              />

              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 20,
                  backgroundColor: loader ? "grey" : "green",
                  width: "90%",
                  marginHorizontal: 15,
                  padding: 15,
                  borderRadius: 10,
                }}
                disabled={loader}
                onPress={handleSubmit}
              >
                {loader ? (
                  <ActivityIndicator
                    size="small"
                    style={{ alignSelf: "center" }}
                    color="green"
                  />
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontWeight: "600",
                    }}
                  >
                    Update
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default EditProfile;
