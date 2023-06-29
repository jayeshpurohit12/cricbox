import React, { useState } from "react";
import connectStore from "../../../redux/connect";
import {
  AppScrollView,
  SpaceContainer,
  AuthTitle,
  RegularText,
  SubtitleContainer,
  ErrorMessage,
} from "../../../styles/common.style";
import { NavigationProps } from "../../../styles/common.interface";
import HeaderBar from "../../../components/HeaderBar";
import I18nContext from "../../../translations/I18nContext";
import CustomInput from "../../../components/CustomInput";
import CustomGreenButton from "../../../components/CustomGreenButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";
import auth from "@react-native-firebase/auth";
import { IEmail } from "models/Login";
import commonService from "service/commonService";
interface IProps extends NavigationProps {}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter email.")
    .email("Please enter correct email."),
});

const ForgotPassword: React.FC<IProps> = ({ navigation }) => {
  const [showLoader, setLoader] = useState(false);
  const submit = async (values: IEmail, resetForm: () => void) => {
    setLoader(true);
    auth()
      .sendPasswordResetEmail(values.email)
      .then(() => {
        setLoader(false);
        resetForm();
        commonService.showToast("success", "forgot_password_link");
        navigation.navigate("SignIn");
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
      <HeaderBar dummyRight={true} showBack={true} />
      <KeyboardAwareScrollView>
        <AppScrollView>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ email: "" }}
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
                <React.Fragment>
                  <SpaceContainer marginTop={1} marginBottom={5}>
                    <AuthTitle>
                      {I18nContext.getString("forgot_password")}
                    </AuthTitle>
                  </SpaceContainer>
                  <SpaceContainer marginBottom={8}>
                    <SubtitleContainer>
                      <RegularText textAlign={"center"}>
                        {I18nContext.getString("forgot_password_subtitle")}
                      </RegularText>
                    </SubtitleContainer>
                  </SpaceContainer>
                  <CustomInput
                    label={"email"}
                    value={values.email}
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
                    placeholder={"cricbox@gmail.com"}
                  />
                  <CustomGreenButton
                    showLoader={showLoader}
                    text={"submit"}
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
export default connectStore(ForgotPassword);
