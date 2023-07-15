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

interface IProps extends NavigationProps {}
const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Please enter your full name")
    .min(2, "Full Name must have at least 2 characters"),
  email: Yup.string()
    .required("Please enter email.")
    .email("Please enter correct email."),
  phone: Yup.string()
    .required("Please enter phone number.")
    .min(10, "Please enter valid number")
    .max(10, "Please enter valid number"),
  password: Yup.string()
    .required("Please enter password.")
    .min(6, "Password must have at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Please enter confirm password")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});

const SignIn: React.FC<IProps> = ({ navigation }) => {
  const [pushTokenData, setPushTokenData] = useState({} as IRegistration);
  const [showLoader, setLoader] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  useEffect(() => {
    checkMessagingPermission();
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
    setLoader(true);
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((userData) => {
        userData.user.sendEmailVerification();
        firestore()
          .collection("Users")
          .doc(userData.user.uid)
          .set({
            ...pushTokenData,
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            role: toggleCheckBox ? "box-admin" : "normal",
            userId: userData.user.uid,
            dateISO: moment().toISOString(),
            milliseconds: moment().valueOf(),
          })
          .then(() => {
            commonService.showToast("success", "user_crated");
            setLoader(false);
            resetForm();
            navigation.navigate("SignIn");
          });
      })
      .catch((error) => {
        setLoader(false);
        if (error.code === "auth/email-already-in-use") {
          commonService.showToast("error", "email_in_use");
        } else if (error.code === "auth/invalid-email") {
          commonService.showToast("error", "invalid_email");
        } else {
          commonService.showToast("error", "default_error");
        }
      });
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
                phone: "",
                password: "",
                confirmPassword: "",
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
                    <AuthTitle>{I18nContext.getString("sign_up")}</AuthTitle>
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
                  <CustomInput
                    label={"phone_number"}
                    value={values.phone}
                    onChangeText={(value) => {
                      setFieldTouched("phone", true);
                      setFieldValue("phone", value);
                    }}
                    error={
                      <>
                        {touched.phone && errors.phone ? (
                          <ErrorMessage>{errors.phone}</ErrorMessage>
                        ) : null}
                      </>
                    }
                    onBlur={() => handleBlur("phone")}
                    placeholder={"85734256745"}
                  />
                  <CustomInput
                    label={"password"}
                    secureTextEntry={true}
                    placeholder={"123456"}
                    value={values.password}
                    error={
                      <>
                        {touched.password && errors.password ? (
                          <ErrorMessage>{errors.password}</ErrorMessage>
                        ) : null}
                      </>
                    }
                    onChangeText={(value) => {
                      setFieldTouched("password", true);
                      setFieldValue("password", value);
                    }}
                    onBlur={() => handleBlur("password")}
                  />
                  <CustomInput
                    containerBtm={2}
                    label={"confirm_password"}
                    secureTextEntry={true}
                    value={values.confirmPassword}
                    onChangeText={(value) => {
                      setFieldTouched("confirmPassword", true);
                      setFieldValue("confirmPassword", value);
                    }}
                    error={
                      <>
                        {touched.confirmPassword && errors.confirmPassword ? (
                          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                        ) : null}
                      </>
                    }
                    onBlur={() => handleBlur("confirmPassword")}
                    placeholder={"123456"}
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
                    text={"next"}
                    onPress={handleSubmit}
                  />

                  <SpaceContainer marginTop={6} marginBottom={12}>
                    <BottomText
                      firstText={"have_an_account"}
                      secondText={"sign_in"}
                      onPress={() => navigation.navigate("SignIn")}
                    />
                  </SpaceContainer>
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
