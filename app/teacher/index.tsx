import CustomizedModal from "@/components/CustomizedModal";
import { useState } from "react";
import { Colors, FontSizes, Viewport } from "@/styles/styles";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function HomeScreen() {
  const [isConsultationNotStarted, setIsConsultationNotStarted] =
    useState(true);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        gap: 20,
        paddingTop: Viewport.height * 0.08,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingLeft: 15,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.tertiaryBackground,
            width: 50,
            height: 50,
            borderRadius: 100,
          }}
        />
        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            fontSize: FontSizes.large,
          }}
        >
          Teacher
        </Text>
      </View>
      <CustomizedModal
        visible={isConsultationNotStarted}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {}}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", gap: 50 }}
      >
        <Text
          style={{
            fontFamily: "Montserrat",
            fontSize: FontSizes.large,
            fontWeight: "bold",
            textAlign: "center",
            width: Viewport.width * 0.5,
          }}
        >
          Start consultation time?
        </Text>
        <TouchableOpacity
          onPress={() => setIsConsultationNotStarted(false)}
          style={{
            width: Viewport.width * 0.35,
            height: Viewport.height * 0.06,
            backgroundColor: "#4C8A98",
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
            OK
          </Text>
        </TouchableOpacity>
      </CustomizedModal>
      {!isConsultationNotStarted && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: Viewport.width * 1,
            height: Viewport.height * 0.8,
          }}
        >
          <View
            style={{
              borderRadius: 10,
              width: Viewport.width * 0.8,
              height: Viewport.height * 0.5,
              backgroundColor: Colors.quaternaryBackground,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="user-circle" size={60} color="black" />
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    fontSize: FontSizes.normal,
                  }}
                >
                  Student A
                </Text>
                <Text style={{ fontFamily: "Montserrat" }}>ID: 20XXXXXXXX</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
