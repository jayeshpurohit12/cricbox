import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Profile = ({ navigation }) => {
  const [role, setRole] = useState("");
  const currentUserId = firebase.auth().currentUser?.uid;
  const getRole = async () => {
    try {
      const userQuerySnapshot = await firebase
        .firestore()
        .collection("Users")
        .where("userId", "==", currentUserId)
        .get();

      return userQuerySnapshot?.docs.forEach((doc) => setRole(doc.data().role));
    } catch (err) {
      console.log(err);
    }
  };
  getRole();

  const data = [
    {
      id: "0",
      title: "My Places",
      screen: "MyPlaces",
      icon: <FontAwesome5 name="place-of-worship" size={22} color="grey" />,
      access: ["admin", "box-admin"],
    },
    {
      id: "1",
      title: "Add Places",
      screen: "CreatePlace",
      icon: <Entypo name="address" size={25} color="grey" />,
      access: ["admin", "box-admin"],
    },
    {
      id: "2",
      title: "Reports",
      screen: "Reports",
      icon: <Icon name="file-text-o" size={25} color="grey" />,
      access: ["admin", "box-admin", "normal"],
    },
    {
      id: "3",
      title: "FAQs",
      screen: "Faq",
      icon: (
        <MaterialCommunityIcons
          name="help-circle-outline"
          size={25}
          color="grey"
        />
      ),
      access: ["admin", "box-admin", "normal"],
    },
    {
      id: "4",
      title: "Terms & Conditions",
      screen: "TermsAndConditions",
      icon: <Icon name="file-text-o" size={25} color="grey" />,
      access: ["admin", "box-admin", "normal"],
    },
    {
      id: "5",
      title: "Privacy Policy",
      screen: "PrivacyAndPolicies",
      icon: <Icon name="file-text-o" size={25} color="grey" />,
      access: ["admin", "box-admin", "normal"],
    },
    {
      id: "6",
      title: "Log out",
      icon: <Icon name="sign-out" size={25} color="grey" />,
      access: ["admin", "box-admin", "normal"],
    },
  ];
  const [username, setUsername] = useState("");

  const handleSignOut = () => {
    try {
      firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Retrieve the currently logged-in user
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      // User is logged in
      setUsername(currentUser.email);
    } else {
      // User is not logged in
      setUsername("");
    }
  }, []);
  const renderItem = ({ item }) => {
    return (
      <>
        {item.access.includes(role) && (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              if (item.screen) {
                navigation.navigate(item.screen);
              } else {
                handleSignOut();
              }
            }}
          >
            {item.icon}
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Account</Text>
      </View>
      <View
        style={{
          height: 100,
          alignItems: "center",
          backgroundColor: "#e0e0e0",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity style={{ padding: 20 }}>
          <Icon name="user-circle" size={56} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#000000" }}>
            {username}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingLeft: 20,
          width: "95%",
          justifyContent: "center",
          paddingTop: 40,
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    paddingBottom: 20,
    paddingLeft: 10,
    flexDirection: "row",
  },
  itemText: {
    fontSize: 16,
    marginLeft: 20,
    color: "#000000",
    fontWeight: "bold",
  },
  // text:{
  //     color:'#000',
  //     fontWeight:'700',
  //     fontSize:30
  // },
  // button:{
  //     backgroundColor:'#0275d8',
  //     paddingVertical: 5,
  //     paddingHorizontal: 10

  // },
  // buttonText:{
  //     color:'#fff',
  //     fontSize:25
  // }
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  backButton: {
    marginRight: 10,
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
});
export default Profile;
