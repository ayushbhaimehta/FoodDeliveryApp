import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import MenuContainer from '../../../components/Driver/MenuContainer';
import Orders from '../../../components/Driver/Orders';
import Earnings from '../../../components/Driver/Earnings';
import ProfileContainer from '../../../components/Driver/ProfileContainer';
import Settings from '../../../components/Driver/Settings';
import { useAuth } from '../../../features/context/AuthContext';

const DeliveryHomeScreen = ({ navigation }) => {
    const [driverActive, setDriverActive] = useState(false)
    const returnMenuComponent = (activeTab) => {
        if (activeTab === 'orders') {
            return <Orders />
        } else if (activeTab === 'earning') {
            return <Earnings />
        } else if (activeTab === 'setting') {
            return <Settings />
        }

    }

    const [activeTab, setActiveTab] = useState('orders') //earning // setting
    return (
        <SafeAreaView style={styles.container}>
            {/* Profile Section */}
            <ProfileContainer
                active={driverActive}
            />
            {/* Navigation Menu */}
            <MenuContainer active={activeTab} setActive={setActiveTab} />
            <ScrollView className="p-4">
                {
                    returnMenuComponent(activeTab)
                }
            </ScrollView>
            <TouchableOpacity style={styles.onlineButton(driverActive)} onPress={() => { setDriverActive(!driverActive); navigation.push('Deliver') }}>
                <Text style={styles.onlineText}>
                    Go {driverActive ? "Offline" : "Online"}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    onlineButton: (active) => ({
        backgroundColor: active ? 'gray' : 'green',
        padding: 10,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }),
    onlineText: {
        color: 'white',
        fontSize: 18,
    }
});


export default DeliveryHomeScreen;
