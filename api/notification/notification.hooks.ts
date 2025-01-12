import React from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "./notification.requests";
import { useSocket } from "@/contexts/SocketContext";

export function useNotification() {
  const io = useSocket();
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const setupNotifications = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          if (isActive) alert("No notification permissions!");
          return;
        }

        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        }

        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
          }),
        });
      };

      setupNotifications();

      const responseListener =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const route = response.notification.request.content.data.route; // Route path

          if (route) {
            router.push(route); // Navigate to /notification
          }
        });

      const handleNotification = (message: any) => {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Appointment confirmed",
            body: message.text,
            data: { route: message.route },
          },
          trigger: null,
        });
      };

      io.on("notification", handleNotification);

      return () => {
        isActive = false;
        io.off("notification", handleNotification);
        responseListener.remove();
      };
    }, [io, router])
  );
}

export function useGetNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const result = await getNotifications();
      if (result[0] !== true) {
        return Promise.reject(new Error(result[1]));
      }
      return result;
    },
    enabled: false,
  });
}
