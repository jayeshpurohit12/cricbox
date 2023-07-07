import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import auth from "@react-native-firebase/auth";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ForgotUsername from "../pages/Auth/ForgotUsername";
import VerifyCode from "../pages/Auth/VerifyCode";
import CreateNewPassword from "../pages/Auth/CreateNewPassword";
import { useTheme } from "styled-components";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/Dashboard";
import CryptoMethods from "../pages/CryptoMethods";
import AddTips from "../pages/AddTips";
import ScanBarcode from "../pages/ScanBarcode";
import PaymentHistory from "../pages/PaymentHistory";
import Reports from "../pages/Reports";
import Faq from "../pages/Faq";
import PrivacyAndPolicies from "../pages/PrivacyAndPolicies";
import TermsAndConditions from "../pages/TermsAndConditions";
import SideMenu from "../components/SideMenu";
import Settings from "../pages/Settings";
import ConfigurationTips from "../pages/ConfigurationTips";
import CreatePlace from "pages/CreatePlace";
import PendingPlaces from "pages/PendingPlaces";
import MyPlaces from "pages/MyPlaces";
import PlaceDetails from "pages/PlaceDetails";
import Bookings from "pages/Bookings";
import Profile from "pages/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import BookingSlots from "pages/BookingSlots";
import BookingSummary from "pages/BookingSummary";
import BookingDetails from "components/BookingsHistory/BookingDetails";

interface IProps {}

