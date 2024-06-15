import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { createAxiosInstance } from "../../services/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomBar from "../../components/bottomBar/BottomBar";
import { styles } from "./styles";

export default function IrrigationHistory() {
  const [buscarHorta, setBuscarHorta] = useState("");
  const [historico, setHistorico] = useState([]);
  const api = createAxiosInstance();


  // useEffect(()=>{
  //   async function fetchHistory() {
  //       try{
  //           const resp = await api.get(`/history`);
  //           setHistorico(resp.data)

  //       }catch(error){
  //           console.error("Erro ao buscar hortas:", error);
  //       }

  //   }
  //   fetchHistory
  // },[historico.length])

  // const filtrarIrrigations = () => {
  //   return gardenData.filter((garden) =>
  //     garden.name.toLowerCase().includes(buscarHorta.toLowerCase())
  //   );
  //};
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
        {historico != "Nenhum histórico de irrigação foi encontrado!" ? (

        historico.map((hist)=>(
          <View>
          <Text style={styles.irrigation_title}>{hist.horta}</Text>
          {/*
          // filtrarIrrigations()
          historico.map((irr) => (
            <Pressable
              // key={irr.id}
              style={styles.Irrigation}
              onPress={async () => {
                console.log(irr);
              }}
            >
              <View>
                <Text style={styles.textoSuperior}>{irr.name}</Text>
              </View>
              <View style={styles.textoInferiorContainer}>
                <Text style={styles.textoInferior}>Horario:
                  <Text style={styles.textoInferiorBold}>{irr.horario ? irr.horario : 0}</Text>
                   {/* {irr.lastMeasures ? irr.lastMeasures[0].data : 0} 
                   </Text>
                {/*<Text style={styles.textoInferior}>Água: {}</Text>
              </View>
            </Pressable>
          ))*/}
          </View>
        ))
      ) : (
        <Text style={styles.noIrrigation}>
         Nenhum histórico de irrigação foi encontrado!
        </Text>
      )}

      </View>
      <View style={styles.bottomBar_container}>
        <BottomBar />
      </View>
    </View>
  );
}
