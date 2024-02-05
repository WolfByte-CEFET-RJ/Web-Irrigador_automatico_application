import React from 'react';
import { styles } from './styles';
import { Modal, View, Text} from 'react-native';
import ButtonOrange from '../buttonOrange/ButtonOrange';
import Ionicons from '@expo/vector-icons/Ionicons';

const DeleteModal = ({ visible, onClose, onDelete, hortaToDelete, texto }) => {
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
            <Text style={styles.message}>{texto}</Text>
            <View style={styles.buttonContainer}>
              <ButtonOrange title="Excluir" onPress={() => onDelete(hortaToDelete)} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

export default DeleteModal;