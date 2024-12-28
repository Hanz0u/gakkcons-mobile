import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { TouchableOpacity } from "react-native";

import { Viewport } from "@/styles/styles";
import CustomizedModal from "@/components/CustomizedModal";
import { useForgotPassword, useVerifyUser } from "@/api/auth/auth.hooks";
import CodeInput from "@/components/CodeInput";

const ForgotPassword = () => {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [isCheckEmailVisible, setIsCheckEmailVisible] = useState(false);
  const [isVerificationCodeVisible, setIsVerificationCodeVisible] =
    useState(false);
  const [code, setCode] = useState<any>("");

  const {
    mutate: forgotMutate,
    isSuccess: isForgotSuccess,
    isPending: isForgotPending,
    isError: isForgotError,
    error: forgotErrors,
  } = useForgotPassword();

  const {
    mutate: verifyMutate,
    isSuccess: isVerifySucess,
    isPending: isVerifyPending,
    isError: isVerifyError,
    error: verifyErrors,
  } = useVerifyUser();

  const handleSubmit = () => {
    forgotMutate({ email: email });
  };

  useEffect(() => {
    let id: any;

    if (isForgotPending) {
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

      if (isForgotSuccess) {
        setIsCheckEmailVisible(true);
      }

      if (isForgotError) {
        toast.show(forgotErrors?.message, {
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
  }, [isForgotPending, isForgotSuccess, isForgotError, forgotErrors]);

  const handleCheckEmailClose = () => {
    setIsCheckEmailVisible(false);
    setIsVerificationCodeVisible(true);
  };

  const handleVerificationCodeClose = () => {
    if (code === "") {
      Alert.alert("Please input your verification code");
      return;
    }
    const singleStringCode = code.join("");
    verifyMutate({
      email: email,
      verificationCode: singleStringCode,
      codeType: "reset_password",
    });
  };

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
        router.push({
          pathname: "/(auth)/NewPassword",
          params: { email: email },
        });
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
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Forgot Password</Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          mode="outlined"
          outlineColor="#282726"
          theme={{ colors: { primary: "#282726" } }}
        />

        {/* Next Button */}
        <Button
          mode="contained"
          onPress={() => handleSubmit()}
          style={styles.button}
          buttonColor="#282726"
        >
          SUBMIT
        </Button>
      </View>

      <CustomizedModal
        visible={isCheckEmailVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCheckEmailClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalContentChild}>
            <Text style={styles.text}>
              Kindly check your email if you receive a code.
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

      <CustomizedModal
        visible={isVerificationCodeVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleVerificationCodeClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalContentChild}>
            <Text style={styles.titleModal}>Type the code:</Text>
            <CodeInput codeState={[code, setCode]} />
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

export default ForgotPassword;
