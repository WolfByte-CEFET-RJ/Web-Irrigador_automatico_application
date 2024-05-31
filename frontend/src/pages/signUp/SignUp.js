import {
  View,
  Text,
  Image,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import ErrorComponent from "../../components/Error/ErrorComponent";
import SucessComponent from "../../components/success/SuccessComponent";
import { createAxiosInstance } from "../../services/api";

export default function SignUp() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [humidityNotification, setHumidityNotification] = useState(1);
  const [waterNotification, setWaterNotification] = useState(1);
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const api = createAxiosInstance();

  const handleSubmit = async () => {
    const data = {
      name,
      email,
      password,
      humidityNotification: true,
      waterNotification: true,
    };

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("Preencha todos os campos");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (password != confirmPassword) {
      setError("Senhas não coincidem");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      try {
        const response = await api.post("http://localhost:5000/user", data); //solicitação POST (criar dados) para a URL do backend
        setSucess("Usuário cadastrado com sucesso!");
        setTimeout(() => {
          setSucess("");
        }, 3000);
        setTimeout(() => navigation.navigate("SignIn"), 2200); //retorna à tela de início após cadastro
      } catch (error) {
        //caso ocorra um erro na solicitação
        //mensagem de erro -> usuário já cadastrado
        // Alert.alert('Erro', 'Usuário já cadastrado');
        // console.log(error, 'Usuário já cadastrado');
        console.log(data);
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onClick={dismissKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -50}
        style={styles.cadastro_container}
      >
        <StatusBar />
        <ErrorComponent message={error} />
        <SucessComponent message={sucess} />
        <View style={styles.logo_container}>
          <Image
            style={styles.logo}
            source={require("../../../assets/android-chrome-192x192.png")}
          />
        </View>
        <View style={styles.form_container}>
          <View style={styles.header_container}>
            <View style={styles.return_button_container}>
              <Pressable onPress={() => navigation.navigate("SignIn")}>
                <Ionicons name="arrow-back-outline" size={24} />
              </Pressable>
            </View>
            <View style={styles.slogan_container}>
              <Text style={styles.app_name}>SmartGarden</Text>
              <Text style={styles.app_slogan}>
                Cadastre-se para automatizar sua horta
              </Text>
            </View>
          </View>
          <View style={styles.input_container}>
            <Input
              label="Nome"
              placeHolder="Digite seu nome"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Input
              label="E-mail"
              placeHolder="Digite um email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              label="Senha"
              placeHolder="Digite uma senha"
              value={password}
              onChangeText={(text) => setPassword(text)}
              isPassword={true}
            />
            <Input
              label="Confirme sua senha"
              placeHolder="Confirme sua senha"
              value={confirmPassword}
              onChangeText={(text) => setconfirmPassword(text)}
              isPassword={true}
            />
          </View>
          <View style={styles.button_container}>
            <Button title="Cadastrar" onPress={() => handleSubmit()} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
