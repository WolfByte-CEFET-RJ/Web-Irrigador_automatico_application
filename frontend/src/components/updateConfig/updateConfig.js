import React, { useState } from "react";
import { styles } from "./styles";
import { Modal, View, Text, Image } from "react-native";
import ButtonOrange from "../buttonOrange/ButtonOrange";
import Ionicons from "@expo/vector-icons/Ionicons";
import InputDark from "../inputDark/InputDark";
import { useIrrigationSettings } from "../../contexts/IrrigationConfigContext";
import { createAxiosInstance } from "../../services/api";
import { Rect, Svg } from "react-native-svg";
import Ion_water from "./../../../assets/ion_water.png";

const UpdateConfigModal = ({ visible, onClose, id, nome, umidade }) => {
  const api = createAxiosInstance();
  const { setIrrConfig } = useIrrigationSettings();
  const [name, setName] = useState(nome);
  const [Umidade, setUmidade] = useState(umidade);

  const data = {
    name: name,
    humidityValue: Umidade
  }
  
  const handleUpdateConfig = async () => {
    const data2 = {
      humidityValue: Umidade
    }
    try {
      if(name==nome){
        const resp = await api.patch(`/setting/${id}`, data2);
        const IrrigationConfigUpdated = await api.get("/userSettings");
        setIrrConfig(IrrigationConfigUpdated.data);
        onClose();
      }
      else{
        const response = await api.patch(`/setting/${id}`, data);
        const IrrigationConfigUpdated = await api.get("/userSettings");
        setIrrConfig(IrrigationConfigUpdated.data);
        onClose();

      }
    } catch (error) {
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
        
          <View style={styles.input_container}>
              <InputDark label="Nome" value= {name} onChangeText={(text) => setName(text)} />
              
              <InputDark label="Nível de Umidade" value = {Umidade} onChangeText={(text) => setUmidade(text)} />
          </View>
          <View style={styles.view_bars_status}>
              {/* <View style={styles.info_container}>
                <Text
                  style={[
                    styles.view_horta_text,
                    { marginTop: 233.93 - Umidade * 2.33 - 20 },
                  ]}
                >
                  {Umidade}%
                </Text>
                <View style={styles.info_graph}>
                  <Image
                    source={Ion_water}
                    style={styles.bar_icon}
                  />
                  <Svg height="233.93" width="65.15" style={styles.svg}>
                    <Rect
                      x="0"
                      y={233.93 - Umidade * 2.33}
                      width="65.15"
                      height={Umidade * 2.33}
                      fill="#609966"
                    />
                  </Svg>
                  <Text style={styles.view_horta_text}>Umidade</Text>
                </View>
              </View> */}
            </View>
          <View style={styles.buttonContainer}>
            <ButtonOrange
              title="Salvar Alterações"
              buttonHeight={36.6}
              fontSize={17}
              onPress={handleUpdateConfig}
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
              estabelecido.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateConfigModal;