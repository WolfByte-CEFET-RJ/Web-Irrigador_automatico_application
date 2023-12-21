import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView, ScrollView} from 'react-native';
import { styles } from './styles';
import Svg, { Rect } from 'react-native-svg';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BottomBar from '../../components/bottomBar/BottomBar';
import { StatusBar } from 'expo-status-bar';
import Button from "../../components/button/Button";
import { Platform } from 'react-native';

const ViewGarden = ({ route }) => {
  const { horta } = route.params || {};

  const porcentagemUmidade = (horta && horta.umidade) || 0;
  const porcentagemAgua = (horta && horta.agua) || 0;

  const navigation = useNavigation();   

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
            <Text style={styles.view_title}>{horta.nome}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <SafeAreaView style={styles.view_description}>
                <Text style={styles.descriptionText}>{horta.descricao}</Text>
            </SafeAreaView>
            <Text style={styles.config_Text}>Configuração: <b>{horta.config}</b></Text>
            <SafeAreaView style={styles.view_bars}>
                {/* Barra de Umidade */}
                <Svg height="200" width="40">
                    <Rect
                        x="10"
                        y={200 - (porcentagemUmidade * 2)}
                        width="20"
                        height={porcentagemUmidade * 2}
                        fill="#609966"
                    />
                </Svg>
                <Text>Umidade: {porcentagemUmidade}%</Text>
                {/* Barra de Água */}
                <Svg height="200" width="40">
                    <Rect
                        x="10"
                        y={200 - (porcentagemAgua * 2)}
                        width="20"
                        height={porcentagemAgua * 2}
                        fill="#609966"
                    />
                </Svg>
                <Text>Água: {porcentagemAgua}%</Text>
            </SafeAreaView> 
            <SafeAreaView style={styles.btndiv}>
                <Button title="Editar"/>
            </SafeAreaView >
        </ScrollView>
        <View style={styles.bottomBar_container}>
            <BottomBar/>
        </View>
        <StatusBar style="light"/>
    </View>
  );
};

export default ViewGarden;
