import { Colors, Viewport } from "@/styles/styles";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";

const CustomCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [selected, setSelected] = useState("");

  const changeMonth = (monthsToAdd: any) => {
    const currentDate = new Date(currentMonth);
    currentDate.setMonth(currentDate.getMonth() + monthsToAdd);
    setCurrentMonth(currentDate.toISOString().split("T")[0]);
  };

  return (
    <Calendar
      hideArrows={true}
      initialDate={currentMonth}
      onMonthChange={(month: any) => {
        setCurrentMonth(month.dateString);
      }}
      style={{
        width: Viewport.width * 0.93,
        alignSelf: "center",
        borderRadius: 10,
      }}
      theme={{
        backgroundColor: Colors.tertiaryBackground,
        calendarBackground: Colors.tertiaryBackground,
        textSectionTitleColor: "#ccc",
        textMonthFontWeight: "bold",
        textMonthFontSize: 20,
        textDayHeaderFontWeight: "600",
        textDayHeaderFontSize: 14,
        arrowColor: "white",
        monthTextColor: "white",
      }}
      renderHeader={(date: any) => {
        const month = date.toString("MMMM");
        const year = date.getFullYear();

        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: Viewport.width * 0.85,
              paddingVertical: 20,
            }}
          >
            <View style={{ gap: 10, flexDirection: "row" }}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "Montserrat",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {year}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "Montserrat",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {month}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => changeMonth(-1)}>
                <View
                  style={{
                    backgroundColor: Colors.primaryBackground,
                    borderRadius: 5,
                    padding: 5,
                    marginRight: 10,
                  }}
                >
                  <Entypo name="chevron-left" size={24} color="black" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => changeMonth(1)}>
                <View
                  style={{
                    backgroundColor: Colors.primaryBackground,
                    borderRadius: 5,
                    padding: 5,
                  }}
                >
                  <Entypo name="chevron-right" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
      onDayPress={(day: any) => {
        setSelected(day.dateString);
      }}
      dayComponent={({ date, state }: any) => {
        const isSelected = selected === date.dateString;

        return (
          <TouchableOpacity
            disabled={state === "disabled" ? true : false}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: isSelected
                ? "#666"
                : state === "disabled"
                ? "#D1C8C3"
                : Colors.primaryBackground,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: isSelected
                  ? "white"
                  : state === "disabled"
                  ? "black"
                  : "black",
                fontWeight: "bold",
              }}
            >
              {date.day}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default CustomCalendar;
