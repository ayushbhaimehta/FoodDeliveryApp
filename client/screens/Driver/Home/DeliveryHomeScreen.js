import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import MenuContainer from '../../../components/Driver/MenuContainer';
import Orders from '../../../components/Driver/Orders';
import Earnings from '../../../components/Driver/Earnings';
import ProfileContainer from '../../../components/Driver/ProfileContainer';

const DeliveryHomeScreen = () => {
    const returnMenuComponent = (activeTab) => {
        if (activeTab === 'orders') {
            return <Orders />
        } else if (activeTab === 'earning') {
            return <Earnings />
        } else if (activeTab === 'setting') {
            return <View>
                <Text>Settings</Text>
            </View>
        }

    }

    const [activeTab, setActiveTab] = useState('orders') //earning // setting
    return (
        <SafeAreaView style={styles.container}>
            {/* Profile Section */}
            <ProfileContainer />

            {/* Navigation Menu */}
            <MenuContainer active={activeTab} setActive={setActiveTab} />


            <ScrollView className="p-4">
                {
                    returnMenuComponent(activeTab)
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});


export default DeliveryHomeScreen;
