import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useLoader } from '../../features/context/LoaderContext';

const Loader = () => {
    const { loader } = useLoader()
    return (
        <View style={[styles.container, {
            display: loader ? 'flex' : 'none'
        }]}>
            <ActivityIndicator size="large" color="#e46c47" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        right: '50%',
        top: '50%',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 999,
        alignItems: 'center',
    },
});

export default Loader;
