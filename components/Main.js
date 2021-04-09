import React, { useEffect } from "react";
import { View, Text } from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";




import {fetchUser} from "../redux/actions/index"

// Hides the error message about setting a timer
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

const Main = ({fetchUser, currentUser}) => {
    useEffect(() => {
        fetchUser();
        console.log(currentUser);
    }, []);

    
  
    return (
      <View  style={{ flex: 1, justifyContent: "center" }}>
        <Text>{currentUser.name} is logged in</Text>
      </View>
    );
  }

  const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
  })

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
