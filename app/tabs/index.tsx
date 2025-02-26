import React, { useState, useEffect } from "react";
import { Colors, FontSizes, Viewport } from "@/styles/styles";
import {
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import moment from "moment";
import { useToast } from "react-native-toast-notifications";
import { EvilIcons, Feather, Fontisto } from "@expo/vector-icons";
import CustomizedModal from "@/components/CustomizedModal";
import {
  useGetTeachers,
  useRequestAppointment,
} from "@/api/teacher/teacher.hooks";
import { validateRequestAppointmentInputs } from "@/utils/validations";
import { useNotification } from "@/api/notification/notification.hooks";
import { useSocket } from "@/contexts/SocketContext";

export default function ConsultationScreen() {
  const toast = useToast();
  const io = useSocket();
  const [isRequestTeacherOpen, setIsRequestTeacherOpen] =
    useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>([]);
  const [isProceedNotPressed, setIsProceedNotPressed] = useState<boolean>(true);
  const [isTeacherBusy, setIsTeacherBusy] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState("");
  const [reason, setReason] = useState("");
  const [appointmentValidationErrors, setAppointmentValidationErrors] =
    useState<any>({});
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: teacherData,
    isLoading: isGetTeacherLoading,
    refetch: refetchTeacherData,
  } = useGetTeachers(searchQuery);

  useNotification();

  const onRefreshTeacherData = React.useCallback(() => {
    refetchTeacherData();
  }, []);

  const {
    mutate: requestMutate,
    isSuccess: isRequestSuccess,
    isPending: isRequestPending,
    isError: isRequestError,
    error: requestErrors,
  } = useRequestAppointment();

  io.on("faculty_active_status", () => {
    refetchTeacherData();
  });

  const handleRequestTeacherOpen = (item: any) => {
    if (!item.faculty_mode || item.faculty_mode === "offline") {
      Alert.alert(
        "This instructor is not available.",
        "Do you want to proceed?",
        [
          {
            text: "No",
            onPress: () => console.log("No Pressed"),
          },
          {
            text: "Yes",
            onPress: () => {
              setSelectedTeacher(item);
              setIsRequestTeacherOpen(true);
            },
          },
        ]
      );
    } else {
      setSelectedTeacher(item);
      setIsRequestTeacherOpen(true);
    }
  };

  const handleProceed = () => {
    if (
      selectedTeacher.appointments &&
      selectedTeacher.appointments.length > 4
    ) {
      if (isProceedNotPressed) {
        setIsRequestTeacherOpen(false);
        setIsTeacherBusy(true);
      } else {
        const validationErrors = validateRequestAppointmentInputs(
          selectedMode,
          reason
        );
        if (Object.keys(validationErrors).length > 0) {
          setAppointmentValidationErrors(validationErrors);
          return;
        }
        requestMutate({
          facultyId: selectedTeacher.user_id,
          reason: reason,
          mode: selectedMode,
        });
      }
    } else {
      if (isProceedNotPressed) {
        setIsProceedNotPressed(false);
      } else {
        const validationErrors = validateRequestAppointmentInputs(
          selectedMode,
          reason
        );
        if (Object.keys(validationErrors).length > 0) {
          setAppointmentValidationErrors(validationErrors);
          return;
        }
        requestMutate({
          facultyId: selectedTeacher.user_id,
          reason: reason,
          mode: selectedMode,
        });
      }
    }
  };

  useEffect(() => {
    let id: any;

    if (isRequestPending) {
      if (!id) {
        id = toast.show("Please wait. Loading...", {
          type: "normal",
          placement: "top",
          animationType: "slide-in",
          normalColor: "gray",
        });
      }
    } else {
      if (id) {
        toast.hide(id);
        id = null;
      }

      if (isRequestSuccess) {
        setIsProceedNotPressed(true);
        setIsSuccess(true);
        setIsRequestTeacherOpen(false);
        setSelectedMode("");
        setAppointmentValidationErrors([]);
        setReason("");
      }

      if (isRequestError) {
        if (requestErrors.message.includes("You already")) {
          Alert.alert("Appointment Request Error", requestErrors.message);
          return;
        } else {
          toast.show(requestErrors?.message, {
            type: "danger",
            placement: "top",
            duration: 4000,
            animationType: "slide-in",
          });
        }
      }
    }

    return () => {
      if (id) {
        toast.hide(id);
      }
    };
  }, [isRequestPending, isRequestSuccess, isRequestError, requestErrors]);

  const teachers = React.useMemo(() => {
    if (!teacherData || !Array.isArray(teacherData)) return [];
    return Array.isArray(teacherData[1]) ? teacherData[1] : [];
  }, [teacherData]);

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
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              placeholder="Search"
              placeholderTextColor={Colors.secondaryBackground}
              style={{
                backgroundColor: Colors.tertiaryBackground,
                width: Viewport.width * 0.9,
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
              size={30}
              color={Colors.secondaryText}
              style={{
                position: "absolute",
                zIndex: 10,
                right: 10,
              }}
            />
          </View>
        </View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isGetTeacherLoading}
              onRefresh={onRefreshTeacherData}
            />
          }
          data={teachers}
          style={{
            height: Viewport.height * 0.65,
            width: Viewport.width * 0.9,
            alignSelf: "center",
            flexGrow: 0,
          }}
          keyExtractor={(item) => `teacher-${item.user_id}`}
          ListEmptyComponent={() => (
            <View style={{ padding: 20, alignItems: "center" }}>
              <Text style={{ color: "white" }}>
                {isGetTeacherLoading ? "Loading..." : "No teachers available"}
              </Text>
            </View>
          )}
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
                justifyContent: "space-between",
                paddingRight: 20,
              }}
              onPress={() => handleRequestTeacherOpen(item)}
            >
              <View style={{ flexDirection: "row" }}>
                <Feather
                  name="user"
                  size={50}
                  color="black"
                  style={{ marginTop: 13, marginLeft: 15 }}
                />
                <View style={{ flexDirection: "column", marginLeft: 10 }}>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                    <Text
                      style={{
                        fontSize: Viewport.width * 0.02,
                        fontFamily: "Montserrat",
                        backgroundColor:
                          item.faculty_mode === "Onsite"
                            ? Colors.activeAccent
                            : Colors.secondaryText,
                        color:
                          item.faculty_mode === "Onsite"
                            ? Colors.secondaryBackground
                            : "black",
                        fontWeight: "500",
                        padding: 4,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                      }}
                    >
                      Onsite
                    </Text>
                    <Text
                      style={{
                        fontSize: Viewport.width * 0.02,
                        fontFamily: "Montserrat",
                        backgroundColor:
                          item.faculty_mode === "Online"
                            ? Colors.activeAccent
                            : Colors.secondaryText,
                        color:
                          item.faculty_mode === "Online"
                            ? Colors.secondaryBackground
                            : "black",
                        fontWeight: "500",
                        padding: 4,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                      }}
                    >
                      Online
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: FontSizes.normal,
                      fontWeight: "bold",
                      fontFamily: "Montserrat",
                      width: Viewport.width * 0.45,
                    }}
                  >
                    {item.name.length > 30
                      ? `${item.name.substring(0, 30)}...`
                      : item.name}
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
              </View>

              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: Viewport.width * 0.15,
                  gap: 3,
                }}
              >
                <View
                  style={{
                    backgroundColor:
                      item.faculty_mode === "Onsite" ||
                      item.faculty_mode === "Online"
                        ? "#15B31B"
                        : "#CD1616",
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    alignSelf: "center",
                  }}
                />
                {item.last_active ? (
                  <Text
                    style={{
                      fontSize: Viewport.width * 0.02,
                      fontFamily: "Montserrat",
                    }}
                  >
                    {moment(item.last_active).fromNow()}
                  </Text>
                ) : (
                  <>
                    {!item.faculty_mode || item.faculty_mode === "offline" ? (
                      <Text
                        style={{
                          fontSize: Viewport.width * 0.02,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Inactive
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: Viewport.width * 0.02,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Available
                      </Text>
                    )}
                  </>
                )}
              </View>
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
          setSelectedMode("");
          setAppointmentValidationErrors([]);
          setReason("");
        }}
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
                {selectedTeacher.name && selectedTeacher.name.length > 15
                  ? `${selectedTeacher.name.substring(0, 15)}...`
                  : selectedTeacher.name}
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
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  height: Viewport.height * 0.03,
                  alignSelf: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => setSelectedMode("onsite")}
                  style={{
                    backgroundColor:
                      selectedMode === "onsite"
                        ? Colors.activeAccent
                        : Colors.secondaryText,

                    padding: 4,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: Viewport.width * 0.02,
                      fontFamily: "Montserrat",
                      color:
                        selectedMode === "onsite"
                          ? Colors.secondaryBackground
                          : "black",
                      fontWeight: "500",
                    }}
                  >
                    Onsite
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedMode("online")}
                  style={{
                    backgroundColor:
                      selectedMode === "online"
                        ? Colors.activeAccent
                        : Colors.secondaryText,

                    padding: 4,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: Viewport.width * 0.02,
                      fontFamily: "Montserrat",
                      color:
                        selectedMode === "online"
                          ? Colors.secondaryBackground
                          : "black",
                      fontWeight: "500",
                    }}
                  >
                    Online
                  </Text>
                </TouchableOpacity>
              </View>
              {appointmentValidationErrors.selectedMode && (
                <Text style={{ color: "red", fontSize: 12 }}>
                  {appointmentValidationErrors.selectedMode}
                </Text>
              )}
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
                    Type
                  </Text>
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    Status
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
                    selectedTeacher.appointments.map(
                      (appointment: any, index: any) => (
                        <View
                          key={index}
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
                            {appointment.mode}
                          </Text>
                          <Text
                            style={{
                              fontSize: FontSizes.tiny,
                              fontFamily: "Montserrat",
                              color:
                                appointment.status === "Confirmed" ||
                                appointment.status === "Completed"
                                  ? "#15B31B"
                                  : "#CD1616",
                            }}
                          >
                            {appointment.status}
                          </Text>
                        </View>
                      )
                    )}
                </ScrollView>
              </View>
            </View>
          ) : (
            <>
              <TextInput
                value={reason}
                onChangeText={(text) => setReason(text)}
                placeholder="Reason..."
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
              {appointmentValidationErrors.reason && (
                <Text style={{ color: "red", fontSize: 12 }}>
                  {appointmentValidationErrors.reason}
                </Text>
              )}
            </>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: Colors.inactiveElement,
                padding: 20,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                borderRadius: 10,
              }}
              onPress={() => {
                setIsRequestTeacherOpen(false), setIsProceedNotPressed(true);
                setSelectedMode("");
                setAppointmentValidationErrors([]);
                setReason("");
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Montserrat",
                  fontSize: FontSizes.small,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.buttonBGColor,
                padding: 20,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                borderRadius: 10,
              }}
              onPress={handleProceed}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Montserrat",
                  fontSize: FontSizes.small,
                }}
              >
                {isProceedNotPressed ? "Proceed" : "Send Request"}
              </Text>
            </TouchableOpacity>
          </View>
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
                No
              </Text>
            </TouchableOpacity>
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
                Yes
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
