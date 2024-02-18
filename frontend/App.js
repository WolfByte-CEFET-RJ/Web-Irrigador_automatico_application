import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Text} from 'react-native';
import Routes from './src/routes/routes';
import { AuthProvider } from './src/contexts/AuthContext';
import { GardenProvider } from './src/contexts/GardenContext';
import { useFonts } from 'expo-font';
import globalStyles from './src/style/globalStyles';

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
  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

    console.log(fontsLoaded);
  useEffect(() => {
    const fetchData = async () => {

      // Aguarda 3 s
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (isLoading && fontsLoaded ? <LoadingScreen /> : <AuthProvider><GardenProvider><Routes /></GardenProvider></AuthProvider>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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