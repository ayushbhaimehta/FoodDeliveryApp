import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState, useRef, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../../features/context/AuthContext'
import { useLoader } from '../../../features/context/LoaderContext'
import axios from 'axios'
import BackButton from '../../../components/Global/BackButton'
import { useSession } from '../../../features/context/SessionContext'

const OTPScreen = ({ navigation }) => {
    const { login } = useSession()
    const { phoneNumber, setAuth, setUserAdd, type } = useAuth()
    const { setLoader } = useLoader();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([...Array(6)].map(() => useRef(null)));
    const [focused, setFocused] = useState(0);
    const handleSubmit = async () => {
        setLoader(true)
        try {
            const response = await axios.post(`${process.env.BASE_URL}/user/verifyotp`, {
                phoneNo: phoneNumber,
                countryCode: "+91",
                otp: otp.join('')
            });


            if (response.status === 200) {
                await setAuth(response.headers['auth'])
                if (response.data["exist"]) {
                    await login(response.headers['auth'], phoneNumber, type)
                    setUserAdd(true)
                } else {
                    navigation.navigate('Input');
                }
            } else {
                console.log('API request failed:', response.statusText);
            }
        } catch (err) {
            console.error('Network error:', err);
        }
        setLoader(false)
    }
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

    const navigateBack = () => {
        console.log("back presses");
        navigation.navigate('Login')
    }
    return (
        <SafeAreaView>
            <View className="mx-2 ">
                <View className="bg-[#f3f4fc] flex-row h-[150]">
                    <View>
                        <TouchableOpacity style={{
                            backgroundColor: 'white',
                            borderRadius: 100,
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }} >
                            <Image source={{ uri: "https://img.icons8.com/windows/96/long-arrow-left.png" }}
                                style={{
                                    width: 32,
                                    height: 32,
                                }}
                                onTouchEnd={navigateBack}
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

                            source={require('../../../assets/otpscreen.png')}
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                </View>
                <View>
                    <Text className="text-gray-500 mt-4">Enter the 6-digit code sent to you at {phoneNumber}</Text>
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
                                autoFocus={index === 0}
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
                        <TouchableOpacity className="bg-[#e46c47] w-[350] h-12 rounded-md justify-center" onPress={handleSubmit}>
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