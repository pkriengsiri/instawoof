import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";

import { fetchUser, fetchUserPosts } from "../redux/actions/index";
import FeedScreen from "./main/Feed";
import ProfileScreen from "./main/Profile";
import SearchScreen from "./main/Search";

// Hides the error message about setting a timer
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

const Tab = createBottomTabNavigator();
const EmptyScreen = () => null;

const Main = ({ fetchUser, fetchUserPosts, currentUser }) => {
  useEffect(() => {
    fetchUser();
    fetchUserPosts();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{ showLabel: "false" }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            );
          },
        }}
      />
      <Tab.Screen
        name="AddContainer"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Add");
          },
        })}
        options={{
          title: "Add",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Profile", {
              uid: firebase.auth().currentUser.uid,
            });
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUser, fetchUserPosts }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
