import React from 'react';
import {Text, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, View, Pressable} from 'react-native';
import { styles } from './styles';
import BottomBar from '../../components/bottomBar/BottomBar';
import { Platform } from 'react-native';
import Button from '../../components/button/Button';


const ViewConfig = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50}
        style={styles.home_container}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <SafeAreaView style={styles.home_title_container}>
            <Text style={styles.home_title}>Configuração de irrigação</Text>
          </SafeAreaView>
        <Pressable style={styles.container_default}>
          <Text style={styles.name}>Default</Text>
          <Text style={styles.config}>Umidade:  <Text style={styles.bold}>25%</Text>   Água:  <Text style={styles.bold}>14%</Text></Text>
        </Pressable>
        <View style={styles.container_text}>
          <Text style={styles.home_subtitle}> Personalizadas </Text>
          <Pressable>
            
          </Pressable>
        </View>
        <Pressable style={styles.container_personalizada}>
          <Text style={styles.name}>Configuração 1</Text>
          <Text style={styles.config}>Umidade:  <Text style={styles.bold}>35%</Text>   Água:  <Text style={styles.bold}>24%</Text></Text>
        </Pressable>
        <Pressable style={styles.container_personalizada}>
          <Text style={styles.name}>Configuração 2</Text>
          <Text style={styles.config}>Umidade:  <Text style={styles.bold}>35%</Text>   Água:  <Text style={styles.bold}>24%</Text></Text>
        </Pressable>
        <Pressable style={styles.container_personalizada}>
          <Text style={styles.name}>Configuração 3</Text>
          <Text style={styles.config}>Umidade:  <Text style={styles.bold}>35%</Text>   Água:  <Text style={styles.bold}>24%</Text></Text>
        </Pressable>
        </ScrollView>
        <View style={styles.bottomBar_container}>
            <BottomBar/>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ViewConfig;
