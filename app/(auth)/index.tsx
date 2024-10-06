import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useRouter } from "expo-router";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Back-end Constraint logic
    if (email === "student") {
      router.push("/student");
    } else if (email === "teacher") {
      router.push("/teacher");
    } else {
      Alert.alert(
        "Temporary",
        "Please type 'student' in the 'Email/School ID' field to be redirected to the student tab, or 'teacher' to be redirected to the teacher tab."
      );
    }
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>LOGIN</Text>
      <TextInput
        label="Email/School ID"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        mode="outlined"
        outlineColor="#282726"
        theme={{ colors: { primary: "#282726" } }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        outlineColor="#282726"
        theme={{ colors: { primary: "#282726" } }}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="text"
          onPress={() => console.log("Sign In pressed")}
          style={styles.signInButton}
          labelStyle={styles.signInLabel}
        >
          Register
        </Button>
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          buttonColor="#282726"
          labelStyle={styles.buttonLabel}
        >
          LOGIN
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
    alignSelf: "center",
  },
  title: {
    fontSize: 40,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    marginBottom: 17,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexGrow: 1,
    marginLeft: 150,
  },
  buttonLabel: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  signInButton: {
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    flexGrow: 1,
  },
  signInLabel: {
    color: "#282726",
    fontSize: 15,
    marginLeft: 7,
    textTransform: "none",
  },
});

export default LoginPage;
