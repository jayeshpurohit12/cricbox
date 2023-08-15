import React, { useEffect, useState } from "react";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";
import { ILogin } from "../../../models/Login";
interface IProps extends NavigationProps {}

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Please enter phone number.")
    .min(10, "Please enter valid number")
    .max(10, "Please enter valid number"),
});

const SignIn: React.FC<IProps> = ({ navigation }) => {
  const [showLoader, setLoader] = useState(false);

  const submit = async (values: ILogin, resetForm: () => void) => {
    try {
      // navigation.navigate("ForgotUsername");
      setLoader(true);
      const confirmation = await auth().signInWithPhoneNumber(
        `+91${values.phone}`,
      );
      navigation.navigate("VerifyCode", {
        confirmation,
        phone: `+91${values.phone}`,
      });
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <HeaderBar dummyLeft={true} dummyRight={true} showBack={false} />
      <KeyboardAwareScrollView>
        <AppScrollView>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ phone: "" }}
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
                    label="phone"
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
                    placeholder={"7678909876"}
                  />

                  <CustomGreenButton
                    showLoader={showLoader}
                    text={"Get OTP"}
                    onPress={handleSubmit}
                  />
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
