import firebase from "firebase";
import "firebase/firestore";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";

import { connect } from "react-redux";

function Profile(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const { currentUser, posts } = props;
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("User does not exist");
          }
        });
      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return {
              id,
              ...data,
            };
          });
          setUserPosts(posts);
        });
    }
  }, [props.route.params.uid]);

  const onFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .set({});
  };

  const onUnfollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .delete();
  };

  return (
    <View style={styles.container}>
      {user && (
        <>
          <View style={styles.containerInfo}>
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
            {/* Conditionally render this view if the profile is not the current user's */}
            {props.route.params.uid !== firebase.auth().currentUser.uid && (
              <View>
                {/* Change render the follow or unfollow button based upon the follow state */}
                {following ? (
                  <Button
                    title="Unfollow"
                    onPress={() => {
                      onUnfollow();
                    }}
                  />
                ) : (
                  <Button
                    title="Follow"
                    onPress={() => {
                      onFollow();
                    }}
                  />
                )}
              </View>
            )}
          </View>
          <View style={styles.containerGallery}>
            <FlatList
              numColumns={3}
              horizontal={false}
              data={userPosts}
              renderItem={({ item }) => (
                <View style={styles.containerImage}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.downloadURL }}
                  />
                </View>
              )}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);
