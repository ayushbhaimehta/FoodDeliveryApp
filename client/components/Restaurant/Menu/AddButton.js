import React from 'react';
import { View, TouchableOpacity, Text, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // You need to install @expo/vector-icons if not already installed

const FloatingAddButton = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.button}>
                <Ionicons name="add" size={32} color="white" />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 50, // to make it a circle
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        // elevation: 3, // for shadow on Android
    },
    label: {
        color: 'black',
        marginTop: 5,
    },
});

export default FloatingAddButton;
