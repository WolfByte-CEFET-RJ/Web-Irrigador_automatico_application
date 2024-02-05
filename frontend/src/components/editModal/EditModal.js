import React, { useState } from 'react';
import { styles } from './styles';
import { Modal, View, Text, TextInput} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ButtonOrange from '../buttonOrange/ButtonOrange';
import { useGarden } from '../../contexts/GardenContext';
import { createAxiosInstance } from '../../services/api';

const EditModal = ({visible, onClose}) => {
  const { selectedGarden, setSelectedGarden } = useGarden();
  const [ newName, setNewName ] = useState('');
  const [ newDescription, setNewDescription ] = useState('');
  const [ newIrrigationId, setNewIrrigationId ] = useState('');
  const api = createAxiosInstance();

  const handleSaveChanges = async (id) => {
    try {
      const updatedData = {
        name: newName,
        description: newDescription,
        irrigationId: newIrrigationId,
      };
      const response = await api.patch(`/garden/${id}`, updatedData) ;
      setSelectedGarden(updatedData)
      console.log(response);
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
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
            name={'close-circle-outline'}
            size={30}
            color={'#40513B'}
            onPress={onClose}
          />
          <View style={styles.information}>
            <View style={styles.informationNome}>
              <Text style={styles.label}>Nome</Text>
              <TextInput  placeholderTextColor='#40513B' style={styles.inputNome} value={newName} onChangeText={text=>setNewName(text)} placeholder={selectedGarden.name}></TextInput>
            </View>
            <View style={styles.informationDescricao}>
              <Text style={styles.label}>Descrição</Text>
              <TextInput placeholderTextColor='#40513B' style={styles.inputDescricao} value={newDescription} onChangeText={text=>setNewDescription(text)} placeholder={selectedGarden.description}></TextInput>
            </View>
            <View style={styles.informationConfiguration}>
              <Text style={styles.labelConfiguracao}>Configuração de irrigação</Text>
              <TextInput style={styles.inputConfiguracao} value={newIrrigationId} onChangeText={text=>setNewIrrigationId(text)} placeholder={selectedGarden.irrigationId}></TextInput>
            </View>
            <View style={styles.buttonContainer}>
              <ButtonOrange title="Salvar alterações" onPress={() => handleSaveChanges(selectedGarden.id)}/>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}



export default EditModal;