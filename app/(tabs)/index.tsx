import { View, Text } from "react-native";
import { Colors, FontSizes, Viewport } from "@/styles/styles";
import CustomCalendar from "@/components/Calendar";

export default function CalendarScreen() {
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
          Student
        </Text>
      </View>

      <CustomCalendar />

      <View
        style={{
          backgroundColor: Colors.tertiaryBackground,
          width: Viewport.width * 0.93,
          height: Viewport.height * 0.2,
          alignSelf: "center",
          borderRadius: 10,
        }}
      ></View>
    </View>
  );
}
