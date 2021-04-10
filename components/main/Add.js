import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from '@react-navigation/native';

export default function Add() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const navigation = useNavigation();


  useEffect(() => {
    //   console.log(navigation);
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      if (Platform.OS !== "web") {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === "granted");
      }
    })();
  }, []);

  // Uses the device camera to take a picture
  const takePicture = async () => {
    // Check for camera permission
    if (camera) {
      // Take a picture and set the uri as the image
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  // Uses the device file system to choose an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Return an empty view of camera/ gallery permissions have not been set
  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }

  // Return an error message if camera or gallery permissions is denied
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>Access to camera and gallery needed</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={type}
          ratio={"1:1"}
          ref={(ref) => setCamera(ref)}
        />
      </View>
      <Button
        style={styles.button}
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />
      <Button
        title="Take Picture"
        onPress={() => {
          takePicture();
        }}
      />
      <Button
        title="Pick an image from gallery"
        onPress={() => {
          pickImage();
        }}
      />
      <Button
        title="Save"
        onPress={() => {
          // Render the navigation component and pass in the image as a prop
          return navigation.navigate("Save", { image });
        }}
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  image: {
    flex: 1,
  },
});
