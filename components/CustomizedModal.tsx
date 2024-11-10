import { Viewport } from "@/styles/styles";
import { ReactNode } from "react";
import { Modal, View, ViewStyle, StyleProp } from "react-native";

interface CustomizedModalProps {
  visible: boolean;
  animationType: "none" | "slide" | "fade";
  transparent: boolean;
  children?: ReactNode;
  onRequestClose: () => void;
  style?: StyleProp<ViewStyle>;
}

const CustomizedModal: React.FC<CustomizedModalProps> = ({
  visible,
  animationType,
  transparent,
  children,
  onRequestClose,
  style,
}) => {
  return (
    <Modal
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      onRequestClose={onRequestClose}
    >
      <View
        style={[
          {
            height: Viewport.height * 1,
            width: Viewport.width * 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
          style,
        ]}
      >
        {children}
      </View>
    </Modal>
  );
};

export default CustomizedModal;
