import React, { useState } from "react";
import { View, TextInput} from "react-native";
import { styles } from "./styles";


// const inputCode =()=>{
//     return(
//         <View>
//             <TextInput 
//              style={}
//              onChangeText={onChange}
//              keyboardType="number"
//              value={value}
//              type="text"
//              maxLength={1}
//              />
//         </View>
//     )
// }
const OtpInput = ({handleOtpChange, otp, inputs}) => {
    return (
      <View style={styles.buttonCodecontainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.boxInput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(value) => handleOtpChange(value, index)}
            value={digit}
            ref={(input) => {
              inputs[index] = input;
            }}
          />
        ))}
      </View>
    );
};
// const styles = StyleSheet.create({
//   container: {
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//   },
//   box: {
//       borderWidth: 1,
//       borderColor: 'black',
//       width: 40,
//       height: 40,
//       margin: 10,
//       textAlign: 'center',
//       fontSize: 20,
//   },
// });

export default OtpInput;