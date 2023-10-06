import React, { useState, useEffect } from "react";
import connectStore from "../../../redux/connect";
import {
  AppScrollView,
  SpaceContainer,
  AuthTitle,
  ErrorMessage,
  CardGreyText,
} from "../../../styles/common.style";
import { NavigationProps } from "../../../styles/common.interface";
import HeaderBar from "../../../components/HeaderBar";
import I18nContext from "../../../translations/I18nContext";
import CustomInput from "../../../components/CustomInput";
import CustomGreenButton from "../../../components/CustomGreenButton";
import BottomText from "../../../components/BottomText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import auth from "@react-native-firebase/auth";
import * as Yup from "yup";
import messaging from "@react-native-firebase/messaging";
import { IRegistration } from "models/Registration";
import commonService from "service/commonService";
import DeviceInfo from "react-native-device-info";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import CheckBox from "@react-native-community/checkbox";
import { BoxLabel } from "./style";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

interface IProps extends NavigationProps {}
const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Please enter your full name")
    .min(2, "Full Name must have at least 2 characters"),
  email: Yup.string()
    .required("Please enter email.")
    .email("Please enter correct email."),
});

const SignIn: React.FC<IProps> = ({ navigation }) => {
  const route = useRoute();
  const [pushTokenData, setPushTokenData] = useState({} as IRegistration);
  const [showLoader, setLoader] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const data = useSelector((state) => state.userReducer.userDetails);
  function onAuthStateChanged(user: any) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }
  useEffect(() => {
    checkMessagingPermission();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const checkMessagingPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
      const fcmToken = await messaging().getToken();
      setPushTokenData({
        token: fcmToken,
        device_id: DeviceInfo.getDeviceId(),
      } as IRegistration);
    }
  };

  const submit = async (values: IRegistration, resetForm: () => void) => {
    try {
      setLoader(true);
      await firestore()
        .collection("Users")
        .doc(data.user.uid)
        .set({
          ...pushTokenData,
          fullName: values.fullName,
          email: values.email,
          phone: data.user.phoneNumber.substring(3, 13),
          role: toggleCheckBox ? "box-admin" : "normal",
          userId: data.user.uid,
          dateISO: moment().toISOString(),
          milliseconds: moment().valueOf(),
        });
      navigation.navigate("TabNavigation");
      setLoader(false);
    } catch (error) {
      console.log(error, "error...");
    }
  };
  return (
    <React.Fragment>
      <HeaderBar dummyLeft={true} dummyRight={true} showBack={false} />
      <KeyboardAwareScrollView>
        <AppScrollView>
          <Formik
            validationSchema={validationSchema}
            initialValues={
              {
                fullName: "",
                email: "",
              } as IRegistration
            }
            onSubmit={(values: IRegistration, { resetForm }) =>
              submit(values, resetForm)
            }
          >
            {({
              setFieldValue,
              setFieldTouched,
              handleBlur,
              values,
              errors,
              touched,
              handleSubmit,
            }) => {
              return (
                <React.Fragment>
                  <SpaceContainer marginTop={1} marginBottom={5}>
                    <AuthTitle>
                      {I18nContext.getString("user_details")}
                    </AuthTitle>
                  </SpaceContainer>
                  <CustomInput
                    onChangeText={(value) => {
                      setFieldTouched("fullName", true);
                      setFieldValue("fullName", value);
                    }}
                    error={
                      <>
                        {touched.fullName && errors.fullName ? (
                          <ErrorMessage>{errors.fullName}</ErrorMessage>
                        ) : null}
                      </>
                    }
                    value={values.fullName}
                    onBlur={() => handleBlur("fullName")}
                    label={"fullName"}
                    placeholder={"Jacob"}
                  />
                  <CustomInput
                    label={"email"}
                    value={values.email}
                    placeholder={"cricbox@gmail.com"}
                    error={
                      <>
                        {touched.email && errors.email ? (
                          <ErrorMessage>{errors.email}</ErrorMessage>
                        ) : null}
                      </>
                    }
                    onChangeText={(value) => {
                      setFieldTouched("email", true);
                      setFieldValue("email", value);
                    }}
                    onBlur={() => handleBlur("email")}
                  />

                  <View style={{ flexDirection: "row", marginBottom: 8 }}>
                    <CheckBox
                      style={{
                        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                      }}
                      tintColors={{ true: "#0DBE94", false: "#808694" }}
                      disabled={false}
                      tintColor="#808694"
                      onTintColor="#0DBE94"
                      onCheckColor="#0DBE94"
                      value={toggleCheckBox}
                      onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                    <BoxLabel
                      style={{ marginTop: "auto", marginBottom: "auto" }}
                      marginLeft={0}
                    >
                      {I18nContext.getString("box_owner")}
                    </BoxLabel>
                  </View>
                  <CustomGreenButton
                    showLoader={showLoader}
                    text={"done"}
                    onPress={handleSubmit}
                  />
                </React.Fragment>
              );
            }}
          </Formik>
        </AppScrollView>
      </KeyboardAwareScrollView>
    </React.Fragment>
  );
};

export default connectStore(SignIn);
