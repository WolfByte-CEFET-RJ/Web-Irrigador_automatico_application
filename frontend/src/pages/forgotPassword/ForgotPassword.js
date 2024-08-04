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


const ForgotPassword = () => {
    const navigation = useNavigation();
    const api = createAxiosInstance();

    const [email, setEmail] = useState("");

    const [isModalVisible, setModalVisible] = useState(false);

    const handleForgotPassword = async () => {
        setModalVisible(true);
        const forgotPasswordMessage = await api.post('/forgot_password', email);
        if(forgotPasswordMessage.status === 200){
            setModalVisible(true);
        }
    }
    return(
        <View style={styles.forgotPassword_container}>
            <StatusBar/>
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
                <Button title="Recuperar senha" onPress={() => handleForgotPassword()}/>
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