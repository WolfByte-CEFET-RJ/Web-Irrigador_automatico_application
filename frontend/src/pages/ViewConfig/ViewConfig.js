import React, { useState } from 'react';
import {Text, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, View, Pressable} from 'react-native';
import { styles } from './styles';
import BottomBar from '../../components/bottomBar/BottomBar';
import { Platform } from 'react-native';
import Button from '../../components/button/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
import DeleteModal from '../../components/deleteModal/DeleteModal';


const ViewConfig = () => {

  const fakeConfig = [
    {
      "nomeConfiguracao": "Configuração 1",
      "porcentagemUmidade": 50,
      "porcentagemAgua": 30
    },
    {
      "nomeConfiguracao": "Configuração 2",
      "porcentagemUmidade": 60,
      "porcentagemAgua": 40
    },
    {
      "nomeConfiguracao": "Configuração 3",
      "porcentagemUmidade": 70,
      "porcentagemAgua": 50
    }
  ]

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const handleDeleteIconPress = () => {
    setModalVisible(true);
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
          <Ionicons
              style={styles.iconConfig}
              name={'add-circle'}
              size={30}
              color={'#40513B'}
            />
        </View>
        {fakeConfig.map((config) => (
        <Pressable style={styles.container_personalizada}>
          <Text style={styles.name}>{config.nomeConfiguracao}</Text>
          <Text style={styles.config}>Umidade: <Text style={styles.bold}>{config.porcentagemUmidade}</Text>   Água:  <Text style={styles.bold}>{config.porcentagemAgua}</Text></Text>
          <Ionicons
            style={styles.iconConfig}
            name={'close-circle'}
            size={30}
            color={'#9DC08B'}
            onPress={handleDeleteIconPress}
          />
          <DeleteModal
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
            // onDelete={() => handleDelete(garden.id)}
            // hortaToDelete={garden.id}
            texto={"Deseja mesmo excluir esta configuração?"}
          />        
        </Pressable>
        ))}
        </ScrollView>
        <View style={styles.bottomBar_container}>
          <BottomBar/>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ViewConfig;
