import React, { useState } from "react";
import { styles } from "./styles";
import { Modal, View, Text, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ButtonOrange from "../buttonOrange/ButtonOrange";
import { useGarden } from "../../contexts/GardenContext";
import { createAxiosInstance } from "../../services/api";
import { useIrrigationSettings } from "../../contexts/IrrigationConfigContext";
import { SelectList } from "react-native-dropdown-select-list";

const EditModal = ({ visible, onClose }) => {
  const { selectedGarden, setSelectedGarden, setGarden, gardenData } = useGarden();

  const [newName, setNewName] = useState(selectedGarden.name);
  const [newDescription, setNewDescription] = useState(selectedGarden.description);
  const [newIrrigationId, setNewIrrigationId] = useState(irrigationConfig.irrigationId);
  const api = createAxiosInstance();

  
  const { irrigationConfig, setIrrConfig } = useIrrigationSettings();
 

  const configDataArray = irrigationConfig.map((irr, index) => ({
    key: irr.id,
    value: irr.name
  }))
  

  const handleSaveChanges = async (id) => {
    const updatedData = {
      name: newName,
      description: newDescription,
      irrigationId: newIrrigationId,
    };
    try {
      
      //patch e atualiza no context "selectedGarden"
      const response = await api.patch(`/garden/${id}`, updatedData);
      
      const updatedHorta = await api.get(`/garden/${id}`);
      setSelectedGarden(updatedHorta.data);

      //atualiza todas as hortas no context
      const attGarden = await api.get(`/myGardens`);
      setGarden(attGarden.data);
      
      //dá update só no selected garden
      //tarefa: substituir o selectedGarden?
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

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
          <View style={styles.information}>
            <View style={styles.informationConfiguration}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                placeholderTextColor="#40513B"
                style={styles.inputNome}
                value={newName}
                onChangeText={(text) => setNewName(text)}
                placeholder={selectedGarden.name}
              ></TextInput>
            </View>
            <View style={styles.informationConfiguration}>
              <Text style={styles.label}>Descrição</Text>
              <TextInput
                placeholderTextColor="#40513B"
                style={styles.inputDescricao}
                value={newDescription}
                onChangeText={(text) => setNewDescription(text)}
                placeholder={selectedGarden.description}
              ></TextInput>
            </View>
            <View style={styles.informationConfiguration}>
              <Text style={styles.label}>Configuração de irrigação</Text>
              {/* <TextInput
                style={styles.inputConfiguracao}
                value={newIrrigationId}
                onChangeText={(text) => setNewIrrigationId(text)}
                placeholder={selectedGarden.irrigationId}
              ></TextInput> */}
              <SelectList 
              boxStyles={styles.selectContainer}
              dropdownStyles={styles.dropdownBox}
              setSelected={setNewIrrigationId}
              data={configDataArray}
              save="key"
              defaultOption={configDataArray[0]}
              fontFamily="Montserrat-Bold"
              // color="rgba(64,81,59,0.6)"
              inputStyles={{color:"rgba(64,81,59,0.6)"}}
              dropdownTextStyles={{color:"rgba(64,81,59,0.6)"}}
            />
            </View>
            <View style={styles.buttonContainer}>
              <ButtonOrange
                title="Salvar alterações"
                onPress={() => handleSaveChanges(selectedGarden.id)}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;
