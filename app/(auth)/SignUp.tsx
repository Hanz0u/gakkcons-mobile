import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import { Viewport } from "@/styles/styles";
import CustomizedModal from "@/components/CustomizedModal";
import { TouchableOpacity } from "react-native";
import { useSignupUser, useVerifyUser } from "@/api/auth/auth.hooks";
import { validateInputs } from "@/utils/validations";

const SignUpPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "student",
  });

  const {
    mutate: signupMutate,
    isSuccess: isSignupSucess,
    isPending: isSignupPending,
    isError: isSignupError,
    error: signUpErrors,
  } = useSignupUser();
  const {
    mutate: verifyMutate,
    isSuccess: isVerifySucess,
    isPending: isVerifyPending,
    isError: isVerifyError,
    error: verifyErrors,
  } = useVerifyUser();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCheckEmailVisible, setIsCheckEmailVisible] = useState(false);
  const [isVerificationCodeVisible, setIsVerificationCodeVisible] =
    useState(false);
  const [code, setCode] = useState<any>("");
  const [isWelcomeModalVisible, setIsWelcomeModalVisible] = useState(false);
  const [signupValidationErrors, setSignupValidationErrors] = useState<any>({});

  const handleCheckEmailClose = () => {
    setIsCheckEmailVisible(false);
    setIsVerificationCodeVisible(true);
  };

  const handleWelcomeModalClose = () => {
    setIsWelcomeModalVisible(false);
    router.push("/(auth)");
  };

  const handleSignUp = () => {
    const validationErrors = validateInputs(data, confirmPassword);
    if (Object.keys(validationErrors).length > 0) {
      setSignupValidationErrors(validationErrors);
      return;
    }
    signupMutate(data);
  };

  useEffect(() => {
    let id: any;

    if (isSignupPending) {
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

      if (isSignupSucess) {
        setIsCheckEmailVisible(true);
      }

      if (isSignupError) {
        toast.show(signUpErrors?.message, {
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
  }, [isSignupPending, isSignupSucess, isSignupError, signUpErrors]);

  const nextInputRef: any = Array(6)
    .fill(null)
    .map(() => React.createRef());

  const handleCodeChange = (text: any, index: any) => {
    const newCode: any = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      nextInputRef[index + 1]?.current?.focus();
    }
  };

  const handleKeyPress = (nativeEvent: any, index: any) => {
    if (nativeEvent.key === "Backspace") {
      const newCode: any = [...code];
      newCode[index] = "";
      setCode(newCode);

      if (index > 0) {
        nextInputRef[index - 1]?.current?.focus();
      }
    }
  };

  const handleVerificationCodeSubmit = () => {
    const singleStringCode = code.join("");
    verifyMutate({ email: data.email, verificationCode: singleStringCode });
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
        setIsWelcomeModalVisible(true);
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

        <Text style={styles.title}>REGISTRATION</Text>
        <TextInput
          label="First Name"
          value={data.firstName}
          onChangeText={(text) =>
            setData((prevState) => ({
              ...prevState,
              firstName: text,
            }))
          }
          style={styles.input}
          mode="outlined"
          outlineColor="#282726"
          theme={{ colors: { primary: "#282726" } }}
        />
        {signupValidationErrors.firstName && (
          <Text style={styles.errorText}>
            {signupValidationErrors.firstName}
          </Text>
        )}
        <TextInput
          label="Last Name"
          value={data.lastName}
          onChangeText={(text) =>
            setData((prevState) => ({
              ...prevState,
              lastName: text,
            }))
          }
          style={styles.input}
          mode="outlined"
          outlineColor="#282726"
          theme={{ colors: { primary: "#282726" } }}
        />
        {signupValidationErrors.lastName && (
          <Text style={styles.errorText}>
            {signupValidationErrors.lastName}
          </Text>
        )}
        <TextInput
          label="Email"
          value={data.email}
          onChangeText={(text) =>
            setData((prevState) => ({
              ...prevState,
              email: text,
            }))
          }
          style={styles.input}
          mode="outlined"
          outlineColor="#282726"
          theme={{ colors: { primary: "#282726" } }}
        />
        {signupValidationErrors.email && (
          <Text style={styles.errorText}>{signupValidationErrors.email}</Text>
        )}
        <TextInput
          label="Password"
          value={data.password}
          onChangeText={(text) =>
            setData((prevState) => ({
              ...prevState,
              password: text,
            }))
          }
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
        {signupValidationErrors.password && (
          <Text style={styles.errorText}>
            {signupValidationErrors.password}
          </Text>
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
        {signupValidationErrors.confirmPassword && (
          <Text style={styles.errorText}>
            {signupValidationErrors.confirmPassword}
          </Text>
        )}

        <Button
          mode="contained"
          onPress={handleSignUp}
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

      <CustomizedModal
        visible={isVerificationCodeVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleVerificationCodeSubmit}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalContentChild}>
            <Text style={styles.titleModal}>Type the code:</Text>
            <View style={styles.codeInputContainer}>
              {[...Array(6)].map((_, index) => (
                <TextInput
                  key={index}
                  ref={nextInputRef[index]}
                  style={styles.codeInput}
                  maxLength={1}
                  value={code[index] || ""}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent, index)
                  }
                  placeholder=""
                  placeholderTextColor="#999"
                />
              ))}
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
            onPress={handleVerificationCodeSubmit}
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
              source={require("../../assets/images/logo.png")}
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
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  codeInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "15%",
    backgroundColor: "white",
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

export default SignUpPage;
