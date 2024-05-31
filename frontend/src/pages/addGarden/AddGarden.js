import React from "react";
import {
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  View,
} from "react-native";
import { useState } from "react";
import { styles } from "./styles";
import BottomBar from "../../components/bottomBar/BottomBar";
import Button from "../../components/button/Button";
import InputDark from "../../components/inputDark/InputDark";
import { Platform } from "react-native";
import ErrorComponent from "../../components/Error/ErrorComponent";
import { createAxiosInstance } from "../../services/api";
import SucessComponent from "../../components/success/SuccessComponent";
import { useGarden } from "../../contexts/GardenContext";

const AddGarden = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const api = createAxiosInstance();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [irrigationId, setIrrigationId] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");

  const { setGarden, gardenData, setSelectedGarden } = useGarden();
  
  const handleSubmit = async () => {
    const data = {
      name,
      description,
      identifier,
      irrigationId: 1,
      // userId: 3,
    };

    if (name === "" || description === "" || identifier === "") {
      setError("Preencha todos os campos");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (isNaN(identifier)) {
      setError("O ID deve ser um número inteiro");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      try {
        const response = await api.post("/garden", data);
        const attGarden = await api.get(`/myGardens`);
        setGarden(attGarden.data);
        
        console.log(response.data);
        setSucess("Horta cadastrada com sucesso!");
        setTimeout(() => {
          setSucess("");
        }, 3000);
      } catch (error) {
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 3000);
        console.log(error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onClick={dismissKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -50}
        style={styles.home_container}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <SafeAreaView style={styles.home_title_container}>
            <Text style={styles.home_title}>Adicionar nova horta</Text>
          </SafeAreaView>
          <SafeAreaView style={styles.input_container}>
            <InputDark
              label="Nome"
              placeHolder="horta de cenouras"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <InputDark
              label="Descrição"
              placeHolder="solo fértil, fileiras organizadas, irrigação suave, luz solar adequada..."
              onChangeText={(text) => setDescription(text)}
            />
            <InputDark
              label="Identificador"
              placeHolder="001"
              onChangeText={(text) => setIdentifier(text)}
            />
          </SafeAreaView>
          <SafeAreaView style={styles.subtitle_container}>
            <Text style={styles.subtitle}>Configuração de irrigação</Text>
          </SafeAreaView>
          <InputDark placeHolder="default" editable={false} />
          <SafeAreaView style={styles.btndiv}>
            <Button title="Adicionar horta" onPress={() => handleSubmit()} />
          </SafeAreaView>
        </ScrollView>
        <View style={styles.bottomBar_container}>
          <BottomBar />
        </View>
        <ErrorComponent message={error} />
        <SucessComponent message={sucess} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default AddGarden;
