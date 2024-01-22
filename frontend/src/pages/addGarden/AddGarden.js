import React from 'react';
import {Text, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, View} from 'react-native';
import { useState } from "react";
import { styles } from './styles';
import BottomBar from '../../components/bottomBar/BottomBar';
import Button from "../../components/button/Button";
import InputDark from '../../components/inputDark/InputDark';
import { Platform } from 'react-native';
import ErrorComponent from '../../components/Error/ErrorComponent';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { createAxiosInstance }  from '../../services/api';

const AddGarden = () => {

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const api = createAxiosInstance();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [userId, setUserId] = useState('');
  const [configId, setConfigId] = useState('');
  const [error, setError] = useState('');
  // const { token } = useAuth();

  // console.log(token)

  const handleSubmit = async () => {

    const data = {
      name,
      description,
      identifier, 
      configId: 1,
    };//* Ver depois configId


    if (name === '' || description === '' || identifier === '') {
      setError('Preencha todos os campos')
    } else if (isNaN(identifier)) {
      setError('O ID deve ser um número inteiro');
    } else {
        try {
          const response = await api.post('/garden', data)
          console.log(response);
          navigation.navigate('Home'); 
        } catch (error) {
          setError(error.response.data.msg)
          console.log(error)
        }
      }
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
              onChangeText={text=>setIdentifier(text)}
            />
          </SafeAreaView>
          <SafeAreaView style={styles.subtitle_container}>
            <Text style={styles.subtitle}>Configuração de irrigação</Text>
          </SafeAreaView>
          <InputDark 
            placeHolder="default" 
            editable={false}
          />
          <SafeAreaView style={styles.btndiv}>
            <Button title="Adicionar horta" onPress={()=>handleSubmit()}/>
          </SafeAreaView >
        </ScrollView>
        <View style={styles.bottomBar_container}>
            <BottomBar/>
        </View>
        {error && <ErrorComponent message={error} />}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default AddGarden;
