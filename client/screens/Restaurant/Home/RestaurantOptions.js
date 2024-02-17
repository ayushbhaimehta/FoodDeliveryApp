import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-elements';
import { useSession } from '../../../features/context/SessionContext';

const RestaurantOptions = ({ navigation }) => {
    const { logout, user } = useSession();
    const signOut = () => {
        logout();
        navigation.navigate('Home');
    }
    const [expanded, setExpanded] = useState(false);

    const toggleMenu = () => {
        setExpanded(!expanded);
    };
    return (
        <SafeAreaView className="bg-[#6f131b]">
            <View className="h-[17%]">
                <View className="w-full flex-row justify-between px-3 items-center">
                    <TouchableOpacity style={{
                        borderRadius: 100,
                    }}
                        onPress={() => navigation.pop()}
                    >
                        <Image source={{ uri: "https://img.icons8.com/windows/96/ffffff/long-arrow-left.png" }}
                            style={{
                                width: 32,
                                height: 32,
                                resizeMode: "cover"
                            }}
                        />
                    </TouchableOpacity>
                    <View className=' rounded-3xl h-15 w-16 p-4 bg-[#8b4249] text-2xl font-bold justify-center'>
                        <Text className="text-white text-center font-extrabold">
                            Help
                        </Text>
                    </View>
                </View>
                <View className="px-3">
                    <Text className="text-white font-bold text-xl">
                        {user?.restaurantName.toUpperCase()}
                    </Text>
                    <Text className="text-gray-200 mt-1 font-medium text-base">
                        {"+91 - " + user?.phoneNo + "   •   " + user?.email}
                    </Text>
                    <View className="flex-row items-center mb-2">
                        <Text className="text-white font-bold text-base">
                            Edit Profile {" "}
                        </Text>
                        <Image
                            source={{
                                uri: 'https://img.icons8.com/material-rounded/96/FFFFFF/forward.png'
                            }}
                            style={{
                                width: 30,
                                height: 30,
                                resizeMode: "contain",
                                marginTop: 5
                            }}
                        />
                    </View>
                </View>

            </View>
            <View className="px-3 bg-white h-[83%]">
                <View className="flex-row justify-between items-center my-2" onTouchEnd={toggleMenu}>
                    <View>
                        <Text className="text-lg text-black font-semibold">
                            My Account
                        </Text>
                        <Text className="text-gray-700 text-base flex-wrap">
                            Menu, Dashboard & Settings
                        </Text>
                    </View>
                    <Image
                        source={{
                            uri: 'https://img.icons8.com/material-rounded/96/808080/forward.png'
                        }}
                        style={{
                            width: 40,
                            height: 40,
                            resizeMode: "contain",
                            transform: [{ rotate: '90deg' }]
                        }}
                    />
                </View>
                {expanded && (
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity style={styles.option} onPress={() => navigation.push('MenuPage')}>
                            <Text style={styles.optionText}>Menu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.optionText}>Dashboard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option}>
                            <Text style={styles.optionText}>Settings</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <Divider style={{ backgroundColor: 'black', height: 1, marginVertical: 5 }} />
                <View className="flex-row justify-between items-center my-2" onTouchEnd={() => navigation.navigate('LiveOrders')}>
                    <View>
                        <Text className="text-lg text-black font-semibold">
                            Orders
                        </Text>
                        <Text className="text-gray-700 text-base flex-wrap">
                            Live and Completed Orders
                        </Text>
                    </View>
                    <Image
                        source={{
                            uri: 'https://img.icons8.com/material-rounded/96/808080/forward.png'
                        }}
                        style={{
                            width: 40,
                            height: 40,
                            resizeMode: "contain",
                            // transform: [{ rotate: '90deg' }]
                        }}
                    />
                </View>
                <Divider style={{ backgroundColor: 'black', height: 1, marginVertical: 5 }} />
                <View className="flex-row justify-between items-center my-2">
                    <View>
                        <Text className="text-lg text-black font-semibold">
                            Address
                        </Text>
                        <Text className="text-gray-700 text-base flex-wrap">
                            Share, Edit Address
                        </Text>
                    </View>
                    <Image
                        source={{
                            uri: 'https://img.icons8.com/material-rounded/96/808080/forward.png'
                        }}
                        style={{
                            width: 40,
                            height: 40,
                            resizeMode: "contain",
                            // transform: [{ rotate: '90deg' }]
                        }}
                    />
                </View>
                <Divider style={{ backgroundColor: 'black', height: 1, marginVertical: 5 }} />
                <View className="flex-row justify-between items-center my-2">
                    <View>
                        <Text className="text-lg text-black font-semibold">
                            Payments & Refunds
                        </Text>
                        <Text className="text-gray-700 text-base flex-wrap">
                            Refunds Status & Payment Methods
                        </Text>
                    </View>
                    <Image
                        source={{
                            uri: 'https://img.icons8.com/material-rounded/96/808080/forward.png'
                        }}
                        style={{
                            width: 40,
                            height: 40,
                            resizeMode: "contain",
                            transform: [{ rotate: '90deg' }]
                        }}
                    />
                </View>
                <View className="flex-row justify-between items-center my-2 h-14 bg-gray-100 bottom-0"
                    onTouchEnd={signOut}
                >
                    <Text className="text-lg text-black font-semibold">
                        LOGOUT
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    option: {
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    optionText: {
        fontSize: 16,
    },
});

export default RestaurantOptions;
