import React, { useState } from "react";
import connectStore from "../../../redux/connect";
import {
  AppScrollView,
  SpaceContainer,
  AuthTitle,
  ErrorMessage,
} from "../../../styles/common.style";
import { NavigationProps } from "../../../styles/common.interface";
import HeaderBar from "../../../components/HeaderBar";
import I18nContext from "../../../translations/I18nContext";
import CustomInput from "../../../components/CustomInput";
import CustomGreenButton from "../../../components/CustomGreenButton";
import auth from "@react-native-firebase/auth";
import BottomText from "../../../components/BottomText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";
import { ILogin } from "../../../models/Login";
import commonService from "service/commonService";
import { NavigationProp, useNavigation } from "@react-navigation/native";
interface IProps extends NavigationProps {}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter email.")
    .email("Please enter correct email."),
  password: Yup.string()
    .required("Please enter password.")
    .min(6, "Password must have at least 6 characters"),
});

const SignIn: React.FC<IProps> = ({ navigation }) => {
  const navigation2 = useNavigation<NavigationProp<any>>();
  const [showLoader, setLoader] = useState(false);
  const submit = async (values: ILogin, resetForm: () => void) => {
    // navigation.navigate("ForgotUsername");
    setLoader(true);
    await auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((userData) => {
        setLoader(false);
        if (userData.user.emailVerified) {
          console.log("userData", userData.user);

          resetForm();
          setTimeout(() => {
            // navigation2.navigate("TabNavigation", { screen: "VerifyCode" });
            navigation.navigate("TabNavigation");
          }, 700);
        } else {
          userData.user.sendEmailVerification();
          commonService.showToast("error", "email_not_verified");
        }
      })
      .catch((error) => {
        setLoader(false);
        if (error.code === "auth/invalid-email") {
          commonService.showToast("error", "invalid_email");
        } else if (error.code === "auth/user-not-found") {
          commonService.showToast("error", "user_not_found");
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
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { resetForm }) => submit(values, resetForm)}
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
                <>
                  <SpaceContainer marginTop={1} marginBottom={5}>
                    <AuthTitle>{I18nContext.getString("sign_in")}</AuthTitle>
                  </SpaceContainer>
                  <CustomInput
                    bottomLabel={""}
                    onPress={() => navigation.navigate("ForgotUsername")}
                    label={"email"}
                    onChangeText={(value) => {
                      setFieldTouched("email", true);
                      setFieldValue("email", value);
                    }}
                    error={
                      <>
                        {touched.email && errors.email ? (
                          <ErrorMessage>{errors.email}</ErrorMessage>
                        ) : null}
                      </>
                    }
                    onBlur={() => handleBlur("email")}
                    placeholder={"circbox@gmail.com"}
                  />

                  <CustomInput
                    bottomLabel={"forgot_password"}
                    label={"password"}
                    value={values.password}
                    onChangeText={(value) => {
                      setFieldTouched("password", true);
                      setFieldValue("password", value);
                    }}
                    onBlur={() => handleBlur("password")}
                    onPress={() => navigation.navigate("ForgotPassword")}
                    secureTextEntry={true}
                    error={
                      <>
                        {touched.password && errors.password ? (
                          <ErrorMessage>{errors.password}</ErrorMessage>
                        ) : null}
                      </>
                    }
                    placeholder={"123456"}
                  />
                  <CustomGreenButton
                    showLoader={showLoader}
                    text={"sign_in"}
                    onPress={handleSubmit}
                  />
                  <SpaceContainer marginTop={6} marginBottom={12}>
                    <BottomText
                      firstText={"new_user"}
                      secondText={"sign_up"}
                      onPress={() => navigation.navigate("SignUp")}
                    />
                  </SpaceContainer>
                </>
              );
            }}
          </Formik>
        </AppScrollView>
      </KeyboardAwareScrollView>
    </React.Fragment>
  );
};

export default connectStore(SignIn);