const AppNavigator: React.FC<IProps> = ({}) => {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();
  const theme = useTheme();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const screenOptions = {
    gestureEnabled: false,
    contentStyle: {
      backgroundColor: theme.bodyBackground,
    },
  };

  // const drawerScreenOptions = {
  //   gestureEnabled: false,
  //   contentStyle: {
  //     backgroundColor: theme.bodyBackground,
  //   },
  // };

  const hideHeader = {
    headerShown: false,
  };

  const DashboardStack = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Dashboard"
          options={hideHeader}
          component={Dashboard}
        />
        {/* <Stack.Screen
          name="PlaceDetails"
          options={hideHeader}
          component={PlaceDetails}
        /> */}
        <Stack.Screen
          name="CryptoMethods"
          options={hideHeader}
          component={CryptoMethods}
        />
        <Stack.Screen name="AddTips" options={hideHeader} component={AddTips} />
        <Stack.Screen
          name="ScanBarcode"
          options={hideHeader}
          component={ScanBarcode}
        />
      </Stack.Navigator>
    );
  };

  const PaymentHistoryStack = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="PaymentHistory"
          options={hideHeader}
          component={PaymentHistory}
        />
      </Stack.Navigator>
    );
  };

  const ReportStack = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Reports" options={hideHeader} component={Reports} />
      </Stack.Navigator>
    );
  };

  const FaqStack = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Faq" options={hideHeader} component={Faq} />
      </Stack.Navigator>
    );
  };

  const CreatPlaceStack = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="CreatePlace"
          options={hideHeader}
          component={CreatePlace}
        />
      </Stack.Navigator>
    );
  };
  const TermsStack = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="TermsAndConditions"
          options={hideHeader}
          component={TermsAndConditions}
        />
      </Stack.Navigator>
    );
  };

  const PolicyStack = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="PrivacyAndPolicies"
          options={hideHeader}
          component={PrivacyAndPolicies}
        />
      </Stack.Navigator>
    );
  };

  const PendingPlaceStack = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="PendingPlaces"
          options={hideHeader}
          component={PendingPlaces}
        />
        <Stack.Screen
          name="PlaceDetails"
          options={hideHeader}
          component={PlaceDetails}
        />
      </Stack.Navigator>
    );
  };

  const MyPlaceStack = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="MyPlaces"
          options={hideHeader}
          component={MyPlaces}
        />
      </Stack.Navigator>
    );
  };

  const SetttingsStack = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Settings"
          options={hideHeader}
          component={Settings}
        />
        <Stack.Screen
          name="ConfigurationTips"
          options={hideHeader}
          component={ConfigurationTips}
        />
      </Stack.Navigator>
    );
  };

  const ProfileStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
        <Stack.Screen name="Reports" component={Reports} />
        <Stack.Screen name="Faq" component={Faq} />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
        />
        <Stack.Screen
          name="PrivacyAndPolicies"
          component={PrivacyAndPolicies}
        />
        <Stack.Screen
          name="MyPlaces"
          options={hideHeader}
          component={MyPlaces}
        />
        <Stack.Screen
          name="CreatePlace"
          options={hideHeader}
          component={CreatePlace}
        />
      </Stack.Navigator>
    );
  };

  const BookingStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Booking" component={Bookings} />
      </Stack.Navigator>
    );
  };

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Dashboard") {
              iconName = "home";
            } else if (route.name === "Booking") {
              iconName = "shopping-bag";
            } else if (route.name === "Profile") {
              iconName = "user";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            height: Platform.OS === "ios" ? 90 : 60,
            paddingBottom: Platform.OS === "ios" ? 0 : 10,
          },
        })}
        tabBarOptions={{
          activeTintColor: "green",
          inactiveTintColor: "gray",
          safeAreaInsets: {
            bottom: 0,
            top: 0,
          },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardStack}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Booking"
          component={BookingStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  };

  // const DrawerStack = () => {
  //   return (
  //     <Drawer.Navigator drawerContent={(props) => <SideMenu {...props} />}>
  //       <Drawer.Screen
  //         options={hideHeader}
  //         name="DashboardStack"
  //         component={DashboardStack}
  //       />
  //       <Drawer.Screen
  //         options={hideHeader}
  //         name="CreatPlaceStack"
  //         component={CreatPlaceStack}
  //       />
  //       <Drawer.Screen
  //         options={hideHeader}
  //         name="PendingPlaceStack"
  //         component={PendingPlaceStack}
  //       />
  //       <Drawer.Screen
  //         options={hideHeader}
  //         name="MyPlaceStack"
  //         component={MyPlaceStack}
  //       />
  //       <Drawer.Screen
  //         options={hideHeader}
  //         name="PaymentHistoryStack"
  //         component={PaymentHistoryStack}
  //       />
  //       <Drawer.Screen
  //         options={hideHeader}
  //         name="ReportStack"
  //         component={ReportStack}
  //       />
  //       <Drawer.Screen
  //         options={hideHeader}
  //         name="FaqStack"
  //         component={FaqStack}
  //       />
  //       <Drawer.Screen
  //         options={hideHeader}
  //         name="PolicyStack"
  //         component={PolicyStack}
  //       />
  //       <Drawer.Screen
  //         options={hideHeader}
  //         name="TermsStack"
  //         component={TermsStack}
  //       />
  //       <Drawer.Screen
  //         options={hideHeader}
  //         name="SetttingsStack"
  //         component={SetttingsStack}
  //       />
  //     </Drawer.Navigator>
  //   );
  // };

  if (initializing) return null;

  if (!user || (user && !user.emailVerified)) {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        {/* <Stack.Screen name="StartUp" options={hideHeader} component={StartUp} /> */}
        <Stack.Screen name="SignIn" options={hideHeader} component={SignIn} />
        <Stack.Screen name="SignUp" options={hideHeader} component={SignUp} />
        <Stack.Screen
          name="ForgotPassword"
          options={hideHeader}
          component={ForgotPassword}
        />
        <Stack.Screen
          name="ForgotUsername"
          options={hideHeader}
          component={ForgotUsername}
        />
        <Stack.Screen
          name="VerifyCode"
          options={hideHeader}
          component={VerifyCode}
        />
        <Stack.Screen
          name="CreateNewPassword"
          options={hideHeader}
          component={CreateNewPassword}
        />
      </Stack.Navigator>
    );
  }

  if (user) {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="TabNavigation"
          options={hideHeader}
          component={TabNavigator}
        />
        <Stack.Screen
          name="PlaceDetails"
          options={hideHeader}
          component={PlaceDetails}
        />
        <Stack.Screen
          name="BookingSlots"
          component={BookingSlots}
          options={hideHeader}
        />
        <Stack.Screen
          name="BookingSummary"
          component={BookingSummary}
          options={hideHeader}
        />
        <Stack.Screen name="Booking Details" component={BookingDetails} />
        {/* <Stack.Screen
      //     name="DrawerStack"
      //     options={hideHeader}
      //     component={DrawerStack}
      //   /> */}
      </Stack.Navigator>
    );
  }
};

export default AppNavigator;
