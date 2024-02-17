import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, Pressable, Switch, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform} from "react-native";
import { styles } from './styles';
import BottomBar from '../../components/bottomBar/BottomBar'
import EditableInput from "../../components/editableInput/EditableInput";
import Button from "../../components/button/Button";
import ButtonLight from "../../components/buttonLight/ButtonLight";

export default function Profile(){
    const [irrigationNotification, setIrrigationNotification] = useState(false);
    const [lowReservoirNotification, setLowReservoirNotification] = useState(false);
    const [userName, setUserName] = useState('SeuNomeAqui');
    const [password, setPassword] = useState('SuaSenhaAqui');

    const handleUserNameSave = (newUserName) => {
        setUserName(newUserName);
    };

    const handlePasswordSave = (newPassword) => {
        setPassword(newPassword);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleSave = () => {
        // TODO: salvar as config no back
        console.log('Configurações salvas:', {
          irrigationNotification,
          lowReservoirNotification,
        });
      };

    return(
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -50}
            style={styles.container} 
        >
        <StatusBar/>
        <View style={styles.logo_container}>
            <Image style={styles.logo} source={require('../../../assets/android-chrome-192x192.png')}/>
        </View>
        <View>
            <Text style={styles.title}>Meu Perfil</Text>
        </View>
        <View style={styles.input_container}>
            <EditableInput label="Nome" value={userName} onSave={handleUserNameSave} />
            <EditableInput label="Senha" value={password} onSave={handlePasswordSave}/>
        </View>
        <View style={styles.notification_container}>
            <Text style={styles.subtitle}>Notificações</Text>

            <View style={styles.notificationSwitch}>
                <Text style={styles.text}>Irrigação</Text>
                <Switch
                    value={irrigationNotification}
                    onValueChange={(value) => setIrrigationNotification(value)}
                    trackColor={{
                        false: '#D26E28',  // Cor qnd desligado
                        true: '#609966'   // Cor qnd ligado
                    }}
                    thumbColor='white'
                />
            </View>

            <View style={styles.notificationSwitch}>
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
            </View>
        </View>
        <View style={styles.button_container}>
            <Button title="Salvar" buttonHeight={36.6} fontSize={17}/>
            <ButtonLight title="Sair" buttonHeight={36.6} fontSize={17}/>
        </View>
        <View style={styles.delete_container}>
            <Text style={styles.delete_text}>
                Deseja excluir a sua conta?{' '}
                <Pressable>
                    <Text style={styles.clickHere}>Clique aqui</Text>
                </Pressable>
            </Text>
        </View>
        <View style={styles.bottomBar_container}>
            <BottomBar/>
        </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}