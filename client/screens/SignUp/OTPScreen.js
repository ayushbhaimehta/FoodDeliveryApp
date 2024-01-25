import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState, useRef, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../AuthContext'

const OTPScreen = ({ navigation }) => {
    const { phoneNumber } = useAuth()
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([...Array(6)].map(() => useRef(null)));
    const [focused, setFocused] = useState(0);
    const handleOTPChange = useCallback((index, value) => {

        const newOtp = [...otp];
        newOtp[index] = value;
        // Move focus to the previous input when editing and the current digit is empty
        if (index > 0 && value === '' && newOtp[index - 1] !== '') {
            inputRefs.current[index - 1].current.focus();
        }

        // Move focus to the next input when entering a digit
        if (index < otp.length - 1 && value !== '') {
            inputRefs.current[index + 1].current.focus();
        }
        setOtp(newOtp);
    }, [otp]);

    const handleInputPress = (index) => {
        inputRefs.current[index].current.focus();
    };

    const navigateToHome = () => {
        console.log("back presses");
        navigation.navigate('Login')
    }
    return (
        <SafeAreaView>
            <View className="mx-2 ">
                <View className="bg-[#f3f4fc] flex-row h-[150]">
                    <View>
                        <TouchableOpacity >
                            <Image source={{ uri: "https://img.icons8.com/windows/96/long-arrow-left.png" }}
                                style={{
                                    width: 32,
                                    height: 32,
                                    marginTop: 10,
                                    marginLeft: 1
                                }}
                                onTouchEnd={navigateToHome}
                            />
                        </TouchableOpacity>
                        <View className="mx-2">
                            <Text className="text-xl font-black mt-4">VERIFY DETAILS</Text>
                            <Text className="text-gray-500 mt-1">OTP sent to {phoneNumber}</Text>
                        </View>
                    </View>

                    <View
                        className="justify-end absolute right-1 bottom-0 overflow-hidden"
                    >
                        <Image

                            source={require('../../assets/otpscreen.png')}
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                </View>
                <View>
                    <Text className="text-gray-500 mt-4">Enter the 4-digit code sent to you at {phoneNumber}</Text>
                    <View className="flex-row justify-between mt-4">
                        {otp.map((digit, index) => (
                            <TextInput
                                className=" border-b-2 w-12 h-12 mx-1 text-center"
                                key={index}
                                ref={inputRefs.current[index]}
                                value={digit}
                                maxLength={1}
                                keyboardType="numeric"
                                cursorColor={"transparent"}
                                onFocus={() => setFocused(index)}
                                style={
                                    {
                                        borderColor: focused === index ? '#e46c47' : 'black',
                                        fontSize: 30,
                                        fontWeight: "bold",
                                    }
                                }
                                onPress={() => handleInputPress(index)}
                                onChangeText={(text) => handleOTPChange(index, text)}
                            />
                        ))}
                    </View>
                    <View className="flex-row justify-center mt-4">
                        <Text className="text-gray-500 text-center">Didn't receive the OTP?</Text>
                        <Text className="text-gray-500 text-center "> Resend</Text>
                    </View>
                    <View className="flex-row justify-center mt-4">
                        <TouchableOpacity className="bg-[#e46c47] w-[350] h-12 rounded-md justify-center">
                            <Text className="text-white text-center">VERIFY</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default OTPScreen

const styles = StyleSheet.create({})