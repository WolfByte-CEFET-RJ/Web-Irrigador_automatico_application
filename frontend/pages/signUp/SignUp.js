import { View, Text, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Input from '../../components/input/Input';
import Button from "../../components/button/Button";
import { styles } from './styles'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SignUp(){

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
          <Input label="Nome" />
          <Input label="E-mail"/>
          <Input label="Senha" isPassword={true}/>
          <Input label="Confirme sua senha" isPassword={true}/>
        </View>
        <View style={styles.button_container}>
          <Button title="Cadastrar"/>
        </View>
      </View>
    </View>
  )
}