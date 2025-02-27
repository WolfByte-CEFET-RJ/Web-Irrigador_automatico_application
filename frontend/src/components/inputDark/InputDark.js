import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";

// todo: consertar a estilização do label porque tá torto

const InputDark = ({
  label,
  isPassword,
  value,
  onChangeText,
  isLogin,
  isEmail,
  placeHolder,
  editable = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isDescricaoInput = label === "Descrição";

  return (
    <View style={styles.container}>
      <Text
        style={[styles.label, isFocused || value ? styles.labelFocused : null]}
      >
        {label}
      </Text>
      {/* aqui eh o label */}
      <TextInput
        multiline={isDescricaoInput && editable}
        style={[
          isLogin ? styles.inputLogin : styles.inputCadastro,
          isDescricaoInput && editable ? styles.inputMultiline : null,
          !editable ? styles.readOnlyInput : null,
        ]}
        placeholder={placeHolder}
        placeholderTextColor={"rgba(64,81,59,0.6)"}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={isPassword && !showPassword}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={editable} // Adicionando a propriedade editable ao TextInput
      />
      {isPassword && (
        <Ionicons
          style={styles.iconCadastro}
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          size={24}
          color={"#609966"}
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
      {isLogin && (
        <Ionicons
          style={styles.iconLogin}
          name={isEmail ? "mail" : "lock-closed"}
          size={24}
          color={"#609966"}
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
    </View>
  );
};

export default InputDark;
