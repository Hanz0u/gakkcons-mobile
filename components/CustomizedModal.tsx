import { Viewport } from "@/styles/styles";
import { ReactNode } from "react";
import { Modal, View } from "react-native";

interface CustomizedModalProps {
  visible: boolean;
  animationType: "none" | "slide" | "fade";
  transparent: boolean;
  children?: ReactNode;
  onRequestClose: () => void;
}

const CustomizedModal: React.FC<CustomizedModalProps> = ({
  visible,
  animationType,
  transparent,
  children,
  onRequestClose,
}) => {
  return (
    <Modal
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      onRequestClose={onRequestClose}
    >
      <View
        style={{
          height: Viewport.height * 1,
          width: Viewport.width * 1,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </View>
    </Modal>
  );
};

export default CustomizedModal;
