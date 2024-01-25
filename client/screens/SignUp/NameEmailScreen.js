import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState, useRef, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../AuthContext'

const OTPScreen = ({ navigation }) => {
    const { phoneNumber } = useAuth()
    const [focused, setFocused] = useState("name")

    const navigateToHome = () => {
        console.log("back presses");
        navigation.navigate('OTP')
    }

    const handleFormSubmit = () => {
        // Handle form submission logic here
    }

    return (
        <SafeAreaView className="mx-2 ">
            <View className="bg-[#f7f8fc] flex-row h-[250]">
                <TouchableOpacity >
                    <Image source={{ uri: "https://img.icons8.com/windows/96/long-arrow-left.png" }}
                        style={{
                            width: 32,
                            height: 32,
                            marginTop: 10,
                            marginLeft: 1
                        }}
                    // onTouchEnd={navigateToHome}
                    />
                </TouchableOpacity>
                <View className="mx-2 flex-1 justify-center items-center">
                    <Text className="text-2xl font-black mt-4">ENTER USER DETAILS</Text>
                    <Text className="text-gray-500 mt-1">Fill your name and email</Text>
                </View>
            </View>
            <View>
                <View className="mx-2 mt-10">
                    <Text style={{ color: focused === "name" ? "#e46c47" : "#6B7280" }}>Name</Text>
                    <TextInput
                        keyboardType="default"
                        className="border-b-2"
                        style={{
                            borderColor: focused === "name" ? "#e46c47" : "#D1D5DB"
                        }}
                        cursorColor={"#e46c47"}
                        onFocus={() => setFocused("name")}
                    />
                </View>
                <View className="mx-2 mt-10">
                    <Text style={{ color: focused === "email" ? "#e46c47" : "#6B7280" }}>Email</Text>
                    <TextInput
                        keyboardType="email-address"
                        autoCapitalize="none"
                        textContentType="emailAddress"
                        className="border-b-2"
                        style={{
                            borderColor: focused === "email" ? "#e46c47" : "#D1D5DB"
                        }}
                        cursorColor={"#e46c47"}
                        onFocus={() => setFocused("email")}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#e46c47',
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 20,
                        alignItems: 'center'
                    }}
                    onPress={handleFormSubmit}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}
export default OTPScreen

