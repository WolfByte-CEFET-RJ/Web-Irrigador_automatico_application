import React from 'react';
import { styles } from './styles';
import { Modal, View, Text, TextInput} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ButtonOrange from '../buttonOrange/ButtonOrange';


const EditModal = ({visible, onClose}) => {
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
              <TextInput  placeholderTextColor='#40513B' style={styles.inputNome} placeholder='Horta #001'></TextInput>
            </View>
            <View style={styles.informationDescricao}>
              <Text style={styles.label}>Descrição</Text>
              <TextInput placeholderTextColor='#40513B' style={styles.inputDescricao} placeholder='Uma horta de alfaces, solo fértil, fileiras organizadas, irrigação suave, luz solar adequada, colheita contínua, frescor e nutrientes. '></TextInput>
            </View>
            <View style={styles.informationConfiguration}>
              <Text style={styles.labelConfiguracao}>Configuração de irrigação</Text>
              <TextInput style={styles.inputConfiguracao}placeholder='Testets'></TextInput>
            </View>
            <View style={styles.buttonContainer}>
              <ButtonOrange title="Salvar alterações"/>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}



export default EditModal;