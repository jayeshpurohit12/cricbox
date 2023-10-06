import { NavigationProps } from "../../styles/common.interface";
import React, { useState } from "react";
import HeaderBar from "../../components/HeaderBar";
import {
  CardBlackText,
  ErrorMessage,
  CustomModal,
  ModalContainer,
  SpaceContainer,
  CustomRow,
} from "../../styles/common.style";
import { Formik } from "formik";
import I18nContext from "../../translations/I18nContext";
import { HeadLine } from "pages/Dashboard/style";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { IPlace } from "models/Places";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Yup from "yup";
import moment from "moment";
import styled from "styled-components";
import CustomInput from "components/CustomInput";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "constants";
import geohash from "ngeohash";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontSize } from "styles/sizes";
import CustomGreenButton from "components/CustomGreenButton";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import commonService from "service/commonService";
import connectStore from "redux/connect";
interface IProps extends NavigationProps {
  userData: any;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter your name")
    .min(2, "Name must have at least 2 characters"),
  description: Yup.string()
    .required("Please enter description.")
    .min(10, "Description must have at least 10 characters"),
  phone: Yup.string()
    .required("Please enter phone number.")
    .min(10, "Please enter valid number")
    .max(10, "Please enter valid number"),
  numberOfTurf: Yup.number()
    .required("Please enter number of turf.")
    .typeError("Please enter number value "),
  location: Yup.string().required("Please enter location."),
  amenities: Yup.string().required("Please enter amenities."),
  upiID: Yup.string().required("Please enter upiID."),
  startTime: Yup.string().required("Please enter start time."),
  morningPrice: Yup.number()
    .required("Please enter morning price")
    .typeError("Please enter number value"),
  eveningPrice: Yup.number()
    .required("Please enter evening price")
    .typeError("Please enter number value"),
  nightPrice: Yup.number()
    .required("Please enter night price")
    .typeError("Please enter number value"),
  midNightPrice: Yup.number()
    .required("Please enter mid night price")
    .typeError("Please enter number value"),
  weekendMorningPrice: Yup.number()
    .required("Please enter weekend morning price")
    .typeError("Please enter number value"),
  weekendEveningPrice: Yup.number()
    .required("Please enter weekend evening price")
    .typeError("Please enter number value"),
  weekendNightPrice: Yup.number()
    .required("Please enter weekend night price")
    .typeError("Please enter number value"),
  weekendMidNightPrice: Yup.number()
    .required("Please enter weekend mid night price")
    .typeError("Please enter number value"),
  boxDimension: Yup.string().required("Please enter box dimension"),
  // .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
  //   message: "Start Time Format shoud be 00:00",
  // }),
  endTime: Yup.string().required("Please enter end time."),
  // .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
  //   message: "End Time Format shoud be 00:00",
  // }),
});

const Label = styled.Text`
  color: ${({ theme }) => theme.inputLabelColor};
  font-size: ${FontSize.sm};
  font-family: Poppins-Regular;
`;

