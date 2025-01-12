import { FontSizes, Viewport } from "@/styles/styles";
import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface EditProfileType {
  userDataState: [any, Dispatch<SetStateAction<any>>];
  validationErrors: any;
  onSubmit: () => void;
  onCancel: () => void;
}

const EditProfile: React.FC<EditProfileType> = ({
  userDataState,
  validationErrors,
  onSubmit,
  onCancel,
}) => {
  const [userData, setUserData] = userDataState;

  return (
    <View
      style={{
        width: Viewport.width * 0.9,
        justifyContent: "center",
        paddingHorizontal: 15,
        paddingVertical: 20,
        backgroundColor: "#1e1e1e",
        alignSelf: "center",
      }}
    >
      <Text
        style={{
          fontSize: FontSizes.normal,
          fontWeight: "bold",
          color: "white",
          marginBottom: 10,
          marginLeft: 15,
        }}
      >
        User Information
      </Text>

      <View style={{ backgroundColor: "white", borderRadius: 10 }}>
        <View
          style={{
            width: "90%",
            marginTop: 10,
            marginBottom: 15,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "black",
              marginBottom: 5,
            }}
          >
            Name
          </Text>

          <TextInput
            label="First Name"
            value={userData.firstName}
            onChangeText={(text) =>
              setUserData((prevState: any) => ({
                ...prevState,
                firstName: text,
              }))
            }
            mode="outlined"
            outlineColor="#282726"
            theme={{ colors: { primary: "#282726" } }}
            style={{ backgroundColor: "transparent" }}
          />
          <TextInput
            label="Last Name"
            value={userData.lastName}
            onChangeText={(text) =>
              setUserData((prevState: any) => ({
                ...prevState,
                lastName: text,
              }))
            }
            mode="outlined"
            outlineColor="#282726"
            theme={{ colors: { primary: "#282726" } }}
            style={{ backgroundColor: "transparent" }}
          />
        </View>

        <View style={{ width: "90%", marginBottom: 15, alignSelf: "center" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "black",
              marginBottom: 5,
            }}
          >
            Email
          </Text>
          <TextInput
            disabled
            label="email"
            value={userData.email}
            onChangeText={(text) =>
              setUserData((prevState: any) => ({
                ...prevState,
                email: text,
              }))
            }
            mode="outlined"
            outlineColor="#282726"
            theme={{ colors: { primary: "#282726" } }}
            style={{ backgroundColor: "transparent" }}
          />
        </View>

        <View style={{ width: "90%", marginBottom: 15, alignSelf: "center" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "black",
              marginBottom: 5,
            }}
          >
            Password
          </Text>
          <TextInput
            label="current password"
            value={userData.currentPassword}
            secureTextEntry
            onChangeText={(text) =>
              setUserData((prevState: any) => ({
                ...prevState,
                currentPassword: text,
              }))
            }
            mode="outlined"
            outlineColor="#282726"
            theme={{ colors: { primary: "#282726" } }}
            style={{ backgroundColor: "transparent" }}
          />
          <TextInput
            label="new password"
            value={userData.newPassword}
            secureTextEntry
            onChangeText={(text) =>
              setUserData((prevState: any) => ({
                ...prevState,
                newPassword: text,
              }))
            }
            mode="outlined"
            outlineColor="#282726"
            theme={{ colors: { primary: "#282726" } }}
            style={{ backgroundColor: "transparent" }}
          />
          {validationErrors.newPassword && (
            <Text style={{ color: "red", fontSize: 12 }}>
              {validationErrors.newPassword}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          gap: 15,
        }}
      >
        <Button
          mode="contained"
          onPress={onCancel}
          style={{
            borderRadius: 8,
            paddingHorizontal: 10,
            width: Viewport.width * 0.3,
            alignSelf: "center",
            marginTop: 10,
          }}
          buttonColor="gray"
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={onSubmit}
          style={{
            borderRadius: 8,
            paddingHorizontal: 10,
            width: Viewport.width * 0.3,
            alignSelf: "center",
            marginTop: 10,
          }}
          buttonColor="#00C853"
        >
          DONE
        </Button>
      </View>
    </View>
  );
};

export default EditProfile;
