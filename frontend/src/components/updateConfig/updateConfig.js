import React from 'react';
import { styles } from './styles';
import { Modal, View, Text} from 'react-native';
import Button from '../button/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
import InputDark from '../inputDark/InputDark';

const updateConfigModal = ({visible, onClose, texto}) => {
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
          <View style={styles.input_container}>
            <InputDark
              label="Nome" 
              placeHolder="Ex: Configuração #001" 
            />
            <InputDark
              label="Nível de Umidade" 
              placeHolder="Ex: 45" 
            />
            <InputDark
              label="Nível de Água" 
              placeHolder="Ex: 50" 
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Alterar configuração" buttonHeight={36.6} fontSize={17}/>
          </View>
          <View style={styles.alert_container}>
            <Ionicons
              // style={styles.iconHorta}
              name={'warning'}
              size={30}
              color={'#D26E28'}
            />
            <Text style={styles.alert_text}>A alteração ocorrerá brevemente após o envio dessas informações e acionada imediatamente caso a umidade estiver abaixo do estabelecido e o nível de água no reservatório estiver acima do estabelecido.</Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default  updateConfigModal;