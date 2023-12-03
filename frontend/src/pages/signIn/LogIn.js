import { StatusBar } from 'expo-status-bar';
import { styles } from './styles'
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LogIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const data = {
    email,
    password,
  }

  const handleSubmit = async () => {

    if(email === '' || password === '') {
      alert('Preencha todos os campos');
    } 
    else {
      try {
        const response = await axios.post('http://localhost:3000/login', data);
        console.log(response);
      }
      catch (error) {
        console.log('Erro no login');
      }
    }
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.login_container}>
        <StatusBar/>
        <View style={styles.slogan_container}>
          <Text style={styles.app_name}>SmartGarden</Text>
          <Text style={styles.app_slogan}>Cadastre-se para automatizar sua horta</Text>
        </View>
        <Image style={styles.logo} source={require('../../../assets/android-chrome-512x512.png')}/>
        <View style={styles.input_container}>
          <Input placeHolder="Insira o seu email" value={email} onChangeText={text=>setEmail(text)} isLogin={true} isEmail={true}/>
          <Input placeHolder="Insira sua senha" value={password} onChangeText={text=>setPassword(text)} isPassword={true} isLogin={true} isEmail={false}/>
        </View>
        <Button title="Acessar" onPress={()=>handleSubmit()}/>
        <View style={styles.cadastrar_container}>
          <Text style={styles.cadastrar_text}>Não possui conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.cadastrar_navegacao}> Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LogIn;
