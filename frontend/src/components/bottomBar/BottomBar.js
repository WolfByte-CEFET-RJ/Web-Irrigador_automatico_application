import React from "react";
import { View, Text } from "react-native";
import { styles } from './styles'
import Ionicons from '@expo/vector-icons/Ionicons';


export default function BottomBar(){
  return(
    <View style={styles.bottomBar_container}>
      <Ionicons 
        style={styles.iconCadastro} 
        name={'leaf'} 
        size={24} 
        color={'#609966'}
      />
      <Ionicons 
        style={styles.iconCadastro} 
        name={'cog'} 
        size={24} 
        color={'#609966'}
      />
      <Ionicons 
        style={styles.iconCadastro} 
        name={'home'} 
        size={24} 
        color={'#609966'}
      />
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
      />
    </View>
  )
}