import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { Viewport } from "@/styles/styles";
import CustomizedModal from "@/components/CustomizedModal";
import { TouchableOpacity } from "react-native";

const SignUpPage = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCheckEmailVisible, setIsCheckEmailVisible] = useState(false);
  const [isVerificationCodeVisible, setIsVerificationCodeVisible] =
    useState(false);
  const [code, setCode] = useState("");
  const [isWelcomeModalVisible, setIsWelcomeModalVisible] = useState(false);

  const handleCheckEmailClose = () => {
    setIsCheckEmailVisible(false);
    setIsVerificationCodeVisible(true);
  };

  const handleVerificationCodeClose = () => {
    setIsVerificationCodeVisible(false);
    setIsWelcomeModalVisible(true);
  };
  const handleWelcomeModalClose = () => {
    setIsWelcomeModalVisible(false);
    router.push("/(auth)/");
  };

  const handleSignUp = () => {
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    setIsCheckEmailVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>REGISTRATION</Text>
        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
          mode="outlined"
          outlineColor="#282726"
          theme={{ colors: { primary: "#282726" } }}
        />
        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
          mode="outlined"
          outlineColor="#282726"
          theme={{ colors: { primary: "#282726" } }}
        />
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
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={!showConfirmPassword}
          style={styles.input}
          mode="outlined"
          outlineColor="#282726"
          theme={{ colors: { primary: "#282726" } }}
          right={
            <TextInput.Icon
              icon={showConfirmPassword ? "eye-off" : "eye"}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          }
        />

        {/* Next Button */}
        <Button
          mode="contained"
          onPress={() => handleSignUp()}
          style={styles.button}
          buttonColor="#282726"
        >
          SUBMIT
        </Button>
      </View>
      {/* Check Email Modal */}
      <CustomizedModal
        visible={isCheckEmailVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCheckEmailClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalContentChild}>
            <Text style={styles.text}>
              Kindly check your email if you receive a code, as it is necessary
              for verifying your account.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.buttonModal}
            onPress={handleCheckEmailClose}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </CustomizedModal>

      {/* Verification Code Modal */}
      <CustomizedModal
        visible={isVerificationCodeVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleVerificationCodeClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalContentChild}>
            <Text style={styles.titleModal}>Type the code:</Text>
            <View style={styles.codeInputContainer}>
              <TextInput
                style={styles.codeInput}
                maxLength={6}
                value={code}
                onChangeText={setCode}
                keyboardType="numeric"
                placeholder="- - - - - -"
                placeholderTextColor="#999"
              />
            </View>
            <Text style={styles.helperText}>
              I don’t have receive a code?{" "}
              <Text style={styles.retryText}>retry</Text>
            </Text>
            <Text style={styles.timerText}>
              wait! resending the verification code to your email. 1:00
            </Text>
          </View>
          <TouchableOpacity
            style={styles.buttonModal}
            onPress={handleVerificationCodeClose}
          >
            <Text style={styles.buttonText}>DONE</Text>
          </TouchableOpacity>
        </View>
      </CustomizedModal>
      <CustomizedModal
        visible={isWelcomeModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleWelcomeModalClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalContentChild}>
            <Image
              source={require("../../assets/images/logo.png")} // Replace with your logo image path
              style={styles.logo}
            />
            <Text
              style={{
                fontSize: 22,
                color: "#000",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Welcome to Gakkcons!!!
            </Text>
            <Text style={styles.text}>
              Please proceed to the log in to start
            </Text>
          </View>
          <TouchableOpacity
            style={styles.buttonModal}
            onPress={handleWelcomeModalClose}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </CustomizedModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Viewport.width * 0.9,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
    alignSelf: "center",
  },
  logoContainer: {
    alignItems: "flex-start",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 17,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 12,
    width: Viewport.width * 0.3,
    alignSelf: "flex-end",
  },
  modalContent: {
    backgroundColor: "#ECE1DC",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  modalContentChild: {
    backgroundColor: "white",
    width: 300,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonModal: {
    marginTop: 20,
    backgroundColor: "#28A745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: Viewport.width * 0.4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  titleModal: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10,
  },
  codeInputContainer: {
    marginVertical: 15,
    width: "100%",
    alignItems: "center",
  },
  codeInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "80%",
    textAlign: "center",
    color: "#000",
  },
  helperText: {
    fontSize: 14,
    color: "#000",
    marginTop: 10,
  },
  retryText: {
    color: "#000",
    textDecorationLine: "underline",
  },
  timerText: {
    fontSize: 12,
    color: "#000",
    marginTop: 5,
  },
});

export default SignUpPage;
