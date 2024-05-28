import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from "axios";
import BottomBar from '../../components/bottomBar/BottomBar'
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { StatusBar } from 'expo-status-bar';
import EditModal from "../../components/editModal/EditModal";
import Button from "../../components/button/Button";
import { useAuth } from '../../contexts/AuthContext';
import { createAxiosInstance } from "../../services/api";
import { useGarden } from "../../contexts/GardenContext";

// !ATENÇÃO: Para fazer as hortas rodarem você tem que digitar "json-server --watch hortas.json --port 3001" na pasta data
const API_URL = 'http://localhost:3001';

export default function Home() {
  const api = createAxiosInstance();
  const navigation = useNavigation();
  const [buscarHorta, setBuscarHorta] = useState('');
  const { setGarden, gardenData, setSelectedGarden } = useGarden();
  const { token } = useAuth();
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchHortas() {
      try {
        const response = await api.get(`/myGardens`);
        setGarden(response.data);
      } catch (error) {
        console.error("Erro ao buscar hortas:", error);
      }
    }
    fetchHortas();
  }, [gardenData]);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        
        const responseD = await api.get(`/user`); //erro campo waterNotification da requisição. (branch está desatualizada com a develop)
        // const response = await axios.get("http://localhost:5000/user", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        setName(responseD.data.name);
        // handleUserNameSave(response.data.name);
        // console.log(userName);
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };
    fetchUsuario();
  }, [name]);


  useEffect(() => {
    console.log(gardenData.length)
  }, [])


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
      await axios.delete(`/garden/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao excluir horta:', error);
    }
  };


  return (
    <View style={styles.home_container}>
      <StatusBar style="dark-content" />
      <View style={styles.home_title_container}>
        <Text style={styles.home_title}>Bem-vindo, {name}</Text>
        <Image style={styles.logo} source={require('../../../assets/android-chrome-192x192.png')} />
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
      <View style={styles.hortas_container}> {gardenData != 'O usuário ainda não possui hortas criadas.' ?
        (
          filtrarHortas().map((garden) => (

            <Pressable
              key={garden.id}
              style={styles.horta}
              onPress={() => {
                setSelectedGarden(garden)
                navigation.navigate('ViewGarden')
              }
              }
            >
              <View>
                <Text style={styles.textoSuperior}>{garden.name}</Text>
              </View>
              <View style={styles.textoInferiorContainer}>
                <Text style={styles.textoInferior}>Umidade: { }</Text>
                {/*<Text style={styles.textoInferior}>Água: {}</Text>*/}
              </View>
              <Ionicons
                style={styles.iconHorta}
                name={'close-circle'} 
                size={30}
                color={'#9DC08B'}
                onPress={handleDeleteIconPress}
              />
              <DeleteModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onClick={() => handleDelete(garden.id)}
                texto={"Deseja mesmo excluir esta horta?"}
              />
              {/*<Button title="excluir horta" onPress={()=>handleDelete(garden.id)}/>*/}
            </Pressable>
          ))
        ) : (
          <Text style={styles.nenhumaHorta}> Não há nenhuma horta cadastrada ainda.</Text>
        )
      }
      </View>

      <View style={styles.bottomBar_container}>
        <BottomBar />
      </View>
    </View>
  )
}