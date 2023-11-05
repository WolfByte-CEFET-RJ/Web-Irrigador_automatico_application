import { StatusBar } from 'expo-status-bar';
import { styles } from './styles'
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { View, Text, Image } from 'react-native';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

const LogIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {

    if(email === '' || password === '') {
      alert('Preencha todos os campos');
    }
  }

  return (
    <View style={styles.login_container}>
      <StatusBar/>
      <View style={styles.slogan_container}>
        <Text style={styles.app_name}>SmartGarden</Text>
        <Text style={styles.app_slogan}>Cadastre-se para automatizar sua horta</Text>
      </View>
      <Image style={styles.logo} source={require('../../../assets/android-chrome-512x512.png')}/>
      <View style={styles.input_container}>
        <Input label="E-mail" value={email} onChangeText={text=>setEmail(text)}/>
        <Input label="Senha" value={password} onChangeText={text=>setPassword(text)} isPassword={true}/>
      </View>
      <View style={styles.remember_forgot}>
        <Text style={styles.forgot_password}>Esqueceu a senha?</Text>
      </View>
      <Button title="Acessar" onPress={()=>handleSubmit()}/>
      <View style={styles.cadastrar_container}>
        <Text style={styles.cadastrar_text}>Não possui conta?</Text>
        <Text style={styles.cadastrar_navegacao}> Cadastre-se</Text>
      </View>
    </View>
  );
};

export default LogIn;
