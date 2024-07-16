import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomBar from "../../components/bottomBar/BottomBar";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { StatusBar } from "expo-status-bar";
import { useGarden } from "../../contexts/GardenContext";
import { createAxiosInstance } from "../../services/api";
import { useIrrigationSettings } from "../../contexts/IrrigationConfigContext";
import Button from "../../components/button/Button";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useRef } from 'react';
import { Platform } from 'react-native';

export default async function Home() {
  const api = createAxiosInstance();
  const navigation = useNavigation();
  const [buscarHorta, setBuscarHorta] = useState("");
  const { setGarden, gardenData, setSelectedGardenFunction } = useGarden();
  const [name, setName] = useState("");
  const { setIrrConfig } = useIrrigationSettings();

  useEffect(() => {
    async function fetchHortas() {
      try {
        const response = await api.get(`/myGardens`);
        const gardens = response.data;
        await setGarden(gardens);
  
        const userIrrigationSettings = await api.get(`/userSettings`);
        setIrrConfig(userIrrigationSettings.data);
        
      } catch (error) {
        console.error("Erro ao buscar hortas:", error);
      }
    }
    fetchHortas();
  }, [gardenData.length]);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const response = await api.get(`/user`);
        setName(response.data.name);
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    }
    fetchUsuario();
  }, [name]);


  const filtrarHortas = () => {
    return gardenData.filter((garden) =>
      garden.name.toLowerCase().includes(buscarHorta.toLowerCase()),
    );
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const handleDeleteIconPress = () => {
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/garden/${id}`);
      const hortas = await api.get(`/myGardens`);
      setGarden(hortas.data);
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao excluir horta:", error);
    }
  };
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
   });


async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        }
        if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Expo push token:", token);
    } else {
        alert('Must use physical device for Push Notifications');
    }
    
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        });
    }
    
    return token;
}
async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Test title',
        body: 'Test body',
        data: { testData: 'test data' },
    };
    
    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}


    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
   
    useEffect(async () => {
      await registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
   
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
   
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
   
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
  
  return (
    <View style={styles.home_container}>
      <StatusBar style="dark-content" />
      <View style={styles.home_title_container}>
        <Text style={styles.home_title}>Bem-vindo, {name}</Text>
        <Image
          style={styles.logo}
          source={require("../../../assets/android-chrome-192x192.png")}
        />
      </View>
      <View style={styles.search_container}>
        <TextInput
          style={styles.searcher}
          onChangeText={(text) => setBuscarHorta(text)}
          placeholder={"Buscar por nome da horta"}
          placeholderTextColor={"rgba(64,81,59,0.6)"}
        />
        <Ionicons
          style={styles.iconHome}
          name={"search"}
          size={24}
          color={"rgba(64, 81, 59, 0.6)"}
        />
      </View>
      <Text style={styles.minhasHortas}>Minhas hortas</Text>


      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Notification Title: {notification && notification.request.content.title} </Text>
          <Text>Notification Body: {notification && notification.request.content.body}</Text>
          <Text>Notification Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        </View>

        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        />
      </View>



      <View style={styles.hortas_container}>
        {gardenData != "O usuário ainda não possui hortas criadas." ? (
          filtrarHortas().map((garden) => (
            <Pressable
              key={garden.id}
              style={styles.horta}
              onPress={async () => {
                console.log(garden);
                await setSelectedGardenFunction(garden);
                navigation.navigate("ViewGarden");
              }}
            >
              <View>
                <Text style={styles.textoSuperior}>{garden.name}</Text>
              </View>
              <View style={styles.textoInferiorContainer}>
                <Text style={styles.textoInferior}>Umidade: {garden.lastMeasures ? garden.lastMeasures[0].measurement : 0} %</Text>
                {/*<Text style={styles.textoInferior}>Água: {}</Text>*/}
              </View>
              <Ionicons
                style={styles.iconHorta}
                name={"close-circle"}
                size={30}
                color={"#9DC08B"}
                onPress={handleDeleteIconPress}
              />
              <DeleteModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onClick={() => handleDelete(garden.id)}
                texto={"Deseja mesmo excluir esta horta?"}
              />
              {/*<Button title="excluir horta" onPress={()=>handleDelete(garden.id)}/>*/}
            </Pressable>
          ))
        ) : (
          <Text style={styles.nenhumaHorta}>
            Não há nenhuma horta cadastrada ainda.
          </Text>
        )}
      </View>
      <View style={styles.bottomBar_container}>
        <BottomBar />
      </View>
    </View>
  );
}

