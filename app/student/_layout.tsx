import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import React from "react";
import { Colors, Viewport } from "@/styles/styles";

const renderIcon = (iconSource: any, focused: boolean) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image source={iconSource} />
      {focused && (
        <View
          style={{
            height: 3,
            backgroundColor: "#4C8A98",
            width: 40,
            marginTop: 4,
          }}
        />
      )}
    </View>
  );
};

export default function StudentTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Viewport.height * 0.09,
          borderWidth: 1,
          borderRadius: 10,
          width: Viewport.width * 0.93,
          backgroundColor: Colors.tertiaryBackground,
          marginBottom: Viewport.height * 0.01,
          alignSelf: "center",
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => {
            const iconSource = focused
              ? require("@/assets/icons/navigation/calendar/active.png")
              : require("@/assets/icons/navigation/calendar/inactive.png");
            return renderIcon(iconSource, focused);
          },
        }}
      />
      <Tabs.Screen
        name="consultation"
        options={{
          tabBarIcon: ({ focused }) => {
            const iconSource = focused
              ? require("@/assets/icons/navigation/consultation/active.png")
              : require("@/assets/icons/navigation/consultation/inactive.png");

            return renderIcon(iconSource, focused);
          },
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarIcon: ({ focused }) => {
            const iconSource = focused
              ? require("@/assets/icons/navigation/notification/active.png")
              : require("@/assets/icons/navigation/notification/inactive.png");

            return renderIcon(iconSource, focused);
          },
        }}
      />
      <Tabs.Screen
        name="student-profile"
        options={{
          tabBarIcon: ({ focused }) => {
            const iconSource = focused
              ? require("@/assets/icons/navigation/profile/active.png")
              : require("@/assets/icons/navigation/profile/inactive.png");

            return renderIcon(iconSource, focused);
          },
        }}
      />
    </Tabs>
  );
}
