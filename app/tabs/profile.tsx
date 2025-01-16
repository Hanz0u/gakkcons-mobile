import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";

import EditProfile from "@/components/EditProfile";
import { Colors, FontSizes, Viewport } from "@/styles/styles";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useGetProfileInfo, useUpdateProfileInfo } from "@/api/user/user.hooks";
import { validateUpdatePasswordInputs } from "@/utils/validations";
import { removeToken } from "@/utils/token";
import { socket } from "@/contexts/SocketContext";
import { useNotification } from "@/api/notification/notification.hooks";

export default function ProfileScreen() {
  const router = useRouter();
  const toast = useToast();
  const { data: userInfo }: any = useGetProfileInfo();
  const [updateUserValidationErrors, setUpdateUserValidationErrors] =
    useState<any>({});
  useNotification();
  const user = React.useMemo(() => {
    if (!userInfo) return [];
    return userInfo[1] || [];
  }, [userInfo]);

  const [userData, setUserData] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    currentPassword: "",
    newPassword: "",
  });
  const [isEditPressed, setIsEditPressed] = useState<Boolean>(false);

  const {
    mutate: updateProfileMutate,
    isSuccess: isUpdateProfileSuccess,
    isPending: isUpdateProfilePending,
    isError: isUpdateProfileError,
    error: updateProfileErrors,
  } = useUpdateProfileInfo();

  const handleSubmit = () => {
    const validationErrors = validateUpdatePasswordInputs(
      userData.currentPassword,
      userData.newPassword
    );
    if (Object.keys(validationErrors).length > 0) {
      setUpdateUserValidationErrors(validationErrors);
      return;
    }
    updateProfileMutate({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      currentPassword: userData.currentPassword,
      newPassword: userData.newPassword,
    });
  };

  useEffect(() => {
    let id: any;

    if (isUpdateProfilePending) {
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

      if (isUpdateProfileSuccess) {
        setUpdateUserValidationErrors([]);
        setUserData((prevState: any) => ({
          ...prevState,
          currentPassword: "",
          newPassword: "",
        }));
        toast.show("Profile updated successfully!", {
          type: "success",
          placement: "top",
          duration: 4000,
          animationType: "slide-in",
        });
      }

      if (isUpdateProfileError) {
        toast.show(updateProfileErrors?.message, {
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
  }, [
    isUpdateProfilePending,
    isUpdateProfileSuccess,
    isUpdateProfileError,
    updateProfileErrors,
  ]);

  return (
    <>
      <View
        style={{
          flexDirection: "column",
          width: Viewport.width * 1,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: isEditPressed ? 20 : 0,
        }}
      >
        <View style={{ position: "relative" }}>
          <View
            style={{
              borderRadius: 100,
              width: isEditPressed
                ? Viewport.width * 0.3
                : Viewport.width * 0.45,
              height: isEditPressed
                ? Viewport.height * 0.15
                : Viewport.height * 0.23,
              backgroundColor: Colors.tertiaryBackground,
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Feather
              name="user"
              size={!isEditPressed ? 100 : 80}
              color="gray"
              style={{ alignSelf: "center" }}
            />
          </View>

          {!isEditPressed && (
            <TouchableOpacity
              onPress={() => setIsEditPressed(true)}
              style={{
                position: "absolute",
                top: isEditPressed
                  ? Viewport.height * 0.1
                  : Viewport.height * 0.2,
                padding: isEditPressed ? 20 : 10,
                backgroundColor: "#9BA0A1",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                borderRadius: isEditPressed ? 100 : 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: FontSizes.medium,
                  fontFamily: "Montserrat",
                  fontWeight: "semibold",
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {isEditPressed ? (
          <EditProfile
            userDataState={[userData, setUserData]}
            validationErrors={updateUserValidationErrors}
            onSubmit={handleSubmit}
            onCancel={() => setIsEditPressed(false)}
          />
        ) : (
          <>
            <Text
              style={{
                marginTop: Viewport.height * 0.04,
                fontSize: FontSizes.extraLarge,
                fontWeight: "bold",
                color: "#282726",
              }}
            >
              {user.first_name} {user.last_name}
            </Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Text
                style={{
                  fontSize: FontSizes.small,
                  color: "#282726",
                }}
              >
                Email:
              </Text>
              <Text
                style={{
                  fontSize: FontSizes.small,
                  color: "#282726",
                }}
              >
                {user.email}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                removeToken();
                router.push("/(auth)");
                socket.disconnect();
              }}
              style={{
                backgroundColor: Colors.error,
                flexDirection: "row",
                padding: 15,
                gap: 10,
                borderRadius: 10,
                marginTop: Viewport.height * 0.04,
              }}
            >
              <Feather name="log-out" size={24} color="white" />
              <Text
                style={{
                  fontSize: FontSizes.small,
                  color: "white",
                }}
              >
                Log Out
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}
