import { StatusBar } from 'expo-status-bar';
import { styles } from './styles'
import React, { useState } from 'react';
//import CheckBox from '@react-native-community/checkbox';
import { View, Text, Image, TouchableOpacity, CheckBox } from 'react-native';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button'
import { useNavigation } from '@react-navigation/native';;

const LogIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState(false);

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
        <Input placeHolder="Insira o seu email" value={email} onChangeText={text=>setEmail(text)} isLogin={true} isEmail={true}/>
        <Input placeHolder="Insira sua senha" value={password} onChangeText={text=>setPassword(text)} isPassword={true} isLogin={true} isEmail={false}/>
      </View>
      <View style={styles.remember_forgot}>
        <View style={styles.remember}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={styles.remember_text}>Lembre de mim</Text>
        </View>

        <Text style={styles.forgot_text}>Esqueceu a senha?</Text>
      </View>
      <Button title="Acessar" onPress={()=>handleSubmit()}/>

      <View style={styles.cadastrar_container}>
        <Text style={styles.cadastrar_text}>Não possui conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.cadastrar_navegacao}> Cadastre-se</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default LogIn;
