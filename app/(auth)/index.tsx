import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { Viewport } from "@/styles/styles";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.push("/tabs");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo2.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>SIGN IN</Text>
      <TextInput
        label="Email"
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
        secureTextEntry={!showPassword}
        style={styles.input}
        mode="outlined"
        outlineColor="#282726"
        theme={{ colors: { primary: "#282726" } }}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="text"
          onPress={() => router.push("/(auth)/ForgotPassword")}
          style={styles.forgotButton}
          labelStyle={styles.forgotLabel}
        >
          Forgot Password?
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>Don't have an account?</Text>
          <Button
            mode="text"
            onPress={() => router.push("/(auth)/SignUp")}
            style={styles.signInButton}
            labelStyle={styles.signInLabel}
          >
            Sign up
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Viewport.width * 0.8,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    alignSelf: "center",
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
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 0,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexGrow: 1,
    width: Viewport.width * 0.8,
  },
  buttonLabel: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  signInButton: {
    backgroundColor: "transparent",
  },
  signInLabel: {
    color: "#282726",
    fontSize: 15,
    marginLeft: 7,
    textDecorationLine: "underline",
  },
  forgotButton: {
    backgroundColor: "transparent",
    alignSelf: "flex-end",
  },
  forgotLabel: {
    color: "#282726",
    fontSize: 12,
    textDecorationLine: "underline",
  },
});

export default LoginPage;
