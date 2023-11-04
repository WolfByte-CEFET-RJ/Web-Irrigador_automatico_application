import { StatusBar } from 'expo-status-bar';
import { styles } from './styles'
import React from 'react';
import { View, Text, Image, CheckBox } from 'react-native';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

const LogIn = () => {


  return (
    <View style={styles.login_container}>
      <StatusBar/>
      <View style={styles.slogan_container}>
        <Text style={styles.app_name}>SmartGarden</Text>
        <Text style={styles.app_slogan}>Cadastre-se para automatizar sua horta</Text>
      </View>
      <Image style={styles.logo} source={require('../../../assets/android-chrome-512x512.png')}/>
      <View style={styles.input_container}>
        <Input />
      </View>
      <View style={styles.remember_forgot}>
        <CheckBox>Teste</CheckBox>
        <Text style={styles.forgot_password}>Esqueceu a senha?</Text>
      </View>
      <Button/>
      <View style={styles.cadastrar_container}>
        <Text style={styles.cadastrar_text}>Não possui conta?</Text>
        <Text style={styles.cadastrar_navegacao}> Cadastre-se</Text>
      </View>
    </View>
  );
};

export default LogIn;
