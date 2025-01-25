import React, { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSegments, useFocusEffect } from "expo-router";
import { ActivityIndicator, Alert, View } from "react-native";
import { useGetProfileInfo } from "@/api/user/user.hooks";
import { removeToken } from "@/utils/token";
import { useSocket } from "@/contexts/SocketContext";

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const router = useRouter();
  const io = useSocket();
  const segments = useSegments();

  const currentPath = segments.join("/");
  const { data: userInfo, isLoading, refetch }: any = useGetProfileInfo();
  const queryClient = useQueryClient();
  const user = React.useMemo(() => userInfo?.[1] || [], [userInfo]);

  io.on("user_status", () => {
    refetch();
  });

  useFocusEffect(
    useCallback(() => {
      if (currentPath === "(auth)") return;

      if (!isLoading) {
        if (!user || !user.is_active) {
          queryClient.removeQueries({ queryKey: ["user"] });
          Alert.alert(
            "Your account is deactivated. Please contact admin for support."
          );
          removeToken();
          router.push("/(auth)");
          return;
        } else if (allowedRoles && !allowedRoles.includes(user.role)) {
          queryClient.removeQueries({ queryKey: ["user"] });
          Alert.alert(
            "Only students account can login with the mobile version."
          );
          removeToken();
          router.push("/(auth)");
          return;
        }
      }
    }, [currentPath, user, isLoading])
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
