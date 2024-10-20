import CustomizedModal from "@/components/CustomizedModal";
import { useState } from "react";
import { Colors, FontSizes, Viewport } from "@/styles/styles";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome5, Feather, Fontisto, AntDesign } from "@expo/vector-icons";

export default function HomeScreen() {
  const [isConsultationNotStarted, setIsConsultationNotStarted] =
    useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  return (
    <>
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
              gap: 50,
            }}
          >
            <View
              style={{
                borderRadius: 10,
                width: Viewport.width * 0.8,
                height: Viewport.height * 0.5,
                backgroundColor: Colors.quaternaryBackground,
                paddingTop: Viewport.height * 0.03,
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                  width: Viewport.width * 0.7,
                  gap: 15,
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
                  <Text style={{ fontFamily: "Montserrat" }}>
                    ID: 20XXXXXXXX
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: Colors.secondaryBackground,
                  width: Viewport.width * 0.65,
                  height: Viewport.height * 0.3,
                  alignSelf: "center",
                  borderRadius: 10,
                  padding: 15,
                  gap: 10,
                }}
              >
                <ScrollView style={{ height: Viewport.height * 0.23 }}>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </Text>
                </ScrollView>
                <Text style={{ textAlign: "right" }}>XX-XX-20XX</Text>
              </View>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  marginRight: Viewport.height * 0.025,
                  backgroundColor: Colors.error,
                  width: Viewport.width * 0.28,
                  height: Viewport.height * 0.04,
                  justifyContent: "center",
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontFamily: "Montserrat",
                    fontSize: FontSizes.tiny,
                  }}
                >
                  REPORT!
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ alignSelf: "center", flexDirection: "row", gap: 20 }}
            >
              <TouchableOpacity
                onPress={() => setIsAccepted(true)}
                style={{
                  backgroundColor: Colors.success,
                  width: Viewport.width * 0.33,
                  height: Viewport.height * 0.1,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <Feather name="check-circle" size={40} color="white" />
                <Text style={{ color: "white", fontSize: FontSizes.small }}>
                  ACCEPT
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.error,
                  width: Viewport.width * 0.33,
                  height: Viewport.height * 0.1,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <Fontisto name="close" size={40} color="white" />
                <Text style={{ color: "white", fontSize: FontSizes.small }}>
                  REJECT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <CustomizedModal
        visible={isAccepted}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsAccepted(false)}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View
          style={{
            backgroundColor: Colors.primaryBackground,
            width: Viewport.width * 0.85,
            height: Viewport.height * 0.41,
            borderRadius: 10,
            padding: 20,
            gap: 15,
          }}
        >
          <View style={{ flexDirection: "row", gap: 60 }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primaryBackground,
                width: Viewport.width * 0.08,
                height: Viewport.height * 0.04,
                shadowColor: "#000", // Shadow for iOS
                shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
                shadowOpacity: 0.25, // Shadow for iOS
                shadowRadius: 3.84, // Shadow for iOS
                elevation: 5, // Shadow for Android
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <FontAwesome5 name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
            {/* <View
              style={{
                width: Viewport.width * 0.25,
                height: Viewport.height * 0.04,
                backgroundColor: "#09242E",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderRadius: 10,
                gap: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: "#E1C76B",
                  width: Viewport.width * 0.08,
                  height: Viewport.height * 0.02,
                  borderRadius: 10,
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: FontSizes.tiny,
                  fontWeight: "bold",
                }}
              >
                ONLINE
              </Text>
            </View> */}
            <View
              style={{
                width: Viewport.width * 0.25,
                height: Viewport.height * 0.04,
                backgroundColor: "#E1C76B",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderRadius: 10,
                gap: 5,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: FontSizes.small,
                  fontWeight: "bold",
                }}
              >
                F2F
              </Text>
              <View
                style={{
                  backgroundColor: "#09242E",
                  width: Viewport.width * 0.08,
                  height: Viewport.height * 0.02,
                  borderRadius: 10,
                }}
              />
            </View>
          </View>
        </View>
      </CustomizedModal>
    </>
  );
}
