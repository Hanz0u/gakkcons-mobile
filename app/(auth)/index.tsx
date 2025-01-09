import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";

import { Viewport } from "@/styles/styles";
import { useLoginUser, useVerifyUser } from "@/api/auth/auth.hooks";
import CustomizedModal from "@/components/CustomizedModal";
import CodeInput from "@/components/CodeInput";
import { getToken } from "@/utils/token";

const LoginPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchToken = async () => {
        const token = await getToken();
        setToken(token);
      };

      fetchToken();
    }, [])
  );

  useEffect(() => {
    if (token) {
      router.push("/tabs");
    }
  }, [token, router]);

  const [isVerificationCodeVisible, setIsVerificationCodeVisible] =
    useState(false);
  const [code, setCode] = useState<any>("");

  const {
    mutate: loginMutate,
    isSuccess: isLoginSucess,
    isPending: isLoginPending,
    isError: isLoginError,
    error: loginErrors,
  } = useLoginUser();

  const {
    mutate: verifyMutate,
    isSuccess: isVerifySucess,
    isPending: isVerifyPending,
    isError: isVerifyError,
    error: verifyErrors,
  } = useVerifyUser();

  const handleLogin = () => {
    loginMutate({ email: email, password: password });
  };

  const handleVerificationCodeSubmit = () => {
    if (code === "") {
      Alert.alert("Please input your verification code");
      return;
    }
    const singleStringCode = code.join("");
    verifyMutate({
      email: email,
      verificationCode: singleStringCode,
      codeType: "signup_verify_user",
    });
  };

  useEffect(() => {
    let id: any;

    if (isLoginPending) {
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

      if (isLoginSucess) {
        id = toast.show("Sucessfully logged in.", {
          type: "success",
          placement: "top",
          animationType: "slide-in",
        });
        router.push("/tabs");
      }

      if (isLoginError) {
        if (loginErrors?.message.includes("User is not verified yet.")) {
          setIsVerificationCodeVisible(true);
        }
        toast.show(loginErrors?.message, {
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
  }, [isLoginPending, isLoginSucess, isLoginError, loginErrors]);

  useEffect(() => {
    let id: any;

    if (isVerifyPending) {
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

      if (isVerifySucess) {
        setIsVerificationCodeVisible(false);
        router.push("/tabs");
      }

      if (isVerifyError) {
        setIsVerificationCodeVisible(true);
        toast.show(verifyErrors?.message, {
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
  }, [isVerifyPending, isVerifySucess, isVerifyError, verifyErrors]);

  return (
    <>
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

      <CustomizedModal
        visible={isVerificationCodeVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleVerificationCodeSubmit}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalContentChild}>
            <Text style={styles.titleModal}>
              It looks like your account hasn't been verified yet. Please check
              your email for the verification code and enter it here:
            </Text>
            <CodeInput codeState={[code, setCode]} />
            <Text style={styles.helperText}>
              I don't have receive a code?{" "}
              <Text style={styles.retryText}>retry</Text>
            </Text>
            <Text style={styles.timerText}>
              wait! resending the verification code to your email. 1:00
            </Text>
          </View>
          <TouchableOpacity
            style={styles.buttonModal}
            onPress={handleVerificationCodeSubmit}
          >
            <Text style={styles.buttonText}>DONE</Text>
          </TouchableOpacity>
        </View>
      </CustomizedModal>
    </>
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
  titleModal: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10,
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
});

export default LoginPage;
