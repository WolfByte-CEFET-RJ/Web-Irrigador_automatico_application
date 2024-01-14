import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from './styles';

const ErrorComponent = ({ message }) => {

  return message ? (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  ) : null;
};

export default ErrorComponent;
