//react / native
import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  View,
  Pressable,
} from "react-native";

//
import { createAxiosInstance } from "../../services/api";

//styles e images
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./styles";
//components
import Button from "../../components/button/Button";
import BottomBar from "../../components/bottomBar/BottomBar";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import NewConfigModal from "../../components/newConfigModal/newConfigModal";
import UpdateConfigModal from "../../components/updateConfig/updateConfig";
import { useIrrigationSettings  } from "../../contexts/IrrigationConfigContext";

const ViewConfig = () => {


  const api = createAxiosInstance();
  // const { configData, setConfig } = useState([]);
  const { IrrigationConfig, setIrrigationConfig } = useIrrigationSettings();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    async function fetchConfig() {
      try {
        console.log("entrou no fetchConfig");
        const userIrrigationSettings = await api.get(`/userSettings`);
        console.log(userIrrigationSettings.data);
        setIrrigationConfig(userIrrigationSettings.data);

      } catch (error) {
        console.error("Erro ao buscar configuração", error);
      }
    }
    fetchConfig();
  }, []);

  const [isModalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [isModalConfigVisible, setModalConfigVisible] = useState(false);
  const [isModalUpdateVisible, setModalUpdateVisible] = useState(false);

  const handleDeleteIconPress = () => {
    setModalDeleteVisible(true);
  };

  const handleCreateConfig = () => {
    setModalConfigVisible(true);
  };

  const handleUpdateConfigPress = () => {
    setModalUpdateVisible(true);
  };

  return (
    <View style={styles.config_container}>
      <View style={styles.config_title_container}>
        <Text style={styles.config_title}> Configuração de </Text>
        <Text style={styles.config_title}> irrigação </Text>
      </View>
      <View style={styles.config_default_container}>
        <View style={styles.config_default}>
          <Text style={styles.config_name}> Default </Text>
          <View style={styles.config_stats_container}>
            <Text style={styles.config_stats}>
              Umidade: <Text style={styles.config_number}> 25% </Text>{" "}
            </Text>
            {/* <Text style={styles.config_stats}>
              {" "}
              Água: <Text style={styles.config_number}> 14% </Text>{" "}
            </Text> */}
          </View>
        </View>
      </View>
      <View style={styles.config_create_conteiner}>
        <View style={styles.config_create}>
          <Text style={styles.config_create_title}> Personalizadas </Text>
          <Ionicons
            style={styles.iconConfig}
            name={"add-circle"}
            size={30}
            color={"#40513B"}
            onPress={handleCreateConfig}
          />
          <NewConfigModal
            visible={isModalConfigVisible}
            onClose={() => setModalConfigVisible(false)}
            texto={""}
          />
        </View>
      </View>
      <View style={styles.config_all_container}>
        {IrrigationConfig ? (
          IrrigationConfig.map((config) => (
            <Pressable style={styles.configuracao}>
              <Text style={styles.config_name}> {config.name} </Text>
              <View style={styles.config_stats_container}>
                {/* <Text style={styles.config_stats}> Umidade: <Text style={styles.config_number}> {config.humidityValue} </Text> </Text> */}
              </View>
              <Ionicons
                style={styles.updateConfig}
                name={'pencil'}
                size={30}
                color={'#9DC08B'}
                onPress={handleUpdateConfigPress}
                />
              <UpdateConfigModal
                visible={isModalUpdateVisible}
                onClose={() => setModalUpdateVisible(false)}
              />
              <Ionicons
                style={styles.iconConfig}
                name={'close-circle'}
                size={30}
                color={'#9DC08B'}
                onPress={handleDeleteIconPress}
                />
              <DeleteModal
                visible={isModalDeleteVisible}
                onClose={() => setModalDeleteVisible(false)}
                // onDelete={() => handleDelete(garden.id)}
                // hortaToDelete={garden.id}
                texto={"Deseja mesmo excluir esta configuração?"}
                />        
            </Pressable>
          ))
        ) : (
          <Text> não possui configurações de hortas </Text>
        )}
      </View>
      <View style={styles.bottomBar_container}>
        <BottomBar />
      </View>
    </View>
  );
};

export default ViewConfig;
