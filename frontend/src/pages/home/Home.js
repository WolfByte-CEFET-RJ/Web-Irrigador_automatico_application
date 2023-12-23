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

// !ATENÇÃO: Para fazer as hortas rodarem você tem que digitar "json-server --watch hortas.json --port 3001" na pasta data
const API_URL = 'http://localhost:3001';

export default function Home(){
  
  const navigation = useNavigation();
  const [hortas, setHortas] = useState([]);
  const [buscarHorta, setBurcarHorta] = useState('');

  useEffect(() => {
    async function fetchHortas() {
      try {
        const response = await axios.get(`${API_URL}/hortas`);
        setHortas(response.data);
      } catch (error) {
        console.error("Erro ao buscar hortas:", error);
      }
    }

    fetchHortas();
  }, []);

  const filtrarHortas = () => {
    return hortas.filter((horta) =>
      horta.nome.toLowerCase().includes(buscarHorta.toLowerCase())
    );
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const handleDeleteIconPress = () => {
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/hortas/${id}`);
      setHortas((prevHortas) => prevHortas.filter((horta) => horta.id !== id));
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao excluir horta:', error);
    }
  };

  // TODO: renderizar o nome do usuário
  // TODO: filtrar por nome 
  
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
          onChangeText={(text) => setBurcarHorta(text)}
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
      {filtrarHortas().map((horta) => (
          <Pressable 
            key={horta.id} 
            style={styles.horta}
            onPress={() => navigation.navigate('ViewGarden', { horta })}
          >
            <View>
              <Text style={styles.textoSuperior}>{horta.nome}</Text>
            </View>
            <View style={styles.textoInferiorContainer}>
              <Text style={styles.textoInferior}>Umidade: {horta.umidade}</Text>
              <Text style={styles.textoInferior}>Água: {horta.agua}</Text>
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
              onDelete={(horta) => handleDelete(horta)}
              hortaToDelete={horta}
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