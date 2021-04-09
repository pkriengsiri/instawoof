// 3rd party imports
import { StatusBar } from "expo-status-bar";
import React from "react";
import * as firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


// local imports
import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "instawoof-2c2fc.firebaseapp.com",
  projectId: "instawoof-2c2fc",
  storageBucket: "instawoof-2c2fc.appspot.com",
  messagingSenderId: "491558044435",
  appId: "1:491558044435:web:04072f5d81ec50ead290e6",
  measurementId: "G-QW2EW0KYEM"
};

// Check to see if any firebase instances are running
if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
