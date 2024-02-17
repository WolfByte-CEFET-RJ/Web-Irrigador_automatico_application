import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from './styles';
import Ionicons from '@expo/vector-icons/Ionicons';

const MeasureMessage = ({ message }) => {
    const isSucessMessage = message == "Tudo certo!";

    return message ? (
        <View style={styles.container}>
            <Ionicons 
            name={isSucessMessage ? 'checkmark-circle-outline' : 'alert-circle-outline'}
            size={27}
            color={isSucessMessage ? '#40513B' : '#D26E28'}
            style={{ marginRight: 10 }}
            />
            <Text style={[styles.errorText, { color: isSucessMessage ? '#40513B' : '#D26E28' }]}>{message}</Text>
        </View>
    ) : null
};

export default MeasureMessage;
