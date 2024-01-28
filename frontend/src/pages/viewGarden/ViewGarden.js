import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native';
import { styles } from './styles';
import Svg, { Rect, Circle } from 'react-native-svg';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BottomBar from '../../components/bottomBar/BottomBar';
import { StatusBar } from 'expo-status-bar';
import Button from "../../components/button/Button";
import EditModal from '../../components/editModal/EditModal';
import { useGarden } from '../../contexts/GardenContext';

const ViewGarden = () => {
    const { selectedGarden } = useGarden();

    const porcentagemUmidade = 50;
    const porcentagemAgua = 50;

    const navigation = useNavigation();   

    const [isModalVisible, setModalVisible] = useState(false);

    const handleDeleteIconPress = () => {
        setModalVisible(true);
    };

  // TODO: consertar as barras que mostram os níveis de umidade e de água
  // TODO: adicionar mensagem que mostra o estado da horta (tudo certo, nível de água/umidade baixo/alto)

    return (
    
    <View style={styles.view_container}>
        <View style={styles.view_title_container}>
            <Pressable style={styles.return_btn}>
                <Ionicons
                    style={styles.iconHorta}
                    name={'arrow-back-outline'}
                    size={30}
                    color={'#40513B'}
                    onPress={() => navigation.navigate('Home')}
                />
            </Pressable>
            <Text style={styles.view_title}>{selectedGarden.name}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <SafeAreaView style={styles.view_description}>
                <Text style={styles.descriptionText}>{selectedGarden.description}</Text>
            </SafeAreaView>
            <Text style={styles.config_Text}>Configuração: <b>{selectedGarden.irrigationId}</b></Text>
            
                    

            <SafeAreaView style={styles.view_bars}>
                {/* Barra de Umidade */}
                <View style={styles.view_bars_status}>
                    <Image source={require('../../../assets/ion_water.png')} style={styles.bar_icon}/>
                    <Svg height="200" width="50" style={styles.svg}>
                        <Rect
                            x="0"
                            y={200 - (porcentagemUmidade * 2)}
                            width="50"
                            height={porcentagemUmidade * 2}
                            fill="#609966"
                        />
                    </Svg>
                    <Text>Umidade: {porcentagemUmidade}%</Text>
                </View>
                {/* Barra de Água */}
                <View style={styles.view_bars_status}>
                    <Image source={require('../../../assets/mdi_cup-water.png')} style={styles.bar_icon}/>
                    <Svg height="200" width="50" style={styles.svg}>
                        <Rect
                            x="0"
                            y={200 - (porcentagemAgua * 2)}
                            width="50"
                            height={porcentagemAgua * 2}
                            fill="#609966"
                        />
                    </Svg>
                    <Text>Água: {porcentagemAgua}%</Text> 
                </View>
            </SafeAreaView> 

            <SafeAreaView style={styles.btndiv}>
                <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
            </SafeAreaView >
            <EditModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
            />
        </ScrollView>
        <View style={styles.bottomBar_container}>
            <BottomBar/>
        </View>
        <StatusBar style="light"/>
    </View>
    );
};

export default ViewGarden;
