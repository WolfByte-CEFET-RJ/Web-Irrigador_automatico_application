import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./styles";

const EditableInput = ({
  label,
  value,
  isPassword,
  onChangeText,
  placeHolder,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  // const [editedValue, setEditedValue] = useState(value);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = () => {
    onEdit(editedValue);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.label_container}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <TextInput
        style={styles.input_container}
        value={value}
        placeholder={placeHolder}
        placeholderTextColor={"rgba(64,81,59,0.6)"}
        onChangeText={onChangeText}
        editable={isEditing}
      />

      <Pressable onPress={handleEditPress} style={styles.editButton}>
        <Ionicons name="create-outline" size={24} color="#40513B" />
      </Pressable>
    </View>
  );
};

export default EditableInput;
