import { useState } from "react";
import { Colors, FontSizes, Viewport } from "@/styles/styles";
import {
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";
import CustomizedModal from "@/components/CustomizedModal";

const teacherStatus = [
  {
    id: 1,
    isF2F: false,
    isOnline: true,
    name: "Teacher A",
    subject: "subject",
    isActive: true,
  },
  {
    id: 2,
    isF2F: false,
    isOnline: false,
    name: "Teacher B",
    subject: "subject",
    isActive: false,
  },
  {
    id: 3,
    isF2F: false,
    isOnline: false,
    name: "Teacher C",
    subject: "subject",
    isActive: false,
  },
  {
    id: 4,
    isF2F: true,
    isOnline: false,
    name: "Teacher C",
    subject: "subject",
    isActive: true,
  },
  {
    id: 5,
    isF2F: true,
    isOnline: true,
    name: "Teacher D",
    subject: "subject",
    isActive: true,
  },
  {
    id: 6,
    isF2F: true,
    isOnline: true,
    name: "Teacher E",
    subject: "subject",
    isActive: true,
  },
  {
    id: 7,
    isF2F: false,
    isOnline: false,
    name: "Teacher F",
    subject: "subject",
    isActive: false,
  },
];

export default function ConsultationScreen() {
  const [isRequestTeacherOpen, setIsRequestTeacherOpen] =
    useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>([]);

  const handleRequestTeacherOpen = (item: any) => {
    setIsRequestTeacherOpen(true);
    setSelectedTeacher(item);
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
            Consultation
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            gap: 15,
          }}
        >
          <View
            style={{
              position: "relative",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TextInput
              placeholder="search"
              placeholderTextColor={Colors.secondaryBackground}
              style={{
                backgroundColor: Colors.tertiaryBackground,
                width: Viewport.width * 0.75,
                height: Viewport.height * 0.06,
                color: Colors.secondaryBackground,
                fontFamily: "Montserrat",
                fontSize: FontSizes.small,
                borderRadius: 10,
                paddingLeft: 15,
              }}
            />
            <EvilIcons
              name="search"
              size={24}
              color={Colors.secondaryText}
              style={{
                position: "absolute",
                zIndex: 10,
                left: Viewport.width * 0.65,
              }}
            />
          </View>
          <Feather name="filter" size={40} color="black" />
        </View>
        <FlatList
          data={teacherStatus}
          style={{
            height: Viewport.height * 0.65,
            width: Viewport.width * 0.9,
            alignSelf: "center",
            flexGrow: 0,
          }}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={{
            backgroundColor: Colors.tertiaryBackground,
            paddingVertical: 15,
            borderRadius: 10,
            gap: 10,
          }}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              key={item.id}
              style={{
                backgroundColor: Colors.quaternaryBackground,
                width: Viewport.width * 0.83,
                height: Viewport.height * 0.1,
                alignSelf: "center",
                borderRadius: 10,
                flexDirection: "row",
                paddingTop: 5,
              }}
              onPress={() => handleRequestTeacherOpen(item)}
            >
              <Feather
                name="user"
                size={50}
                color="black"
                style={{ marginTop: 13, marginLeft: 15 }}
              />
              <View style={{ flexDirection: "column", marginLeft: 15 }}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Text
                    style={{
                      fontSize: Viewport.width * 0.02,
                      fontFamily: "Montserrat",
                      backgroundColor: item.isF2F
                        ? Colors.activeAccent
                        : Colors.secondaryText,
                      color: item.isF2F ? Colors.secondaryBackground : "black",
                      fontWeight: "500",
                      padding: 4,
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                    }}
                  >
                    F2F
                  </Text>
                  <Text
                    style={{
                      fontSize: Viewport.width * 0.02,
                      fontFamily: "Montserrat",
                      backgroundColor: item.isOnline
                        ? Colors.activeAccent
                        : Colors.secondaryText,
                      color: item.isOnline
                        ? Colors.secondaryBackground
                        : "black",
                      fontWeight: "500",
                      padding: 4,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                    }}
                  >
                    ONLINE
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: FontSizes.normal,
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: FontSizes.tiny,
                    fontFamily: "Montserrat",
                  }}
                >
                  {item.subject} / position
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: item.isActive ? "#15B31B" : "#CD1616",
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  alignSelf: "center",
                  marginLeft: Viewport.width * 0.23,
                }}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <CustomizedModal
        visible={isRequestTeacherOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsRequestTeacherOpen(false)}
      >
        <View
          style={{
            backgroundColor: Colors.primaryBackground,
            width: Viewport.width * 0.9,
            height: Viewport.height * 0.54,
            borderRadius: 10,
            padding: 20,
            gap: 15,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: Viewport.width * 0.8,
              height: Viewport.height * 0.08,
              alignSelf: "center",
              borderRadius: 10,
              flexDirection: "row",
              padding: 10,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Feather name="user" size={50} color="black" />
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontSize: FontSizes.normal,
                  fontWeight: "bold",
                  fontFamily: "Montserrat",
                }}
              >
                {selectedTeacher.name}
              </Text>
              <Text
                style={{
                  fontSize: FontSizes.tiny,
                  fontFamily: "Montserrat",
                }}
              >
                {selectedTeacher.subject} / position
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                height: Viewport.height * 0.025,
                alignSelf: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: Viewport.width * 0.02,
                  fontFamily: "Montserrat",
                  backgroundColor: selectedTeacher.isF2F
                    ? Colors.activeAccent
                    : Colors.secondaryText,
                  color: selectedTeacher.isF2F
                    ? Colors.secondaryBackground
                    : "black",
                  fontWeight: "500",
                  padding: 4,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
              >
                F2F
              </Text>
              <Text
                style={{
                  fontSize: Viewport.width * 0.02,
                  fontFamily: "Montserrat",
                  backgroundColor: selectedTeacher.isOnline
                    ? Colors.activeAccent
                    : Colors.secondaryText,
                  color: selectedTeacher.isOnline
                    ? Colors.secondaryBackground
                    : "black",
                  fontWeight: "500",
                  padding: 4,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              >
                ONLINE
              </Text>
            </View>
          </View>
          <TextInput
            placeholder="reason..."
            style={{
              backgroundColor: "white",
              color: "black",
              borderRadius: 10,
              width: Viewport.width * 0.8,
              height: Viewport.height * 0.3,
              fontSize: FontSizes.small,
              padding: 20,
              textAlignVertical: "top",
            }}
            multiline={true}
          />
          <TouchableOpacity
            style={{
              backgroundColor: Colors.buttonBGColor,
              width: Viewport.width * 0.5,
              height: Viewport.height * 0.07,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
            onPress={() => {
              setIsSuccess(true), setIsRequestTeacherOpen(false);
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Montserrat",
                fontSize: FontSizes.normal,
              }}
            >
              Send request
            </Text>
          </TouchableOpacity>
        </View>
      </CustomizedModal>
      <CustomizedModal
        visible={isSuccess}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsSuccess(false)}
      >
        <View
          style={{
            backgroundColor: Colors.primaryBackground,
            width: Viewport.width * 0.9,
            height: Viewport.height * 0.41,
            borderRadius: 10,
            padding: 20,
            gap: 15,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: Viewport.width * 0.8,
              height: Viewport.height * 0.27,
              alignSelf: "center",
              borderRadius: 10,
              padding: 10,
              alignItems: "center",
            }}
          >
            <Image source={require("@/assets/icons/smile.png")} />
            <Text
              style={{ fontFamily: "Montserrat", fontSize: FontSizes.normal }}
            >
              Request successfully sent.
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.buttonBGColor,
              width: Viewport.width * 0.5,
              height: Viewport.height * 0.07,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
            onPress={() => {
              setIsSuccess(false);
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Montserrat",
                fontSize: FontSizes.normal,
              }}
            >
              Ok
            </Text>
          </TouchableOpacity>
        </View>
      </CustomizedModal>
    </>
  );
}
