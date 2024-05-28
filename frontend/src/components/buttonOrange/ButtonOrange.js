import React from "react";
import { styles } from "./styles";
import { TouchableOpacity, Text } from "react-native";

const ButtonOrange = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonOrange;
