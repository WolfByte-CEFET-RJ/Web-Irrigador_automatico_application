import Navigation from './src/routes/routes';
import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Animated, Text} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Routes from './src/routes';
import AuthContext from './src/contexts/auth';
import { AuthProvider } from './src/contexts/auth';

const LoadingScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Image source={require('./assets/android-chrome-192x192.png')} style={styles.image} />
      </Animated.View>
    </View>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Aguarda 3 s
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (isLoading ? <LoadingScreen /> : <NavigationContainer><AuthProvider value={{signed: true}}><Routes /></AuthProvider></NavigationContainer>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
});