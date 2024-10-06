import { Dimensions } from "react-native";

export const Viewport = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

export const FontSizes = {
  tiny: Viewport.width * 0.03,
  small: Viewport.width * 0.04,
  normal: Viewport.width * 0.05,
  medium: Viewport.width * 0.06,
  large: Viewport.width * 0.08,
  extraLarge: Viewport.width * 0.1,
};

export const Colors = {
  primaryBackground: "#E3E1D9",
  secondaryBackground: "#FFFFFF",
  primaryText: "#000000",
  secondaryText: "#D9D9D9",
  activeElement: "#000000",
  inactiveElement: "#A7A7A7",
  tertiaryBackground: "#282726",
  quaternaryBackground: "#D1C8C3",
  success: "#00CC33",
  danger: "#FF3300",
  activeAccent: "#07181F",
  inactiveAccent: "#D1C8C3",
};
