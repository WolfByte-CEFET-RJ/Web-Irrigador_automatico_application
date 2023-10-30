import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from "./src/pages/signUp/SignUp";
import {NavigationContainer} from '@react-navigation/native'
import Navigation from './src/routes/routes';
import globalStyles from './src/style/globalStyles';

export default function App() {
  return (
    // <View style={globalStyles.container}>
      <Navigation/>
    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '9DC08B',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
