import React, { useState } from "react";
import { styles } from "./styles";
import { Modal, View, Text } from "react-native";
import Button from "../button/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import InputDark from "../inputDark/InputDark";
import SuccessComponent from "../success/SuccessComponent";
import ErrorComponent from "../Error/ErrorComponent";
import { useIrrigationSettings  } from "../../contexts/IrrigationConfigContext";
import { SelectList } from "react-native-dropdown-select-list";
import { createAxiosInstance } from "../../services/api";


const newConfigModal = ({ visible, onClose, texto }) => {
  
  const[name,setName]=useState('');
  const[humidityValue,setHumidityValue] = useState('');
  const[success, setSuccess] = useState("");
  const[Error, setError] = useState("");
  const api = createAxiosInstance();
  const configArray = [
    {key:25, value:"Pouco Úmido"},
    {key:50, value:"Úmido"},
    {key:75, value:"Muito Úmido"}
  ]
  
  //rota: post(/setting)
  const { setIrrConfig } = useIrrigationSettings();

  async function handleCreateConfig(){
    const data = {
      name: name,
      humidityValue: humidityValue
    };
    if (name === "" || humidityValue === "") {
      // setError("Preencha todos os campos");
      // setTimeout(() => {
      //   setError("");
      // }, 3000);
    } else {
      try {
        const response = await api.post("/setting", data);
        const userIrrigationSettings = await api.get(`/userSettings`);
        setIrrConfig(userIrrigationSettings.data);
        setName("");
        setHumidityValue("");
        onClose();
      } catch (error) {
        console.log(error);
      }
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
            <InputDark label="Nome" placeHolder="Ex: Configuração #001" value ={name} onChangeText={(text)=>setName(text)} />
            {/* <InputDark label="Nível de Umidade" placeHolder="Ex: 45" value ={humidityValue} onChangeText={(text)=>setHumidityValue(text)} /> */}
            {/* <InputDark label="Nível de Água" placeHolder="Ex: 50" /> */}
          </View>
          <View>
            <Text style={styles.label}>Nível de Umidade</Text>
          </View>

          <View style={{ marginBottom: "5%", width:"77%"}}>
            <SelectList 
                boxStyles={styles.selectContainer}
                dropdownStyles={styles.dropdownBox}
                setSelected={setHumidityValue}
                data={configArray}
                save="key"
                defaultOption={configArray[1]}
                fontFamily="Montserrat-Bold"
                // color="rgba(64,81,59,0.6)"
                inputStyles={{color:"rgba(64,81,59,0.6)"}}
                dropdownTextStyles={{color:"rgba(64,81,59,0.6)"}}
              />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Adicionar configuração"
              buttonHeight={20}
              fontSize={15}
              onPress = {() => handleCreateConfig()}
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
              A irrigação será acionada automaticamente se a umidade estiver
              menor do que a estabelecida.
            </Text>
          </View>
          {/* <ErrorComponent message={Error} /> */}
          <SuccessComponent message={success} />
        </View>
      </View>
    </Modal>
  );
};

export default newConfigModal;
