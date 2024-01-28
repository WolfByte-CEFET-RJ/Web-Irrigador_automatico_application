import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable,TextInput} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from "axios";
import BottomBar from '../../components/bottomBar/BottomBar'
import DeleteGardenModal from "../../components/deleteModal/DeleteGardenModal";
import { StatusBar } from 'expo-status-bar';
import EditModal from "../../components/editModal/EditModal";
import { useAuth } from '../../contexts/AuthContext';
import { createAxiosInstance } from "../../services/api";

// !ATENÇÃO: Para fazer as hortas rodarem você tem que digitar "json-server --watch hortas.json --port 3001" na pasta data
const API_URL = 'http://localhost:3001';

export default function Home(){
  const api = createAxiosInstance();
  const navigation = useNavigation();
  const [buscarHorta, setBuscarHorta] = useState('');
  const { setGarden, gardenData } = useAuth();

  useEffect(() => {
    async function fetchHortas() {
      try {
        const response = await api.get(`/garden`);
        // console.log(JSON.stringify(response.data))
        setGarden(response.data);
        // console.log(gardenData);
      } catch (error) {
        console.error("Erro ao buscar hortas:", error);
      }
    }
    fetchHortas();
  }, [gardenData]);

  const filtrarHortas = () => {
    return gardenData.filter((garden) =>
      garden.name.toLowerCase().includes(buscarHorta.toLowerCase())
    );
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const handleDeleteIconPress = () => {
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const responseDelete = await api.delete(`/garden/${id}`);
      console.log(JSON.stringify(responseDelete.data))
      setGarden(responseDelete.data);
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao excluir horta:', error);
    }
  };

  // TODO: renderizar o nome do usuário
  // TODO: filtrar por nome (Feito ~terencio)
  
  return(
    <View style={styles.home_container}>
      <StatusBar style="dark-content"/>
      <View style={styles.home_title_container}>
        <Text style={styles.home_title}>Bem-vindo, username</Text>
        <Image style={styles.logo} source={require('../../../assets/android-chrome-192x192.png')}/>
      </View>
      <View style={styles.search_container}>
        <TextInput
          style={styles.searcher}
          onChangeText={(text) => setBuscarHorta(text)}
          placeholder={"Buscar por nome da horta"}
          placeholderTextColor={"rgba(64,81,59,0.6)"} 
        />
        <Ionicons 
            style={styles.iconHome} 
            name={'search'} 
            size={24} 
            color={'rgba(64, 81, 59, 0.6)'}
          />
      </View>
      <Text style={styles.minhasHortas}>Minhas hortas</Text>
      <View style={styles.hortas_container}>
      {filtrarHortas().map((garden) => (
          <Pressable 
            key={garden.id} 
            style={styles.horta}
            onPress={() => navigation.navigate('ViewGarden')}
          >
            <View>
              <Text style={styles.textoSuperior}>{garden.name}</Text>
            </View>
            <View style={styles.textoInferiorContainer}>
              <Text style={styles.textoInferior}>Umidade: {}</Text>
              <Text style={styles.textoInferior}>Água: {}</Text>
            </View>
            <Ionicons
              style={styles.iconHorta}
              name={'close-circle'}
              size={30}
              color={'#9DC08B'}
              onPress={handleDeleteIconPress}
            />
            <DeleteGardenModal
              visible={isModalVisible}
              onClose={() => setModalVisible(false)}
              onDelete={() => handleDelete(garden.id)}
              hortaToDelete={garden.id}
            />
          </Pressable>
        ))}
      </View>
      <View style={styles.bottomBar_container}>
        <BottomBar/>
      </View>
    </View>
  )
}