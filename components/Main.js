import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { fetchUser } from "../redux/actions/index";
import FeedScreen from "./main/Feed";

// Hides the error message about setting a timer
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

const Tab = createBottomTabNavigator();

const Main = ({ fetchUser, currentUser }) => {
  useEffect(() => {
    fetchUser();
  }, []);

  

  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
    </Tab.Navigator>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
