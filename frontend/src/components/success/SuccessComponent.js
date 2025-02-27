import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { styles } from "./styles";

const SuccessComponent = ({ message }) => {
  return message ? (
    <View style={styles.container}>
      <Text style={styles.sucessText}>{message}</Text>
    </View>
  ) : null;
};

export default SuccessComponent;
