import React, { Dispatch, SetStateAction } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface CodeInputProps {
  codeState: [any, Dispatch<SetStateAction<any>>];
  numberOfCode?: number;
}

const CodeInput: React.FC<CodeInputProps> = ({
  codeState,
  numberOfCode = 6,
}) => {
  const [code, setCode] = codeState;

  const nextInputRef: any = Array(numberOfCode)
    .fill(null)
    .map(() => React.createRef());

  const handleCodeChange = (text: any, index: any) => {
    const newCode: any = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      nextInputRef[index + 1]?.current?.focus();
    }
  };

  const handleKeyPress = (nativeEvent: any, index: any) => {
    if (nativeEvent.key === "Backspace") {
      const newCode: any = [...code];
      newCode[index] = "";
      setCode(newCode);

      if (index > 0) {
        nextInputRef[index - 1]?.current?.focus();
      }
    }
  };
  return (
    <View style={styles.codeInputContainer}>
      {[...Array(numberOfCode)].map((_, index) => (
        <TextInput
          key={index}
          ref={nextInputRef[index]}
          style={styles.codeInput}
          maxLength={1}
          value={code[index] || ""}
          onChangeText={(text) => handleCodeChange(text, index)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, index)}
          placeholder=""
          placeholderTextColor="#999"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  codeInputContainer: {
    marginVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  codeInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "15%",
    backgroundColor: "white",
  },
});

export default CodeInput;
