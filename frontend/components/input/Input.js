import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { styles } from './sytles'

const Input = ({ label }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (text) => {
    setInputText(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Testets</Text>
      <TextInput
        style={styles.input}
        placeholder={label}
        placeholderTextColor={"rgba(64,81,59,0.6)"} 
        onChangeText={handleInputChange}
        value={inputText}
      />
    </View>
  );
};

export default Input;
