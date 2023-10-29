import { View, Text, Image, Alert } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Input from '../../components/input/Input';
import Button from "../../components/button/Button";
import { styles } from './styles'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";

export default function SignUp(){

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const handleSubmit = () => {
    if(name === '' || email === '' || password === '' || confirmPassword === '') {
      alert('Preencha todos os campos');
    }
    else if(password !== confirmPassword) {
      alert('Senhas não coincidem');
    }
    else {
      console.log('foi para a home');
    }

    const data = {
      name,
      email,
      confirmPassword,
    }
    console.log(data)
    
  }

  return(
    <View style={styles.cadastro_container}>
      <StatusBar/>
      <View style={styles.logo_container}>
        <Image style={styles.logo} source={require('../../assets/android-chrome-192x192.png')}/>
      </View>
      <View style={styles.form_container}>
        <View style={styles.header_container}>
          <View style={styles.return_button_container}>
            <Ionicons name="arrow-back-outline" size={24}/>
          </View>
          <View style={styles.slogan_container}>
            <Text style={styles.app_name}>SmartGarden</Text>
            <Text style={styles.app_slogan}>Cadastre-se para automatizar sua horta</Text>
          </View>
        </View>
        <View style={styles.input_container}>
          {/* Inputs */}
          <Input label="Nome" value={name} onChangeText={text=>setName(text)}/>
          <Input label="E-mail" value={email} onChangeText={text=>setEmail(text)}/>
          <Input label="Senha" value={password} onChangeText={text=>setPassword(text)} isPassword={true}/>
          <Input label="Confirme sua senha" value={confirmPassword} onChangeText={text=>setconfirmPassword(text)} isPassword={true}/>
        </View>
        <View style={styles.button_container}>
          <Button title="Cadastrar" onPress={()=>handleSubmit()}/>
        </View>
      </View>
    </View>
  )
}