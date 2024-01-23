import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements'

const SignUpScreen = () => {
    const handleBackPress = () => {
        // Handle back button press here
    }

    return (
        <SafeAreaView className="bg-[#f8f4fc] flex-1">
            <View className="justify-between h-[54%] mx-2">
                <View>
                    <TouchableOpacity onPress={handleBackPress}>
                        <Image source={{ uri: "https://img.icons8.com/windows/96/long-arrow-left.png" }}
                            style={{
                                width: 32,
                                height: 32,
                                marginTop: 10
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <View className="h-[35%] ">
                        <Text className=" font-black text-6xl opacity-10 absolute">
                            LIVE
                        </Text>
                        <Text className=" font-black text-6xl opacity-10 absolute top-[45]">
                            FOR
                        </Text>
                        <Text className=" font-black text-6xl opacity-10 absolute top-[90]">
                            FOOD
                        </Text>
                    </View>
                    <View style={{
                        width: 140,
                        height: 140,
                        marginTop: 10,
                        borderRadius: 100,
                        position: 'absolute',
                        left: 110,
                        bottom: 30,
                        borderWidth: 10,
                        borderColor: '#F9F6EE',
                        overflow: 'hidden'
                    }}>
                        <Image
                            source={{
                                uri: 'https://cdn1.vectorstock.com/i/1000x1000/14/35/chicken-roll-icon-traditional-tasty-stuffed-wrap-vector-31871435.jpg'
                            }}
                            style={{
                                width: 130,
                                height: 130,
                                borderRadius: 100,
                                resizeMode: "center"
                            }}
                        />
                    </View>
                </View>
            </View>
            <View className="bg-white h-auto my-3 py-5 px-4 flex-1">
                <View>
                    <Text className="font-bold text-lg">
                        ACCOUNT
                    </Text>
                    <Text className="text-xs text-gray-500">
                        Login/Create Account to manage orders
                    </Text>
                </View>
                <View>
                    <TouchableOpacity style={{ backgroundColor: '#e46c47', height: 45, padding: 10, justifyContent: 'center', marginVertical: 15 }} >
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: '600' }}>LOGIN</Text>
                    </TouchableOpacity>
                    <Text className="text-xs text-center">
                        By clicking, I accept the <Text className="font-bold">Terms & Condions</Text> and <Text className="font-bold">Privacy Policy</Text>
                    </Text>
                </View>
                <View className="h-[1] bg-black w-[100%] my-5">
                </View>
                <View>
                    <View className="flex-row items-center w-[100%] h-10">
                        <Image
                            source={{
                                uri: "https://img.icons8.com/ios/100/discount--v1.png"
                            }}
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />
                        <Text className="text-md font-bold mx-3">
                            Offers
                        </Text>
                        <Image
                            source={{
                                uri: "https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png"
                            }}
                            style={{
                                width: 20,
                                height: 20,
                                position: "absolute",
                                right: 10
                            }}
                        />
                    </View>
                    <Divider style={{ backgroundColor: 'black', height: 0.1, marginVertical: 10 }} />
                    <View className="flex-row items-center w-[100%] h-10">
                        <Image
                            source={{
                                uri: "https://img.icons8.com/ios/100/new-post--v1.png"
                            }}
                            style={{
                                width: 25,
                                height: 25
                            }}
                        />
                        <Text className="text-md font-bold mx-3">
                            {"Send me feedback\n"}
                            <Text className="text-xs font-light">
                                App version 1.0.0
                            </Text>
                        </Text>
                        <Image
                            source={{
                                uri: "https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png"
                            }}
                            style={{
                                width: 20,
                                height: 20,
                                position: "absolute",
                                right: 10
                            }}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})


export default SignUpScreen
