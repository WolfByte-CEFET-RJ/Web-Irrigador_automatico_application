import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import ErrorComponent from "../../components/Error/ErrorComponent";
import { useNavigation } from "@react-navigation/native";
import { createAxiosInstance } from "../../services/api";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const { token } = useAuth();
  const api = createAxiosInstance();

  const handleSubmit = async () => {
    //* Dados de input do usuário
    const data = {
      email,
      password,
    };

    //* Verifica se os inputs foram preenchidos
    if (email === "" || password === "") {
      setError("Preencha todos os campos");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      try {
        //* Envia os dados a API e caso esteja cadastrado irá ser redirecionado a tela de Home
        const response = await api.post("/login", data);
        const token = response.data.token;
        signIn(token);
        
        navigation.navigate("Home");
      } catch (error) {
        //* Verifica o erro e printa na tela para o usuário

        console.error(error);
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
    <View style={styles.login_container}>
      <StatusBar />
      <View style={styles.slogan_container}>
        <Text style={styles.app_name}>SmartGarden</Text>
        <Text style={styles.app_slogan}>
          Entre para automatizar sua horta
        </Text>
      </View>
      <Image
        style={styles.logo}
        source={require("../../../assets/android-chrome-512x512.png")}
      />
      <View style={styles.input_container}>
        <Input
          placeHolder="Insira o seu email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          isLogin={true}
          isEmail={true}
        />
        <Input
          placeHolder="Insira sua senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          isPassword={true}
          isLogin={true}
          isEmail={false}
        />
      </View>
      <View style={styles.remember_forgot}>
        <TouchableOpacity onPress={()=>navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgot_text}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
      <Button title="Acessar" onPress={() => handleSubmit()} />
      <View style={styles.cadastrar_container}>
        <Text style={styles.cadastrar_text}>Não possui conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.cadastrar_navegacao}> Cadastre-se</Text>
        </TouchableOpacity>
      </View>
      <ErrorComponent message={error} />
    </View>
  );
};

export default LogIn;
