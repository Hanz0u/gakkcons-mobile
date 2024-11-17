import { View, Text, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, FontSizes, Viewport } from "@/styles/styles";

const consultationData = [
  {
    id: "1",
    student_id: "2020300100",
    student_name: "Student A",
    reason: "Thesis consultation",
    date: "11-10-2024",
    mode: "F2F",
  },
  {
    id: "2",
    student_id: "2020300201",
    student_name: "Student B",
    reason: "Career counseling",
    date: "11-11-2024",
    mode: "ONLINE",
  },
  {
    id: "3",
    student_id: "2020300302",
    student_name: "Student C",
    reason: "Financial aid assistance",
    date: "11-12-2024",
    mode: "F2F",
  },
  {
    id: "4",
    student_id: "2020300403",
    student_name: "Student D",
    reason: "Academic advising",
    date: "11-13-2024",
    mode: "ONLINE",
  },
  {
    id: "5",
    student_id: "2020300504",
    student_name: "Student E",
    reason: "Thesis consultation",
    date: "11-14-2024",
    mode: "F2F",
  },
];

export default function ConsultationQueueScreen() {
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
        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            fontSize: FontSizes.large,
          }}
        >
          Consultation Queue
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          gap: 15,
        }}
        style={{
          backgroundColor: "transparent",
          width: Viewport.width * 1,
          height: Viewport.height * 0.3,
          alignSelf: "center",
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        {consultationData.map((consult) => (
          <View
            style={{
              backgroundColor: Colors.quaternaryBackground,
              width: Viewport.width * 0.8,
              height: Viewport.height * 0.2,
              borderRadius: 20,
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingTop: 30,
              gap: 20,
            }}
          >
            <View
              style={{ flexDirection: "column", alignItems: "center", gap: 5 }}
            >
              <FontAwesome5 name="user-circle" size={70} color="black" />
              <Text
                style={{
                  letterSpacing: 0,
                  fontSize: FontSizes.tiny,
                  fontWeight: "semibold",
                }}
              >
                ID: {consult.student_id}
              </Text>
            </View>
            <View
              style={{ flexDirection: "column", alignItems: "center", gap: 5 }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontSize: FontSizes.medium,
                  fontWeight: "bold",
                  alignSelf: "flex-start",
                }}
              >
                {consult.student_name}
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  width: Viewport.width * 0.4,
                  height: Viewport.height * 0.07,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Montserrat",
                    fontSize: FontSizes.small,
                    fontWeight: "bold",
                    color: Colors.success,
                  }}
                >
                  CONSULTATION ONGOING
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
