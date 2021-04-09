// 3rd party imports
import { StatusBar } from "expo-status-bar";
import React from "react";
import * as firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


// local imports
import Landing from "./components/auth/Landing";
import {FIREBASE_API_KEY} from "react-native-dotenv";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: {FIREBASE_API_KEY},
  authDomain: "instawoof-2c2fc.firebaseapp.com",
  projectId: "instawoof-2c2fc",
  storageBucket: "instawoof-2c2fc.appspot.com",
  messagingSenderId: "491558044435",
  appId: "1:491558044435:web:04072f5d81ec50ead290e6",
  measurementId: "G-QW2EW0KYEM"
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
