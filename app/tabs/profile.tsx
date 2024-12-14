import EditProfile from "@/components/EditProfile";
import { Colors, FontSizes, Viewport } from "@/styles/styles";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function ProfileScreen() {
  const [isEditPressed, setIsEditPressed] = useState<Boolean>(false);

  return (
    <>
      <View
        style={{
          flexDirection: "column",
          width: Viewport.width * 1,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: isEditPressed ? 30 : 0,
        }}
      >
        <View style={{ position: "relative" }}>
          <Image
            source={require("@/assets/images/default-avatar.png")}
            style={{
              borderRadius: 100,
              width: Viewport.width * 0.45,
              height: Viewport.height * 0.23,
            }}
            resizeMode="contain"
          />

          <TouchableOpacity
            onPress={() => setIsEditPressed(true)}
            style={{
              position: "absolute",
              top: isEditPressed
                ? Viewport.height * 0.18
                : Viewport.height * 0.2,
              padding: isEditPressed ? 20 : 10,
              backgroundColor: "#9BA0A1",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: isEditPressed ? 100 : 10,
            }}
          >
            {isEditPressed ? (
              <AntDesign name="picture" size={24} color="white" />
            ) : (
              <Text
                style={{
                  color: "white",
                  fontSize: FontSizes.medium,
                  fontFamily: "Montserrat",
                  fontWeight: "semibold",
                }}
              >
                EDIT
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {isEditPressed ? (
          <EditProfile onSubmit={() => setIsEditPressed(false)} />
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
              STUDENT
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
                student01@mail.com
              </Text>
            </View>
            <TouchableOpacity
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
                Log out
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}
