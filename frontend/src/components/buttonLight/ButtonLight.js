import React from "react";
import { styles } from "./styles";
import { Text, Pressable } from "react-native";

const ButtonLight = ({ onPress, title, buttonHeight, fontSize }) => {
  const dynamicStyles = {
    button: {
      ...styles.button,
      height: buttonHeight || styles.button.height,
    },
    buttonText: {
      ...styles.buttonText,
      fontSize: fontSize || styles.buttonText.fontSize,
    },
  };

  return (
    <Pressable style={dynamicStyles.button} onPress={onPress}>
      <Text style={dynamicStyles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default ButtonLight;
