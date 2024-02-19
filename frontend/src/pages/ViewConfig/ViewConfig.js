import React, { useState } from 'react';
import {Text, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, View, Pressable} from 'react-native';
import { styles } from './styles';
import BottomBar from '../../components/bottomBar/BottomBar';
import Ionicons from '@expo/vector-icons/Ionicons';
import DeleteModal from '../../components/deleteModal/DeleteModal';
import NewConfigModal from '../../components/newConfigModal/newConfigModal';
import { createAxiosInstance } from "../../services/api";
import { useConfig } from '../../contexts/ConfigContext';

const ViewConfig = () => {

  const fakeConfig = [
    {
      "nomeConfiguracao": "Configuração 1",
      "porcentagemUmidade": 50,
      "porcentagemAgua": 30
    },
    {
      "nomeConfiguracao": "Configuração 2",
      "porcentagemUmidade": 60,
      "porcentagemAgua": 40
    },
    {
      "nomeConfiguracao": "Configuração 3",
      "porcentagemUmidade": 70,
      "porcentagemAgua": 50
    }
  ]

  const api = createAxiosInstance();
  const { configData, setConfig } = useConfig();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const fetchConfig = async () => {
    try {
      const response = await api.get('/setting/')
      setConfig(response.data)
      console.log(response.data)
    } catch (error) {
      console.error("Erro ao buscar configuração", error)
    }
  }

  fetchConfig()

  const [isModalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [isModalConfigVisible, setModalConfigVisible] = useState(false);


  const handleDeleteIconPress = () => {
    setModalDeleteVisible(true);
  };

  const handleCreateConfig = () => {
    setModalConfigVisible(true);
  }

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
            <Text style={styles.config_stats}> Umidade: <Text style={styles.config_number}> 25% </Text> </Text>
            <Text style={styles.config_stats}> Água: <Text style={styles.config_number}> 14% </Text> </Text> 
          </View>
        </View>
      </View>
      <View style={styles.config_create_conteiner}>
        <View style={styles.config_create}>
          <Text style={styles.config_create_title}> Personalizadas </Text>
          <Ionicons
              style={styles.iconConfig}
              name={'add-circle'}
              size={30}
              color={'#40513B'}
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
        {fakeConfig.map((config) => (
          <Pressable style={styles.configuracao}>
            <Text style={styles.config_name}> {config.nomeConfiguracao} </Text>
            <View style={styles.config_stats_container}>
              <Text style={styles.config_stats}> Umidade: <Text style={styles.config_number}> {config.porcentagemUmidade} </Text> </Text>
              <Text style={styles.config_stats}> Água: <Text style={styles.config_number}> {config.porcentagemAgua} </Text> </Text> 
            </View>
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
        ))}
      </View>
      <View style={styles.bottomBar_container}>
        <BottomBar/>
      </View>
    </View>
  );
};

export default ViewConfig;
