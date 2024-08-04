import React, { useState } from "react";
import { styles } from "./styles";
import { Modal, View, Text } from "react-native";
import ButtonOrange from "../buttonOrange/ButtonOrange";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createAxiosInstance } from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import OtpInput from "../inputCode/OtpInput";

const ForgotPasswordModal = ({ visible, onClose, texto, email }) => {

  const [otp, setOtp] = useState(['', '', '', '']);
  const navigation = useNavigation();

  const inputs = [];

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    // [1 , 5, 2, 8]

    newOtp[index] = value;
    setOtp(newOtp);
    // Move focus to the next box if the current one has a value
    if (value && index < newOtp.length - 1) {
      this.inputs[index + 1].focus();
    }
  };

  const api = createAxiosInstance();

  const handleConfirmClick = async () => {
    onClose();
    navigation.navigate("ConfirmPassword");
    const otpJoined = otp.join();
    console.log(otpJoined);
    const verifyCode = await api.post(`/verify_code/${email}`);
    console.log(verifyCode);
    if(verifyCode){
      navigation.navigate("ConfirmPassword");
    }else{
      console.log("Codigo invalido");
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
   
       <View style={styles.modalPassContainer}>
        <View style={styles.modalPassContent}>
          <Ionicons
            style={styles.iconHorta}
            name={"close-circle-outline"}
            size={30}
            color={"#40513B"}
            onPress={onClose}
          />
          <Text style={styles.Modalmessage}>{texto}</Text>
          <OtpInput
            handleOtpChange={handleOtpChange}
            otp={otp}
            inputs={inputs}
          />
          <View style={styles.buttonConfirmPasswordContainer}>
            <ButtonOrange
              title="Confirmar"
              buttonHeight={35}
              fontSize={15}
              onPress={() => handleConfirmClick()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ForgotPasswordModal;