const CreatePlace: React.FC<IProps> = ({ navigation, userData }) => {
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [showLoader, setLoader] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageFiles, setImageFiles] = useState<any>([]);
  const [selectedField, setSelectedField] =
    useState<keyof IPlace>("startTimeDate");

  const openImagePicker = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      selectionLimit: 10,
      multiple: true,
      includeExif: true,
    }).then((images) => {
      setImageFiles([...imageFiles, ...images]);
    });
  };

  const removeImage = (index: number) => {
    const files = [...imageFiles];
    files.splice(index, 1);
    setImageFiles(files);
  };

  const submit = (values: IPlace, resetForm: () => void) => {
    if (imageFiles.length == 0) {
      commonService.showToast("error", "place_add_place_image");
      return true;
    }
    setLoader(true);
    firestore()
      .collection("Places")
      .add({
        ...values,
        userId: userData.userId,
        status: "pending",
        dateISO: moment().toISOString(),
        milliseconds: moment().valueOf(),
      })
      .then((document) => {
        const images: Array<string> = [];
        try {
          const uploadImage = imageFiles.map(async (item: any) => {
            const sourceUrl =
              Platform.OS === "ios" ? item.sourceURL : item.path;
            const fileName = sourceUrl.substring(
              sourceUrl.lastIndexOf("/") + 1,
            );
            const reference = storage().ref(item.filename ?? fileName);
            const uploadUri =
              Platform.OS === "ios"
                ? item.sourceURL.replace("file://", "")
                : item.path;
            await reference.putFile(uploadUri);
            const url = await reference.getDownloadURL();
            images.push(url);
            return true;
          });
          Promise.all(uploadImage)
            .then(() => {
              firestore()
                .collection("Places")
                .doc(document.id)
                .update({ images })
                .then(() => {
                  commonService.showToast("info", "place_added");
                  resetForm();
                  navigation.navigate("DashboardStack");
                  setLoader(false);
                })
                .catch(() => {
                  commonService.showToast("success", "uploading_fail");
                  setLoader(false);
                });
            })
            .catch((e) => {
              setLoader(false);
            });
        } catch (e) {
          setLoader(false);
          commonService.showToast("error", "uploading_fail");
        }

        // resetForm();
        // navigation.navigate("DashboardStack");
      })
      .catch(() => {
        setLoader(false);
        commonService.showToast("error", "default_error");
      });
  };

  return (
    <React.Fragment>
      <HeaderBar showHelp={true} showBack={true} />
      <ScrollView>
        <HeadLine style={styles.headLine}>
          <CardBlackText
            style={{
              fontWeight: "bold",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            marginLeft={0}
          >
            {I18nContext.getString("add_place")}
          </CardBlackText>
        </HeadLine>
        <Formik
          validationSchema={validationSchema}
          initialValues={
            {
              name: "",
              description: "",
              phone: "",
              amenities: "",
              upiID: "",
              boxDimension: "",
              location: "",
              startTime: "",
              endTime: "",
              numberOfTurf: null,
              morningPrice: null,
              eveningPrice: null,
              midNightPrice: null,
              nightPrice: null,
              weekendMorningPrice: null,
              weekendEveningPrice: null,
              weekendNightPrice: null,
              weekendMidNightPrice: null,
            } as IPlace
          }
          onSubmit={(values: IPlace, { resetForm }) =>
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
            console.log(errors);
            return (
              <View style={{ padding: 16 }}>
                <CustomInput
                  label={"name"}
                  value={values.name}
                  placeholder={"John"}
                  error={
                    <>
                      {touched.name && errors.name ? (
                        <ErrorMessage>{errors.name}</ErrorMessage>
                      ) : null}
                    </>
                  }
                  onChangeText={(value) => {
                    setFieldTouched("name", true);
                    setFieldValue("name", value);
                  }}
                  onBlur={() => handleBlur("name")}
                />
                <CustomInput
                  label={"description"}
                  value={values.description}
                  multiline={true}
                  placeholder={"Description"}
                  error={
                    <>
                      {touched.description && errors.description ? (
                        <ErrorMessage>{errors.description}</ErrorMessage>
                      ) : null}
                    </>
                  }
                  onChangeText={(value) => {
                    setFieldTouched("description", true);
                    setFieldValue("description", value);
                  }}
                  onBlur={() => handleBlur("description")}
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
                  placeholder={"1234567890"}
                />
                <CustomInput
                  keyboardType="number-pad"
                  label={"number_of_turf"}
                  value={values.numberOfTurf}
                  onChangeText={(value) => {
                    setFieldTouched("numberOfTurf", true);
                    setFieldValue("numberOfTurf", Number(value));
                  }}
                  error={
                    <>
                      {touched.numberOfTurf && errors.numberOfTurf ? (
                        <ErrorMessage>{errors.numberOfTurf}</ErrorMessage>
                      ) : null}
                    </>
                  }
                  onBlur={() => handleBlur("numberOfTurf")}
                  placeholder={"0"}
                />
                <CustomInput
                  keyboardType="number-pad"
                  label={"morning_price"}
                  value={values.morningPrice}
                  onChangeText={(value) => {
                    setFieldTouched("morningPrice", true);
                    setFieldValue("morningPrice", Number(value));
                  }}
                  error={
                    <>
                      {touched.morningPrice && errors.morningPrice ? (
                        <ErrorMessage>{errors.morningPrice}</ErrorMessage>
                      ) : null}
                    </>
                  }
                  onBlur={() => handleBlur("morningPrice")}
                  placeholder={"0"}
                />
                <CustomInput
                  keyboardType="number-pad"
                  label={"evening_price"}
                  value={values.eveningPrice}
                  onChangeText={(value) => {
                    setFieldTouched("eveningPrice", true);
                    setFieldValue("eveningPrice", Number(value));
                  }}
                  error={
                    <>
                      {touched.eveningPrice && errors.eveningPrice ? (
                        <ErrorMessage>{errors.eveningPrice}</ErrorMessage>
                      ) : null}
                    </>
                  }
                  onBlur={() => handleBlur("eveningPrice")}
                  placeholder={"0"}
                />
                <CustomInput
                  keyboardType="number-pad"
                  label={"night_price"}
                  value={values.nightPrice}
                  onChangeText={(value) => {
                    setFieldTouched("nightPrice", true);
                    setFieldValue("nightPrice", Number(value));
                  }}
                  error={
                    <>
                      {touched.nightPrice && errors.nightPrice ? (
                        <ErrorMessage>{errors.nightPrice}</ErrorMessage>
                      ) : null}
                    </>
                  }
                  onBlur={() => handleBlur("nightPrice")}
                  placeholder={"0"}
                />
                <CustomInput
                  keyboardType="number-pad"
                  label={"mid_night_price"}
                  value={values.midNightPrice}
                  onChangeText={(value) => {
                    setFieldTouched("midNightPrice", true);
                    setFieldValue("midNightPrice", Number(value));
                  }}
                  error={
                    <>
                      {touched.midNightPrice && errors.midNightPrice ? (
                        <ErrorMessage>{errors.midNightPrice}</ErrorMessage>
                      ) : null}
                    </>
                  }
                  onBlur={() => handleBlur("midNightPrice")}
                  placeholder={"0"}
                />
                <CustomInput
                  keyboardType="number-pad"
                  label={"weekend_morning_price"}
                  value={values.weekendMorningPrice}
                  onChangeText={(value) => {
                    setFieldTouched("weekendMorningPrice", true);
                    setFieldValue("weekendMorningPrice", Number(value));
                  }}
                  error={
                    <>
                      {touched.weekendMorningPrice &&
                      errors.weekendMorningPrice ? (
                        <ErrorMessage>
                          {errors.weekendMorningPrice}
                        </ErrorMessage>
                      ) : null}
                    </>
                  }
                  onBlur={() => handleBlur("weekendMorningPrice")}
                  placeholder={"0"}
                />
                <CustomInput
                  keyboardType="number-pad"
                  label={"weekend_evening_price"}
                  value={values.weekendEveningPrice}
                  onChangeText={(value) => {
                    setFieldTouched("weekendEveningPrice", true);
                    setFieldValue("weekendEveningPrice", Number(value));
                  }}
                  error={
                    <>
                      {touched.weekendEveningPrice &&
                      errors.weekendEveningPrice ? (
                        <ErrorMessage>
                          {errors.weekendEveningPrice}
                        </ErrorMessage>
                      ) : null}
                    </>
                  }
                  onBlur={() => handleBlur("weekendEveningPrice")}
                  placeholder={"0"}
                />
                <CustomInput
                  keyboardType="number-pad"
                  label={"weekend_night_price"}
                  value={values.weekendNightPrice}
                  onChangeText={(value) => {
                    setFieldTouched("weekendNightPrice", true);
                    setFieldValue("weekendNightPrice", Number(value));
                  }}
                  error={
                    <>
                      {touched.weekendNightPrice && errors.weekendNightPrice ? (
                        <ErrorMessage>{errors.weekendNightPrice}</ErrorMessage>
                      ) : null}
                    </>
                  }
                  onBlur={() => handleBlur("weekendNightPrice")}
                  placeholder={"0"}
                />
                <CustomInput
                  keyboardType="number-pad"
                  label={"weekend_mid_night_price"}
                  value={values.weekendMidNightPrice}
                  onChangeText={(value) => {
                    setFieldTouched("weekendMidNightPrice", true);
                    setFieldValue("weekendMidNightPrice", Number(value));
                  }}
                  error={
                    <>
                      {touched.weekendMidNightPrice &&
                      errors.weekendMidNightPrice ? (
                        <ErrorMessage>
                          {errors.weekendMidNightPrice}
                        </ErrorMessage>
                      ) : null}
                    </>
                  }
                  onBlur={() => handleBlur("weekendMidNightPrice")}
                  placeholder={"0"}
                />
                <CustomInput
                  label={"amenities"}
                  multiline={true}
                  value={values.amenities}
                  onChangeText={(value) => {
                    setFieldTouched("amenities", true);
                    setFieldValue("amenities", value);
                  }}
                  error={
                    <>
                      {touched.amenities && errors.amenities ? (
                        <ErrorMessage>{errors.amenities}</ErrorMessage>
                      ) : null}
                    </>
                  }
                  onBlur={() => handleBlur("amenities")}
                  placeholder={"abc,xyz"}
                />
                <CustomInput
                  label={"box_dimension"}
                  multiline={true}
                  value={values.boxDimension}
                  onChangeText={(value) => {
                    setFieldTouched("boxDimension", true);
                    setFieldValue("boxDimension", value);
                  }}
                  error={
                    <>
                      {touched.boxDimension && errors.boxDimension ? (
                        <ErrorMessage>{errors.boxDimension}</ErrorMessage>
                      ) : null}
                    </>
                  }
                  onBlur={() => handleBlur("amenities")}
                  placeholder={"l x b x h"}
                />
                <CustomInput
                  label={"upiId"}
                  value={values.upiID}
                  onChangeText={(value) => {
                    setFieldTouched("upiID", true);
                    setFieldValue("upiID", value);
                  }}
                  error={
                    <>
                      {touched.upiID && errors.upiID ? (
                        <ErrorMessage>{errors.upiID}</ErrorMessage>
                      ) : null}
                    </>
                  }
                  onBlur={() => handleBlur("upiID")}
                  placeholder={"yourmechantid@paytm"}
                />
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(true);
                  }}
                >
                  <CustomInput
                    label={"location"}
                    value={values.location}
                    editable={false}
                    onChangeText={(value) => {
                      setFieldTouched("location", true);
                      setFieldValue("location", value);
                    }}
                    error={
                      <>
                        {touched.location && errors.location ? (
                          <ErrorMessage>{errors.location}</ErrorMessage>
                        ) : null}
                      </>
                    }
                    onBlur={() => handleBlur("location")}
                    placeholder={""}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedField("startTimeDate");
                    setTimePickerVisible(true);
                  }}
                >
                  <CustomInput
                    label={"start_time"}
                    editable={false}
                    value={values.startTime}
                    error={
                      <>
                        {touched.startTime && errors.startTime ? (
                          <ErrorMessage>{errors.startTime}</ErrorMessage>
                        ) : null}
                      </>
                    }
                    placeholder={"08:00 AM"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedField("endTimeDate");
                    setTimePickerVisible(true);
                  }}
                >
                  <CustomInput
                    label={"end_time"}
                    editable={false}
                    value={values.endTime}
                    placeholder={"12:00 AM"}
                    error={
                      <>
                        {touched.endTime && errors.endTime ? (
                          <ErrorMessage>{errors.endTime}</ErrorMessage>
                        ) : null}
                      </>
                    }
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <Label>{I18nContext.getString("place_images")}</Label>
                  <TouchableOpacity onPress={openImagePicker}>
                    <Icon size={24} color="#081021" name="attachment" />
                  </TouchableOpacity>
                </View>
                <CustomRow style={{ justifyContent: "space-between" }}>
                  {imageFiles.map((item, index) => {
                    return (
                      <View key={index}>
                        <Image
                          style={{ width: 100, height: 100, marginBottom: 12 }}
                          source={{
                            uri:
                              Platform.OS === "ios"
                                ? item.sourceURL
                                : item.path,
                          }}
                        />
                        <TouchableOpacity
                          onPress={() => removeImage(index)}
                          style={styles.trash_button}
                        >
                          <Icon
                            style={styles.trash_style}
                            name="trash-can-outline"
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </CustomRow>
                <SpaceContainer marginTop={4} marginBottom={8}>
                  <CustomGreenButton
                    showLoader={showLoader}
                    text={"create_place"}
                    onPress={handleSubmit}
                  />
                </SpaceContainer>
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  date={values[selectedField] as any}
                  onConfirm={(date) => {
                    setFieldValue(selectedField, date);
                    setFieldValue(
                      selectedField === "startTimeDate"
                        ? "startTime"
                        : "endTime",
                      moment(date).format("hh:mm a"),
                    );
                    setTimePickerVisible(false);
                  }}
                  onCancel={() => {
                    setTimePickerVisible(false);
                  }}
                />
                <CustomModal
                  onBackdropPress={() => setIsVisible(false)}
                  isVisible={isVisible}
                >
                  <ModalContainer style={{ minHeight: 300 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: "#081021",
                          fontFamily: "Poppins-Bold",
                          fontSize: 18,
                        }}
                      >
                        {I18nContext.getString("location")}
                      </Text>
                      <TouchableOpacity onPress={() => setIsVisible(false)}>
                        <Image
                          style={{ width: 25, height: 25 }}
                          source={require("../../../assets/images/cancel.png")}
                        />
                      </TouchableOpacity>
                    </View>
                    <GooglePlacesAutocomplete
                      GooglePlacesDetailsQuery={{ fields: "geometry" }}
                      placeholder="Search"
                      fetchDetails={true}
                      keepResultsAfterBlur={true}
                      onFail={(error) => console.error(error)}
                      onPress={(data, details = null) => {
                        if (details) {
                          setFieldValue("lat", details.geometry.location.lat);
                          setFieldValue("long", details.geometry.location.lng);
                          setFieldValue("placeId", data.place_id);
                          setFieldValue("location", data.description);
                          setFieldValue(
                            "geoHash",
                            geohash.encode(
                              details.geometry.location.lat,
                              details.geometry.location.lng,
                            ),
                          );
                        }
                        setIsVisible(false);
                      }}
                      query={{
                        key: GOOGLE_API_KEY,
                        language: "en",
                      }}
                    />
                  </ModalContainer>
                </CustomModal>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  headLine: { paddingLeft: 16, paddingRight: 16 },
  trash_style: {
    fontSize: 22,
    color: "red",
    marginRight: 10,
  },
  trash_button: {
    marginBottom: 12,
  },
});
export default connectStore(CreatePlace);
