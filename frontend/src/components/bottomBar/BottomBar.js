import React from "react";
import { View, Pressable} from "react-native";
import { styles } from './styles'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function BottomBar(){
  const navigation = useNavigation();

  return(
    <View style={styles.bottomBar_container}>
      <Pressable onPress={() => navigation.navigate('AddGarden')}> 
        <Ionicons 
          style={styles.iconCadastro} 
          name={'leaf'} 
          size={24} 
          color={'#609966'}
          // vai pra tela de adicionar horta
        />
      </Pressable>
      <Ionicons 
        style={styles.iconCadastro} 
        name={'cog'} 
        size={24} 
        color={'#609966'}
        // vai pra tela de configuração
      />
      <Pressable onPress={() => navigation.navigate('Home')}> 
        <Ionicons 
          style={styles.iconCadastro} 
          name={'home'} 
          size={24} 
          color={'#609966'}
          // vai pra home
        />
      </Pressable>
      <Ionicons 
        style={styles.iconCadastro} 
        name={'rainy'} 
        size={24} 
        color={'#609966'}
      />
      <Ionicons 
        style={styles.iconCadastro} 
        name={'person'} 
        size={24} 
        color={'#609966'}
        // vai pro perfil
      />
    </View>
  )
}