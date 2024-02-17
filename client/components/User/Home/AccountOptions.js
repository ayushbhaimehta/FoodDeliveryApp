import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSession } from '../../../features/context/SessionContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-elements';

const AccountOptions = ({ navigation }) => {
    const { logout, user } = useSession();
    const signOut = () => {
        logout();
        navigation.navigate('Home');
    }
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
                        {user?.name.toUpperCase()}
                    </Text>
                    <Text className="text-gray-200 mt-1 font-medium text-base">
                        {"+91 - " + user?.phoneNo + "   •   " + user?.email[0].toUpperCase() + user?.email.slice(1)}
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
                <View className="flex-row justify-between items-center my-2">
                    <View>
                        <View className="flex-row mt-2">
                            <Text className=" text-3xl text-[#f35c56] font-extrabold mt-2">
                                one{" "}
                                <Text className="text-lg text-black font-semibold">
                                    membership{" "}
                                </Text>
                            </Text>
                            <View className="bg-[#19a672] rounded-2xl w-16 h-6 justify-center items-center mt-2">
                                <Text className="text-white text-sm items-center justify-center font-bold">
                                    ACTIVE
                                </Text>
                            </View>
                        </View>
                        <Text className="text-gray-700 text-base flex-wrap">
                            You've saved ₹1,807 in 17 days. Explore{"\n"}more benefits to keep saving
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
                <Divider style={{ backgroundColor: 'black', height: 1, marginVertical: 5 }} />
                <View className="flex-row justify-between items-center my-2">
                    <View>
                        <Text className="text-lg text-black font-semibold">
                            Swiggy HDFC Bank Credit Card
                        </Text>
                        <Text className="text-gray-700 text-base flex-wrap">
                            Apply for the card and start earning cashbacks!
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
                        }}
                    />
                </View>
                <Divider style={{ backgroundColor: 'black', height: 1, marginVertical: 5 }} />
                <View className="flex-row justify-between items-center my-2">
                    <View>
                        <Text className="text-lg text-black font-semibold">
                            My Account
                        </Text>
                        <Text className="text-gray-700 text-base flex-wrap">
                            Favourites, Hidden restaurants & Settings
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
                <Divider style={{ backgroundColor: 'black', height: 1, marginVertical: 5 }} />
                <View className="flex-row justify-between items-center my-2">
                    <View>
                        <Text className="text-lg text-black font-semibold">
                            Addresses
                        </Text>
                        <Text className="text-gray-700 text-base flex-wrap">
                            Share, Edit & Add New Addresses
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

const styles = StyleSheet.create({});

export default AccountOptions;
