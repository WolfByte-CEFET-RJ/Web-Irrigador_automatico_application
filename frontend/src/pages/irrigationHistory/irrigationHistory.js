import React, { useEffect, useState } from "react";
import {styles} from "./styles.js"
import { View, Text, TextInput, Pressable } from "react-native";
import { createAxiosInstance } from "../../services/api.js";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomBar from "../../components/bottomBar/BottomBar.js";

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
            setHistorico(data);
            setDates(Object.keys(data));
            // setData(resp.data);
            console.log(historico);
            console.log(dates);
            // console.log(data[0]);

        }catch(error){
          setHistorico(error.response.data);
          console.log(error.response.data);
            // console.error("Erro ao buscar hortas:", error);
        }

    }
    fetchHistory();
  },[historico.length, setHistorico])
  

  const filtrarIrrigations = () => {
    return historico.filter((historico) =>
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
      <View style={styles.irrigation_History_container}>
        {historico === "Nenhum histórico de irrigação foi encontrado!" ? (

        dates.map((date)=>(
          <View style={{width:"90%", alignItems:"center", justifyContent:"center"}}>
          <Text style={styles.irrigation_title}>{date}</Text>
          
          {historico[date].map((irr, index) => (
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
                <Text style={styles.textoInferior}>Horario:
                  <Text style={styles.textoInferiorBold}>{irr.date}</Text>
                  </Text>
              </View>
            </Pressable>
            ))}
          </View>
        ))
      ) : (
        <View >
          <Text style={styles.noIrrigation}> Nenhum histórico de irrigação foi encontrado! </Text>
        </View>
      )}

      </View>
      <View style={styles.bottomBar_container}>
        <BottomBar />
      </View>
    </View>
  );
}
