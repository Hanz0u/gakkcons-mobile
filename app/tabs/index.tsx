import React, { useState } from "react";
import { Colors, FontSizes, Viewport } from "@/styles/styles";
import {
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import { EvilIcons, Feather, Fontisto } from "@expo/vector-icons";
import CustomizedModal from "@/components/CustomizedModal";
import { useGetTeachers } from "@/api/teacher/teacher.hooks";

export default function ConsultationScreen() {
  const [isRequestTeacherOpen, setIsRequestTeacherOpen] =
    useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>([]);
  const [isProceedNotPressed, setIsProceedNotPressed] = useState<boolean>(true);
  const [isTeacherBusy, setIsTeacherBusy] = useState<boolean>(false);

  const { data: teacherData, isSuccess: isGetTeacherSuccess }: any =
    useGetTeachers();

  const handleRequestTeacherOpen = (item: any) => {
    setSelectedTeacher(item);
    setIsRequestTeacherOpen(true);
  };

  const handleProceed = () => {
    if (selectedTeacher.schedule && selectedTeacher.schedule.length > 4) {
      if (isProceedNotPressed) {
        setIsRequestTeacherOpen(false);
        setIsTeacherBusy(true);
      } else {
        setIsProceedNotPressed(true);
        setIsSuccess(true);
        setIsRequestTeacherOpen(false);
      }
    } else {
      if (isProceedNotPressed) {
        setIsProceedNotPressed(false);
      } else {
        setIsProceedNotPressed(true);
        setIsSuccess(true);
        setIsRequestTeacherOpen(false);
      }
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
          data={teacherData[1]}
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
                      backgroundColor: item.isOnsite
                        ? Colors.activeAccent
                        : Colors.secondaryText,
                      color: item.isOnsite
                        ? Colors.secondaryBackground
                        : "black",
                      fontWeight: "500",
                      padding: 4,
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                    }}
                  >
                    ONSITE
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
                  {item.subjects[0]}
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
        onRequestClose={() => {
          setIsRequestTeacherOpen(false), setIsProceedNotPressed(true);
        }}
      >
        <View
          style={{
            backgroundColor: Colors.primaryBackground,
            width: Viewport.width * 0.9,
            height: Viewport.height * 0.63,
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
                {selectedTeacher.subjects}
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
                  backgroundColor: selectedTeacher.isOnsite
                    ? Colors.activeAccent
                    : Colors.secondaryText,
                  color: selectedTeacher.isOnsite
                    ? Colors.secondaryBackground
                    : "black",
                  fontWeight: "500",
                  padding: 4,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
              >
                ONSITE
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
          {isProceedNotPressed ? (
            <View
              style={{
                backgroundColor: "#282726",
                width: Viewport.width * 0.8,
                height: Viewport.height * 0.4,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: Viewport.width * 0.8,
                  paddingTop: 10,
                  paddingLeft: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: FontSizes.small,
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Consultation Overview
                </Text>
              </View>
              <View
                style={{
                  marginTop: Viewport.height * 0.01,
                  backgroundColor: "white",
                  width: Viewport.width * 0.7,
                  height: Viewport.height * 0.352,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    paddingTop: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    date
                  </Text>
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    time
                  </Text>
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    type
                  </Text>
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    status
                  </Text>
                </View>
                <ScrollView
                  contentContainerStyle={{
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 20,
                  }}
                  style={{
                    width: Viewport.width * 0.7,
                    borderRadius: 10,
                    paddingVertical: 20,
                  }}
                >
                  {selectedTeacher.appointments &&
                    selectedTeacher.appointments.map((appointment: any) => (
                      <View
                        key={`${appointment.date}-${appointment.time}`}
                        style={{
                          width: Viewport.width * 0.7,
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: FontSizes.tiny,
                            fontFamily: "Montserrat",
                            color: "black",
                          }}
                        >
                          {appointment.date}
                        </Text>
                        <Text
                          style={{
                            fontSize: FontSizes.tiny,
                            fontFamily: "Montserrat",
                            color: "black",
                          }}
                        >
                          {appointment.time}
                        </Text>
                        <Text
                          style={{
                            fontSize: FontSizes.tiny,
                            fontFamily: "Montserrat",
                            color: "black",
                          }}
                        >
                          {appointment.type}
                        </Text>
                        <Text
                          style={{
                            fontSize: FontSizes.tiny,
                            fontFamily: "Montserrat",
                            color:
                              appointment.status === "ongoing"
                                ? "#15B31B"
                                : "#CD1616",
                          }}
                        >
                          {appointment.status}
                        </Text>
                      </View>
                    ))}
                </ScrollView>
              </View>
            </View>
          ) : (
            <TextInput
              placeholder="reason..."
              style={{
                backgroundColor: "white",
                color: "black",
                borderRadius: 10,
                width: Viewport.width * 0.8,
                height: Viewport.height * 0.4,
                fontSize: FontSizes.small,
                padding: 20,
                textAlignVertical: "top",
              }}
              multiline={true}
            />
          )}

          <TouchableOpacity
            style={{
              backgroundColor: Colors.buttonBGColor,
              width: Viewport.width * 0.5,
              height: Viewport.height * 0.07,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
            onPress={handleProceed}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Montserrat",
                fontSize: FontSizes.normal,
              }}
            >
              {isProceedNotPressed ? "Proceed" : "Send request"}
            </Text>
          </TouchableOpacity>
        </View>
      </CustomizedModal>
      <CustomizedModal
        visible={isTeacherBusy}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsTeacherBusy(false)}
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
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat",
                fontSize: FontSizes.small,
                textAlign: "center",
              }}
            >
              Are you going to appoint even though there are many students who
              consult this instructor?
            </Text>
          </View>
          <View style={{ alignSelf: "center", flexDirection: "row", gap: 20 }}>
            <TouchableOpacity
              onPress={() => {
                setIsTeacherBusy(false),
                  setIsRequestTeacherOpen(true),
                  setIsProceedNotPressed(false);
              }}
              style={{
                backgroundColor: Colors.success,
                width: Viewport.width * 0.37,
                height: Viewport.height * 0.08,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Feather name="check-circle" size={30} color="white" />
              <Text style={{ color: "white", fontSize: FontSizes.small }}>
                YES
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.error,
                width: Viewport.width * 0.37,
                height: Viewport.height * 0.08,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
              onPress={() => setIsTeacherBusy(false)}
            >
              <Fontisto name="close" size={30} color="white" />
              <Text style={{ color: "white", fontSize: FontSizes.small }}>
                NO
              </Text>
            </TouchableOpacity>
          </View>
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
