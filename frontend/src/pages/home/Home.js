import React from "react";
import { View, Text, Image, Alert, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Button from "../../components/button/Button";
import { styles } from './styles'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import BottomBar from '../../components/bottomBar/BottomBar'

export default function Home(){

  return(
    <View style={styles.home_container}>
      <View style={styles.home_title_container}>
        <Text style={styles.home_title}>Bem-vindo, username</Text>
        <Image style={styles.logo} source={require('../../../assets/android-chrome-192x192.png')}/>
      </View>
      <View style={styles.search_container}>
        <TextInput
          style={styles.searcher}
          placeholder={"hello"}
        />
      </View>
      <Text>Minhas hortas</Text>
      <View style={styles.hortas_container}>
        <TouchableOpacity style={styles.horta}></TouchableOpacity>
      </View>
      <View style={styles.bottomBar_container}>
        <BottomBar/>
      </View>
    </View>
  )
}
