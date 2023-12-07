import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from './styles';

const ErrorComponent = ({ message, duration = 3000, onTimeout }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisible(false);
      if (onTimeout) {
        onTimeout();
      }
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [duration, onTimeout]);

  return visible ? (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  ) : null;
};

export default ErrorComponent;
