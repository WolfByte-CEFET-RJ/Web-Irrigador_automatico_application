import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "./styles";
import Svg, { Rect } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "../../components/bottomBar/BottomBar";
import { StatusBar } from "expo-status-bar";
import Button from "../../components/button/Button";
import EditModal from "../../components/editModal/EditModal";
import { useGarden } from "../../contexts/GardenContext";
import { createAxiosInstance } from "../../services/api";

const ViewGarden = () => {
  const { selectedGarden } = useGarden();
  const [irrigationName, setIrrigationName] = useState("Default");
  const api = createAxiosInstance();
  console.log(selectedGarden);

  //fetch para pegar a umidade da horta
  useEffect(() => {
    async function fetchIrrigationName() {

      // var measuresGarden = await api.get(`/measures/garden/${selectedGarden.id}`);
      if(selectedGarden.irrigationId !== 1){
        const response = await api.get(`/setting/${selectedGarden.irrigationId}`);
        setIrrigationName(response.data.name);
      }
    }
    fetchIrrigationName();
  }, [selectedGarden]);

  //variaveis que mexem no grafico da horta
  const porcentagemUmidade = selectedGarden.lastMeasures ? selectedGarden.lastMeasures[0].measurement : 0;

  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);

  // const handleDeleteIconPress = () => {
  //   setModalVisible(true);
  // };


  return (
    <View style={styles.view_container}>
      <View style={styles.view_title_container}>
        <Pressable style={styles.return_btn}>
          <Ionicons
            style={styles.iconHorta}
            name={"arrow-back-outline"}
            size={30}
            color={"#40513B"}
            onPress={() => navigation.navigate("Home")}
          />
        </Pressable>
        <Text style={styles.view_title}>{selectedGarden.name}</Text> 
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <SafeAreaView style={styles.view_description}>
          <Text style={styles.descriptionText}>
            {selectedGarden.description}
          </Text>
        </SafeAreaView>
        <Text style={styles.config_Text}>
          Configuração: {irrigationName}
        </Text>

        <SafeAreaView style={styles.view_bars}>
          {/* Barra de Umidade */}
          <View style={styles.view_bars_status}>
            <View style={styles.info_container}>
              <Text
                style={[
                  styles.view_horta_text,
                  { marginTop: 233.93 - porcentagemUmidade * 2.33 - 20 },
                ]}
              >
                {porcentagemUmidade}%
              </Text>
              <View style={styles.info_graph}>
                <Image
                  source={require("../../../assets/ion_water.png")}
                  style={styles.bar_icon}
                />
                <Svg height="233.93" width="65.15" style={styles.svg}>
                  <Rect
                    x="0"
                    y={233.93 - porcentagemUmidade * 2.33}
                    width="65.15"
                    height={porcentagemUmidade * 2.33}
                    fill="#609966"
                  />
                </Svg>
                <Text style={styles.view_horta_text}>Umidade</Text>
              </View>
            </View>
          </View>
          {/* Barra de Água */}
          {/*
                <View style={styles.view_bars_status}>
                    <View style={styles.info_container}>
                        <View style={styles.info_graph}>
                            <Image source={require('../../../assets/mdi_cup-water.png')} style={styles.bar_icon}/>
                            <Svg height="233.93" width="65.15" style={styles.svg}>
                                <Rect
                                    x="0"
                                    y={233.93 - (porcentagemAgua * 2.33)}
                                    width="65.15"
                                    height={porcentagemAgua * 2.33}
                                    fill="#609966"
                                />
                            </Svg>
                            <Text style={styles.view_horta_text}>Água</Text>
                        </View>
                        <Text style={[styles.view_horta_text, { marginTop: 233.93 - (porcentagemAgua * 2.33) - 20 }]}>
                            {porcentagemAgua}%
                        </Text>
                    </View>
                </View>*/}
        </SafeAreaView>

        <SafeAreaView style={styles.btndiv}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <EditModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
        />
      </ScrollView>
      <View style={styles.bottomBar_container}>
        <BottomBar />
      </View>
      <StatusBar style="light" />
    </View>
  );
};

export default ViewGarden;
