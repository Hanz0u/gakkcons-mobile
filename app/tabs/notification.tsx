import { Colors, FontSizes, Viewport } from "@/styles/styles";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  RefreshControl,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import CustomizedModal from "@/components/CustomizedModal";
import React, { useEffect, useState } from "react";
import * as Clipboard from "expo-clipboard";
import {
  useGetNotifications,
  useNotification,
} from "@/api/notification/notification.hooks";
import { useSocket } from "@/contexts/SocketContext";

export default function NotificationScreen() {
  const io = useSocket();
  const [isNotifPressed, setIsNotifPressed] = useState<boolean>(false);
  const [selectedNotification, setSelectedNotification] = useState<any>([]);
  const {
    data: notificationData,
    isLoading: isGetNotificationLoading,
    refetch,
  } = useGetNotifications();

  const handleNotification = (notif: any) => {
    setSelectedNotification(notif);
    setIsNotifPressed(true);
  };
  const handleCopyToClipboard = () => {
    if (selectedNotification.meet_link) {
      Clipboard.setStringAsync(selectedNotification.meet_link);
      Alert.alert("Copied to Clipboard", "The link has been copied!");
    } else {
      Alert.alert("Error", "No link to copy.");
    }
  };
  useNotification();

  useEffect(() => {
    refetch();
  }, []);

  io.on("notification", () => {
    refetch();
  });

  const notifications = React.useMemo(() => {
    if (!notificationData || !Array.isArray(notificationData)) return [];
    return Array.isArray(notificationData[1]) ? notificationData[1] : [];
  }, [notificationData]);

  const formatGroupLabel = (date: any) => {
    const now = moment();
    const notificationDate = moment(date);

    if (notificationDate.isSame(now, "day")) {
      return "Today";
    } else if (notificationDate.isSame(moment().subtract(1, "day"), "day")) {
      return "Yesterday";
    } else if (now.diff(notificationDate, "days") < 4) {
      return `${now.diff(notificationDate, "days")} days ago`;
    } else {
      return notificationDate.format("MMM DD, YYYY");
    }
  };

  const groupNotificationsByDate = (notifications: any) => {
    return notifications.reduce((groups: any, notif: any) => {
      const label = formatGroupLabel(notif.updated_at);
      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(notif);
      return groups;
    }, {});
  };

  const groupedNotifications = groupNotificationsByDate(notifications);

  const onRefresh = React.useCallback(() => {
    refetch();
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          gap: 20,
          paddingTop: Viewport.height * 0.05,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingLeft: 25,
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
            gap: 0,
          }}
          style={{
            width: Viewport.width * 1,
            paddingVertical: 20,
          }}
          refreshControl={
            <RefreshControl
              refreshing={isGetNotificationLoading}
              onRefresh={onRefresh}
            />
          }
        >
          {notifications.length === 0 && (
            <Text
              style={{
                fontFamily: "Montserrat",
                fontSize: FontSizes.normal,
              }}
            >
              No notification at the moment.
            </Text>
          )}
          <View>
            {Object.entries(groupedNotifications).map(([date, notifs]: any) => (
              <View key={date}>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    fontSize: FontSizes.medium,
                    paddingLeft: 30,
                  }}
                >
                  {date}
                </Text>

                {notifs.map((notif: any) => (
                  <TouchableOpacity
                    onPress={() => handleNotification(notif)}
                    key={notif.appointment_id}
                    style={{
                      height: Viewport.height * 0.2,
                      width: Viewport.width * 1,
                      paddingHorizontal: 15,
                      gap: 20,
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
                          alignSelf: "center",
                        }}
                      >
                        <Feather name="user" size={40} color="gray" />
                      </View>

                      <View style={{ flex: 1, flexDirection: "column" }}>
                        <Text
                          style={{
                            fontFamily: "Montserrat",
                            fontWeight: "bold",
                            fontSize: FontSizes.normal,
                          }}
                        >
                          {notif.faculty_name}
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
                          {notif.status === "Confirmed" &&
                            `${
                              notif.faculty_name
                            } has accepted your consultation request. Venue: ${
                              notif.mode
                            }. Date: ${moment(notif.scheduled_date).format(
                              "MMM DD, YYYY [at] hh:mm A"
                            )}`}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
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
                {selectedNotification.faculty_name}
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
              {selectedNotification.status === "Confirmed" &&
                `${selectedNotification.faculty_name} has accepted your consultation request. Venue: ${selectedNotification.mode}`}
            </Text>
          </ScrollView>
          {selectedNotification.meet_link && (
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
                  {selectedNotification.meet_link.length > 28
                    ? `${selectedNotification.meet_link.substring(0, 28)}...`
                    : selectedNotification.meet_link}
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
