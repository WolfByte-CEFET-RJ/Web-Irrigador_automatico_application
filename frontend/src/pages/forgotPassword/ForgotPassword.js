import { StatusBar} from "expo-status-bar";
import {styles} from "./styles";
import React, { useState } from "react";
import {View, Text, Image} from "react-native";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import ButtonLight from "../../components/buttonLight/ButtonLight";
import { useNavigation } from "@react-navigation/native";
import { createAxiosInstance } from "../../services/api";
import ForgotPasswordModal from "../../components/forgotPassModal/ForgotPassModal";
import ErrorComponent from "../../components/Error/ErrorComponent";
import SuccessComponent from "../../components/success/SuccessComponent";


const ForgotPassword = () => {
    const navigation = useNavigation();
    const api = createAxiosInstance();


    const [email, setEmail] = useState("");

    const [isModalVisible, setModalVisible] = useState(false);
    const [erro, setErro] = useState("");
    const [success, setSucess] = useState("");

    const handleForgotPassword = async () => {
        console.log(email.length);
        try{
            const forgotPasswordMessage = await api.post('/forgot_password', {email});
            console.log(forgotPasswordMessage);
            if(forgotPasswordMessage.status === 200){
                setSucess("Código enviado ao email")
                setTimeout(()=>{
                    setSucess("")
                    setModalVisible(true);
                },1000)
                
            }
        }catch(error){
            console.log(error);
            if(email=== ""){
                setErro("Digite um email")
                setTimeout(()=>{
                    setErro("")
                },2000)
            }else if(error.response.status === 404){
                setErro("Email não cadastrado")
                setTimeout(()=>{
                    setErro("")
                },2000)
            }
        }
    }
    return(
        <View style={styles.forgotPassword_container}>
            <StatusBar/>
            <ErrorComponent message={erro} />
            <SuccessComponent message={success} />
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
                <Text style={styles.subtittle_input}>Digite seu endereço de email para recuperar a senha:</Text>
                <Input
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeHolder="Insira o seu email"
                    isLogin={true}
                    isEmail={true}
                />
            </View>
            <View style={styles.button_space}>
                <Button title="Recuperar senha" onPress={async () => await handleForgotPassword()}/>
            </View>
                <ButtonLight title="Voltar" onPress={()=>navigation.navigate("SignIn")}/>
            
            <ForgotPasswordModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                texto={"Confira o seu e-mail e digite o código de verificação abaixo:"}
                email={email}
            />
        </View>
    );
};
export default ForgotPassword;