import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { Viewport } from "@/styles/styles";
import { useLocalSearchParams } from "expo-router";
import { validatePasswordInputs } from "@/utils/validations";
import { useResetPassword } from "@/api/auth/auth.hooks";
import { useToast } from "react-native-toast-notifications";

const NewPassword = () => {
  const router = useRouter();
  const toast = useToast();
  const searchParams = useLocalSearchParams();
  const { email } = searchParams;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetValidationErrors, setResetValidationErrors] = useState<any>({});

  const {
    mutate: resetMutate,
    isSuccess: isResetSuccess,
    isPending: isResetPending,
    isError: isResetError,
    error: resetErrors,
  } = useResetPassword();

  const handleSubmit = () => {
    const validationErrors = validatePasswordInputs(password, confirmPassword);
    if (Object.keys(validationErrors).length > 0) {
      setResetValidationErrors(validationErrors);
      return;
    }
    resetMutate({ email: String(email), newPassword: password });
  };
  useEffect(() => {
    let id: any;

    if (isResetPending) {
      if (!id) {
        id = toast.show("Please wait. Loading...", {
          type: "normal",
          placement: "top",
          animationType: "slide-in",
          normalColor: "gray",
        });
      }
    } else {
      if (id) {
        toast.hide(id);
        id = null;
      }

      if (isResetSuccess) {
        toast.show("Password reset successfully!", {
          type: "success",
          placement: "top",
          duration: 4000,
          animationType: "slide-in",
        });
        setTimeout(() => {
          router.push("/(auth)");
        }, 4000);
      }

      if (isResetError) {
        toast.show(resetErrors?.message, {
          type: "danger",
          placement: "top",
          duration: 4000,
          animationType: "slide-in",
        });
      }
    }

    return () => {
      if (id) {
        toast.hide(id);
      }
    };
  }, [isResetPending, isResetSuccess, isResetError, resetErrors]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>New Password</Text>

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
        {resetValidationErrors.password && (
          <Text style={styles.errorText}>{resetValidationErrors.password}</Text>
        )}
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
        {resetValidationErrors.confirmPassword && (
          <Text style={styles.errorText}>
            {resetValidationErrors.confirmPassword}
          </Text>
        )}

        <Button
          mode="contained"
          onPress={() => handleSubmit()}
          style={styles.button}
          buttonColor="#282726"
        >
          SUBMIT
        </Button>
      </View>
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
    marginBottom: 0,
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default NewPassword;
