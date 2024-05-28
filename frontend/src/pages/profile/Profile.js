import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, Pressable, Switch, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform} from "react-native";
import { styles } from './styles';
import BottomBar from '../../components/bottomBar/BottomBar'
import EditableInput from "../../components/editableInput/EditableInput";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import Button from "../../components/button/Button";
import ButtonLight from "../../components/buttonLight/ButtonLight";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import LogoutModal from "../../components/logoutModal/LogoutModal";


export default function Profile(){
    const [irrigationNotification, setIrrigationNotification] = useState();
    const [lowReservoirNotification, setLowReservoirNotification] = useState(false);
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {signOut} = useAuth();
    const {token} = useAuth();

    const handleUserNameSave = (newUserName) => {
       return setUserName(newUserName);
    };

    const handlePasswordSave = (newPassword) => {
       return setPassword(newPassword);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleSave = () => {
        // TODO: salvar as config no back
        const data = {
            name:userName,
            password:password,
            humidityNotification:irrigationNotification,
        }
        
        try{
        const resp = axios.patch("http://localhost:5000/user",data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
    );
        }catch(error){
            console.log(error);
        }
          
      };
      const handleDelete = () =>{

        try{

            axios.delete("http://localhost:5000/user/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                const message = response.data.message;
                if(message == "Usuário deletado com sucesso!"){
                    navigation.navigate("SignIn");
                     }
            })
            }catch(error){
                console.log(error);
            }
        
      }

      const logOut = () => {
        signOut();
        navigation.navigate("SignIn");
      }

    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalLogoutVisible, setModalLogoutVisible] = useState(false);
    const handleLogoutModal = () => {
        setModalLogoutVisible(true);
    };

    const handleDeleteModal = () => {
        setModalVisible(true);
    };

      useEffect(() => {
        const fetchUsuario = async () => {
        try {
            const response = await axios.get("http://localhost:5000/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            setUserName(response.data.name);
            setIrrigationNotification(response.data.humidityNotification);
            // handleUserNameSave(response.data.name);
            // console.log(userName);
        } catch (error) {
            console.error("Erro na solicitação:", error);
        }
        };

        fetchUsuario();
    }, []);
    // useEffect(()=>{
    //     setUserName(response.data.name);
    //     userName
    // },[userName])
    // useEffect(()=>{
    //     password
    // },[password])

    return (
      <TouchableWithoutFeedback onClick={dismissKeyboard}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -50}
          style={styles.container}
        >
          <StatusBar />
          <View style={styles.logo_container}>
            <Image
              style={styles.logo}
              source={require("../../../assets/android-chrome-192x192.png")}
            />
          </View>
          <View>
            <Text style={styles.title}>Meu Perfil</Text>
          </View>
          <View style={styles.input_container}>
            <EditableInput
              label="Nome"
              placeHolder="nome"
              value={userName}
              onChangeText={(text) =>
                setUserName(text)
              } /*onSave={handleUserNameSave}*/
            />
            <EditableInput
              label="Senha"
              placeHolder="Sua senha"
              value={password}
              onChangeText={(text) =>
                setPassword(text)
              } /* onSave={handlePasswordSave}*/
            />
          </View>
          <View style={styles.notification_container}>
            <Text style={styles.subtitle}>Notificações</Text>

            <View style={styles.notificationSwitch}>
              <Text style={styles.text}>Irrigação</Text>
              <Switch
                value={irrigationNotification}
                onValueChange={(value) => setIrrigationNotification(value)}
                trackColor={{
                  false: "#636363", // Cor qnd desligado
                  true: "#636363", // Cor qnd ligado
                }}
                thumbColor="white"
              />
            </View>

            {/*<View style={styles.notificationSwitch}>
                <Text style={styles.text}>Reservatório Baixo</Text>
                <Switch
                value={lowReservoirNotification}
                onValueChange={(value) => setLowReservoirNotification(value)}
                trackColor={{
                    false: '#D26E28',  // Cor qnd desligado
                    true: '#609966'   // Cor qnd ligado
                }}
                thumbColor='white'
                />
            </View>*/}
          </View>
          <View style={styles.button_container}>
            <Button
              title="Salvar"
              buttonHeight={35}
              fontSize={15}
              onPress={handleSave}
            />
            <ButtonLight
              title="Sair"
              buttonHeight={35}
              fontSize={15}
              onPress={handleLogoutModal}
            />
            <LogoutModal
                visible={isModalLogoutVisible}
                onClose={() => setModalLogoutVisible(false)}
                onClick={logOut}
                texto={"Deseja mesmo sair desta conta"}
                label={"Sair"}
              />
          </View>
          <View style={styles.delete_container}>
            <Text style={styles.delete_text}>
              Deseja excluir a sua conta?{" "}
              <Pressable>
                <Text style={styles.clickHere} onClick={handleDeleteModal}>
                  Clique aqui
                </Text>
                <DeleteModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onClick={handleDelete}
                texto={"Deseja mesmo excluir sua conta? Esta ação é irreversível."}
                
              />
              </Pressable>
            </Text>
          </View>
          <View style={styles.bottomBar_container}>
            <BottomBar />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
}