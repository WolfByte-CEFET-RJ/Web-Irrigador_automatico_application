import React, { useState, useRef } from "react";
import { View, TextInput} from "react-native";
import { styles } from "./styles";

const OtpInput = ({key,value,keyboardType,maxLength}) => {

  const inputRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    // [1 , 5, 2, 8]
    newOtp[index] = value;
    setOtp(newOtp);
    console.log(newOtp)
    // Move focus to the next box if the current one has a value
    if (value && index < newOtp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
    return (
          <TextInput
            key={key}
            style={styles.boxInput}
            maxLength={maxLength}
            keyboardType={keyboardType}
            onChangeText={(text) => handleOtpChange(text, key)}
            value={value}
            ref={(input) => (inputRefs.current[key] = input)}
          />
    );
};

export default OtpInput;