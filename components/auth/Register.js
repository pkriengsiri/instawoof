import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSignUp = () => {
      
  };

  return (
    <View>
      <TextInput placeHolder="name" onChangeText={(name) => setName(name)} />
      <TextInput
        placeHolder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeHolder="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button onPress={() => onSignUp()} title="Sign Up" />
    </View>
  );
}
