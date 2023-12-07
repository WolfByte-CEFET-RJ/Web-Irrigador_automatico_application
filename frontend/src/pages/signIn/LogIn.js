import { StatusBar } from 'expo-status-bar';
import { styles } from './styles';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import ErrorComponent from '../../components/Error/ErrorComponent';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const LogIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState('');

  const handleSubmit = async () => {

    const data = {
    email,
    password,
  }

  console.log(data);

    if(email === '' || password === '') {
      alert('Preencha todos os campos');
    } 
    else {
      try {
        const response = await axios.post('http://localhost:5000/login', data);
        const {token} = response.data;
        console.log(token);
        navigation.navigate()
      }
      catch (error) {
        console.error(error);
        setError(error.response.data.message);
        if (error.response) {
          console.error('Dados do erro:', error.response.data.message);
          console.error('Status do erro:', error.response.status);
        }
      }
    }
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.login_container}>
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
      <View style={styles.remember_forgot}>
        <Text style={styles.forgot_text}>Esqueceu a senha?</Text>
      </View>
      <Button title="Acessar" onPress={()=>handleSubmit()} />
      <View style={styles.cadastrar_container}>
        <Text style={styles.cadastrar_text}>Não possui conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.cadastrar_navegacao}> Cadastre-se</Text>
        </TouchableOpacity>
      </View>
      {error && <ErrorComponent message={error} />}
    </View>
  );
};

export default LogIn;
