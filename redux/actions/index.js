import {USER_STATE_CHANGE} from "../constants/index"
import firebase from "firebase";

export function fetchUser() {
  
  return (dispatch) => {
    console.log("function has been called");
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log(snapshot.data());
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
            console.log("User does not exist")
        }
      });
  };
}
