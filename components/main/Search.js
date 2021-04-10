import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Search() {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  const fetchUsers = (search) => {
    // find docs in the user collection
    firebase
      .firestore()
      .collection("users")
      .where("name", ">=", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return {
            id,
            ...data,
          };
        });
        setUsers(users);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="search"
        onChangeText={(search) => fetchUsers(search)}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile", { uid: item.id });
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
