import React from 'react';
import { styles } from './styles';
import { Modal, View, Text} from 'react-native';
import ButtonOrange from '../buttonOrange/ButtonOrange';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';

const newConfigModal = ({visible, onClose, texto}) => {
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
          <TextInput/>
          <View style={styles.buttonContainer}>
            <ButtonOrange title="Excluir" onPress={() => onDelete(hortaToDelete)} />
          </View>
          <View style={styles.alertText}>
            <Ionicons
              // style={styles.iconHorta}
              name={'warning'}
              size={30}
              color={'#D26E28'}
            />
            <Text>A irrigação será acionada automaticamente se a umidade estiver menor do que a estabelecida e se o nível de água do reservatório estiver maior do que o estabelecido</Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default  newConfigModal;