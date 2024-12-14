import { FontSizes, Viewport } from "@/styles/styles";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";

interface EditProfileType {
  onSubmit: () => void;
}

const EditProfile: React.FC<EditProfileType> = ({ onSubmit }) => {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
            value={name}
            onChangeText={setName}
            mode="outlined"
            outlineColor="#282726"
            theme={{ colors: { primary: "#282726" } }}
            style={{ backgroundColor: "transparent" }}
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            mode="outlined"
            outlineColor="#282726"
            theme={{ colors: { primary: "#282726" } }}
            style={{ backgroundColor: "transparent" }}
          />
        </View>

        {/* Email Section */}
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
            label="email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            outlineColor="#282726"
            theme={{ colors: { primary: "#282726" } }}
            style={{ backgroundColor: "transparent" }}
          />
        </View>

        {/* Password Section */}
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
            label="*******"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            outlineColor="#282726"
            theme={{ colors: { primary: "#282726" } }}
            style={{ backgroundColor: "transparent" }}
          />
        </View>
      </View>

      {/* Submit Button */}
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
  );
};

export default EditProfile;
