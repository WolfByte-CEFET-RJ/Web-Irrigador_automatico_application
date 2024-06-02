import React, { useState } from "react";
import { styles } from "./styles";
import { Modal, View, Text } from "react-native";
import Button from "../button/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import InputDark from "../inputDark/InputDark";
import { useIrrigationSettings } from "../../contexts/IrrigationConfigContext";
import { createAxiosInstance } from "../../services/api";

const updateConfigModal = ({ visible, onClose, texto, nome, umidade }) => {
  const api = createAxiosInstance();
  const { selectedIrrigationConfig, setIrrConfig } = useIrrigationSettings();
  const [name, setName] = useState(nome);
  const [Umidade, setUmidade] = useState(umidade);

  const data = {
    name: name,
    humidityValue: Umidade
  }
  
  const handleUpdateConfig = async () => {
    try{
      const response = await api.patch(`/setting/${selectedIrrigationConfig.id}`, data);
      const IrrigationConfigUpdated = await api.get("/userSettings");
      setIrrConfig(IrrigationConfigUpdated.data);
      onClose();
    }catch(error){
      console.log(error);
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Ionicons
            style={styles.iconHorta}
            name={"close-circle-outline"}
            size={30}
            color={"#40513B"}
            onPress={onClose}
          />
          {selectedIrrigationConfig &&(
          <View style={styles.input_container}>
              <InputDark label="Nome" value= {name} onChangeText={(text) => setName(text)} />
              <InputDark label="Nível de Umidade" value = {Umidade} onChangeText={(text) => setUmidade(text)} />
          </View>
          )}
          
          <View style={styles.buttonContainer}>
            <Button
              title="Alterar configuração"
              buttonHeight={36.6}
              fontSize={17}
              onPress={() => handleUpdateConfig()}
            />
          </View>
          <View style={styles.alert_container}>
            <Ionicons
              // style={styles.iconHorta}
              name={"warning"}
              size={30}
              color={"#D26E28"}
            />
            <Text style={styles.alert_text}>
              A alteração ocorrerá brevemente após o envio dessas informações e
              acionada imediatamente caso a umidade estiver abaixo do
              estabelecido e o nível de água no reservatório estiver acima do
              estabelecido.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default updateConfigModal;
