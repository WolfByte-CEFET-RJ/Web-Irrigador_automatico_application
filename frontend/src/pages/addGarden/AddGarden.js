import React from 'react';
import {Text, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, View} from 'react-native';
import { useState } from "react";
import { styles } from './styles';
import BottomBar from '../../components/bottomBar/BottomBar';
import Button from "../../components/button/Button";
import InputDark from '../../components/inputDark/InputDark';
import { Platform } from 'react-native';

const AddGarden = () => {

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');

  const handleSubmit = async () => {
    const data = {
        name,
        description,
        id,
    }

    console.log(data);

    if(name === '' || description === '' || id === '') {
        alert('Preencha todos os campos');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50}
        style={styles.home_container}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <SafeAreaView style={styles.home_title_container}>
            <Text style={styles.home_title}>Adicionar nova horta</Text>
          </SafeAreaView>
          <SafeAreaView style={styles.input_container}>
            <InputDark 
              label="Nome" 
              placeHolder="horta de cenouras" 
              value={name} 
              onChangeText={text=>setName(text)}
              />
            <InputDark
              label="Descrição" 
              placeHolder="solo fértil, fileiras organizadas, irrigação suave, luz solar adequada, colheita contínua, frescor e nutrientes."
              onChangeText={text=>setDescription(text)}
            />
            <InputDark 
              label="Identificador" 
              placeHolder="001" 
              onChangeText={text=>setId(text)}
            />
          </SafeAreaView>
          <SafeAreaView style={styles.subtitle_container}>
            <Text style={styles.subtitle}>Configuração de irrigação</Text>
          </SafeAreaView>
          <InputDark placeHolder="default" editable={false}/>
          <SafeAreaView style={styles.btndiv}>
            <Button title="Adicionar horta" onPress={()=>handleSubmit()}/>
          </SafeAreaView >
        </ScrollView>
        <View style={styles.bottomBar_container}>
            <BottomBar/>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default AddGarden;
