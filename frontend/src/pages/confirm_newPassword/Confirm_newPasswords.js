import { StatusBar} from "expo-status-bar";
import {styles} from "./styles";
import React, { useState } from "react";
import {View, Text, Image} from "react-native";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import ErrorComponent from "../../components/Error/ErrorComponent";
import SucessComponent from "../../components/success/SuccessComponent";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { createAxiosInstance } from "../../services/apiResetToken";

const Confirm_newPasswords = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [sucess, setSuccess] = useState("");
    const { unsetReset, resetToken } = useAuth();
    const navigation = useNavigation();
    const api = createAxiosInstance();


    const handleConfirmPassword = async () => {
        const data = {
          password: password,
          confirmPassword: confirmPassword
        };
        console.log("passoou aqui");
        if(
          password === "" ||
          confirmPassword === ""
        ) {
          setError("Preencha todos os campos");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else {
          try {
            console.log("entrou")
            console.log(resetToken);
            const response = await api.post("/reset_password", data); //solicitação PATCH (Atualizar dados) para a URL do backend
            setSuccess("Senha Atualizada com sucesso!");
            setTimeout(() => {
              setSuccess("");
            }, 3000);
            unsetReset();
            setTimeout(() => navigation.navigate("SignIn"), 2200); //retorna à tela de início após cadastro
          } catch (error) {
            
            console.log(error);
            setError(error.message);
            setTimeout(() => {
              setError("");
            }, 3000);
          }
        }
      };
  return (
    <View style={styles.Confirm_newPassword_container}>
            <StatusBar/>
            <ErrorComponent message={error} />
            <SucessComponent message={sucess} />
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
            <View style={styles.inputConfirm_container}>

                <Text style={styles.subtittle_confirm_input}>Insira sua nova senha:</Text>
                <Input
                    // label={"Insira sua nova senha:"}
                    placeHolder="Digite uma senha"
                    onChangeText={text =>setPassword(text)}
                    isPassword={true}
                    isLogin={true}
                />
                <Text style={styles.subtittle_confirm_input}>Confirme sua senha:</Text>
                <Input
                    // label="Confirme sua senha:"
                    onChangeText={text => setConfirmPassword(text)}
                    placeHolder="Confirme sua senha"
                    isPassword={true}
                    isLogin={true}
                />
            </View>
            <View style={styles.button_space}>
                <Button title="Recuperar senha" onPress={() => handleConfirmPassword()}/>
            </View>
        </View>
  )
}

export default Confirm_newPasswords
