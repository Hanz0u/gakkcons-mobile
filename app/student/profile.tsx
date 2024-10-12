import { Colors, FontSizes, Viewport } from "@/styles/styles";
import { Feather } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          gap: 20,
          paddingTop: Viewport.height * 0.08,
          alignItems: "center",
        }}
      >
        <View style={{ width: Viewport.width * 0.9 }}>
          <TouchableOpacity>
            <Feather
              name="settings"
              size={38}
              color="black"
              style={{ alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "column",
            width: Viewport.width * 0.9,
            alignItems: "center",
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
              style={{
                position: "absolute",
                top: Viewport.height * 0.2,
                width: Viewport.width * 0.2,
                height: Viewport.height * 0.06,
                backgroundColor: "#9BA0A1",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                borderRadius: 10,
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
                EDIT
              </Text>
            </TouchableOpacity>
          </View>
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
              Student ID No.:
            </Text>
            <Text
              style={{
                fontSize: FontSizes.small,
                color: "#282726",
              }}
            >
              20XXXXXXXX
            </Text>
          </View>
          <View
            style={{
              marginTop: Viewport.height * 0.05,
              backgroundColor: "#282726",
              width: Viewport.width * 0.9,
              height: Viewport.height * 0.4,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: Viewport.width * 0.8,
                padding: 10,
              }}
            >
              <Text
                style={{
                  width: Viewport.width * 0.45,
                  fontSize: FontSizes.small,
                  fontFamily: "Montserrat",
                  fontWeight: "semibold",
                  color: "white",
                }}
              >
                Consultation Request Details
              </Text>
              <Image source={require("@/assets/icons/clipboard-check.png")} />
            </View>
            <View
              style={{
                backgroundColor: Colors.quaternaryBackground,
                width: Viewport.width * 0.8,
                height: Viewport.height * 0.4,
                borderRadius: 10,
              }}
            ></View>
          </View>
        </View>
      </View>
    </>
  );
}
