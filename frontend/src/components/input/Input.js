import React, { useState } from 'react';
import { View, TextInput, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { styles } from './sytles'
import Ionicons from '@expo/vector-icons/Ionicons';


const Input = ({ label, isPassword, value, onChangeText }) => {
  // const [inputText, setInputText] = useState('');

  // const handleInputChange = (text) => {
  //   setInputText(text);
  // };

  const [showPassword, setShowPassword] = useState(false);

  return (
      <View style={styles.container}>
        <View style={styles.label_container}>
          <Text style={styles.label}>{label}</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder={label}
          placeholderTextColor={"rgba(64,81,59,0.6)"} 
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={isPassword && !showPassword}
        />
        {
          isPassword && (
            <Ionicons 
              style={styles.icon} 
              name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
              size={24} 
              color={'#609966'}
              onPress={() => setShowPassword(!showPassword)}
              />
          )
        }
      </View>
  );
};

export default Input;
