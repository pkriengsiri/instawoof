import React, { useState } from "react";
import { View, TextInput, Image, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

import firebase from "firebase";
import "firebase/firestore";
import "firebase/firebase-storage";

export default function Save(props) {
  const image = props.route.params.image;
  const [caption, setCaption] = useState("");
  const navigation = useNavigation();

  const uploadImage = async () => {
    const response = await fetch(image);
    const blob = await response.blob();

    const task = firebase
      .storage()
      .ref()
      .child(
        `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
      )
      .put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        console.log(snapshot);
        savePostData(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      }).then((function () {
          navigation.popToTop();
      }));
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: image }} style={{ flex: 1 }} />
      <TextInput
        style={{ flex: 1 }}
        placeholder="Write a caption"
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}
