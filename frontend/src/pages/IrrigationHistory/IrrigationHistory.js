import React, { useEffect, useState } from "react";
import {styles} from "./styles.js"
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { createAxiosInstance } from "../../services/api.js";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomBar from "../../components/bottomBar/BottomBar.js";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";

export default function IrrigationHistory() {
  const [buscarHorta, setBuscarHorta] = useState("");
  const [historico, setHistorico] = useState([]);
  const [dates, setDates]= useState([]);
  const api = createAxiosInstance();

  function groupByDate(irrigations) {
    return irrigations.reduce((acc, irrigation) => {
      const date = irrigation.date.split(" ")[2];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(irrigation);
      return acc;
    }, {});
  }



  useEffect(()=>{
    async function fetchHistory() {
        try{
            const resp = await api.get(`/history`);
            console.log(resp);
            const data = groupByDate(resp.data);
            console.log(data);
            setHistorico(data);
            setDates(Object.keys(data));
            // setData(resp.data);
            console.log(historico);
            console.log(dates);
            // console.log(data[0]);

        }catch(error){
          setHistorico(error.response.data.message);
          console.log(historico);
            // console.error("Erro ao buscar hortas:", error);
        }

    }
    fetchHistory();
    const handleCallNotifications = async ()=>{
      // const { status } = await Notifications.getPermissionsAsync();
  
      // if( status !== 'granted'){
      //   console.log("Voce n deixou as notificaçao ativa")
      //   return;
      // }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Irrigação foi feita",
          body: "Irrigação executada com sucesso"
        },
        trigger:{
          seconds:5,
        },
      })
    }
    handleCallNotifications();
  },[historico.length, setHistorico])
  

  const filtrarIrrigations = (data) => {
    return historico[data].filter((historico) =>
      historico.gardenName.toLowerCase().includes(buscarHorta.toLowerCase())
    );
  };

  return (
    <View style={styles.irrigation_container}>
      <View style={styles.irrigation_title_container}>
        <Text style={styles.irrigation_title}> Histórico de irrigação </Text>
      </View>
      <View style={styles.search_container}>
        <TextInput
          style={styles.searcher}
          onChangeText={(text) => setBuscarHorta(text)}
          placeholder={"Buscar por nome da horta"}
          placeholderTextColor={"rgba(64,81,59,0.6)"}
        />
        <Ionicons
          style={styles.iconSearch}
          name={"search"}
          size={24}
          color={"rgba(64, 81, 59, 0.6)"}
        />
      </View>
      <SafeAreaView style={styles.irrigation_History_container}>
      <ScrollView>
        {historico === "Nenhum histórico de irrigação foi encontrado!" ? (
        <View >
          <Text style={styles.noIrrigation}> Nenhum histórico de irrigação foi encontrado! </Text>
        </View>
        ) : (
          dates.reverse().map((date) => {
            const filteredIrrigations = filtrarIrrigations(date);
            if (filteredIrrigations.length > 0) {
              return (
                <View key={date} style={{ width: "90%", alignItems: "center", justifyContent: "center" }}>
                  <Text style={styles.irrigation_title_data}>{date}</Text>
                  {filteredIrrigations.map((irr, index) => (
                    <Pressable
                      key={index}
                      style={styles.Irrigation}
                      onPress={async () => {
                        console.log(irr);
                      }}
                    >
                      <View>
                        <Text style={styles.textoSuperior}>{irr.gardenName}</Text>
                      </View>
                      <View style={styles.textoInferiorContainer}>
                        <Text style={styles.textoInferior}>
                          Horario:{" "}
                          <Text style={styles.textoInferiorBold}>{ irr.date.split(" ")[0]}</Text>
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              );
            }
            return null;
          })
        )}
      </ScrollView>
      </SafeAreaView>
      <View style={styles.bottomBar_container}>
        <BottomBar />
      </View>
    </View>
  );
}
