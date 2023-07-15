import { Platform } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "pages/Dashboard";
import PaymentHistory from "pages/PaymentHistory";
import Reports from "pages/Reports";
import Faq from "pages/Faq";
import TermsAndConditions from "pages/TermsAndConditions";
import PrivacyAndPolicies from "pages/PrivacyAndPolicies";
import PlaceDetails from "pages/PlaceDetails";
import Profile from "pages/Profile";
import Bookings from "pages/Bookings";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DashboardStack = () => {
  const screenOptions = {
    gestureEnabled: false,

    headerShown: false, // Hide the header for all screens in this stack
  };

  const hideHeader = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Dashboard"
        options={hideHeader}
        component={Dashboard}
      />
      <Stack.Screen
        name="PlaceDetails"
        options={hideHeader}
        component={PlaceDetails}
      />
      {/* <Stack.Screen
        name="CryptoMethods"
        options={hideHeader}
        component={CryptoMethods}
      />
      <Stack.Screen name="AddTips" options={hideHeader} component={AddTips} />
      <Stack.Screen
        name="ScanBarcode"
        options={hideHeader}
        component={ScanBarcode}
      /> */}
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
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="PrivacyAndPolicies" component={PrivacyAndPolicies} />
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

export default TabNavigator;
