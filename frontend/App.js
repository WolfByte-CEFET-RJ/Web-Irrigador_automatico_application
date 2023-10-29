import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from "./pages/signUp/SignUp"
import {NavigationContainer} from '@react-navigation/native'

export default function App() {
  return (
    <NavigationContainer>
      <SignUp></SignUp>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
