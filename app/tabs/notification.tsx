import { Colors, FontSizes, Viewport } from "@/styles/styles";
import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import CustomizedModal from "@/components/CustomizedModal";
import React, { useState } from "react";
import * as Clipboard from "expo-clipboard";

const notificationData = [
  {
    teacherName: "Teacher A",
    subject: "IT112 - Computer Programming 1",
    message:
      "Teacher A has accepted your consultation request. Venue: Onsite. Date: 12-07-24 at 10:00 am",
    link: "",
    date: "New",
  },
  {
    teacherName: "Teacher B",
    subject: "IT111 - Introduction to Computing",
    message:
      "Teacher B has accepted your consultation request. Venue: Online. Date: 12-08-24 at 03:00 pm",
    link: "https://zoom.us/j/1234567890?pwd=example1",
    date: "Yesterday",
  },
];

export default function NotificationScreen() {
  const [isNotifPressed, setIsNotifPressed] = useState<boolean>(false);
  const [selectedNotification, setSelectedNotification] = useState<any>([]);

  const handleNotification = (notif: any) => {
    setSelectedNotification(notif);
    setIsNotifPressed(true);
  };
  const handleCopyToClipboard = () => {
    if (selectedNotification.link) {
      Clipboard.setStringAsync(selectedNotification.link);
      Alert.alert("Copied to Clipboard", "The link has been copied!");
    } else {
      Alert.alert("Error", "No link to copy.");
    }
  };
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
          <Text
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              fontSize: FontSizes.large,
            }}
          >
            Notification
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
          style={{
            width: Viewport.width * 1,
            paddingVertical: 20,
          }}
        >
          {notificationData.map((notif) => (
            <TouchableOpacity
              onPress={() => handleNotification(notif)}
              key={notif.date}
              style={{
                height: Viewport.height * 0.2,
                width: Viewport.width * 1,
                paddingHorizontal: 15,
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  fontSize: FontSizes.medium,
                }}
              >
                {notif.date}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 15,
                  padding: 10,
                  borderRadius: 8,
                  flexWrap: "wrap",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#444444",
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Feather name="user" size={40} color="black" />
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                      fontSize: FontSizes.normal,
                    }}
                  >
                    {notif.teacherName}
                  </Text>

                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: FontSizes.small,
                      lineHeight: 20,
                    }}
                    numberOfLines={4}
                    ellipsizeMode="tail"
                  >
                    {notif.message}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <CustomizedModal
        visible={isNotifPressed}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsNotifPressed(false)}
      >
        <View
          style={{
            backgroundColor: Colors.primaryBackground,
            width: Viewport.width * 0.9,
            height: "auto",
            borderRadius: 10,
            padding: 20,
            gap: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 15,
              padding: 10,
              borderRadius: 8,
              flexWrap: "wrap",
            }}
          >
            <View
              style={{
                backgroundColor: "#444444",
                width: 70,
                height: 70,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="user" size={40} color="black" />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  fontSize: FontSizes.normal,
                }}
              >
                {selectedNotification.teacherName}
              </Text>

              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontSize: FontSizes.small,
                  lineHeight: 20,
                  flexWrap: "wrap",
                }}
              >
                {selectedNotification.subject}
              </Text>
            </View>
          </View>
          <ScrollView
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              width: Viewport.width * 0.8,
              height: Viewport.height * 0.3,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat",
                fontSize: FontSizes.small,
                lineHeight: 20,
                flexWrap: "wrap",
              }}
            >
              {selectedNotification.message}
            </Text>
          </ScrollView>
          {selectedNotification.link && (
            <>
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontSize: FontSizes.small,
                  lineHeight: 20,
                  flexWrap: "wrap",
                }}
              >
                Link:
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  width: Viewport.width * 0.8,
                  height: Viewport.height * 0.08,
                  padding: 20,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    width: Viewport.width * 0.65,
                    fontFamily: "Montserrat",
                    fontSize: FontSizes.small,
                  }}
                >
                  {selectedNotification.link.length > 28
                    ? `${selectedNotification.link.substring(0, 28)}...`
                    : selectedNotification.link}
                </Text>
                <TouchableOpacity onPress={handleCopyToClipboard}>
                  <Ionicons name="copy-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </>
          )}
          <TouchableOpacity
            onPress={() => setIsNotifPressed(false)}
            style={{
              backgroundColor: Colors.success,
              width: Viewport.width * 0.37,
              height: Viewport.height * 0.06,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: FontSizes.small }}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </CustomizedModal>
    </>
  );
}
