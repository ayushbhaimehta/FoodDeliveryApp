import { Image, StyleSheet, Text, View, Animated, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements'
import axios from 'axios'


import { useAuth } from '../../../features/context/AuthContext'
import Loader from '../../../components/Global/Loader'
import { useLoader } from '../../../features/context/LoaderContext'
import BackButton from '../../../components/Global/BackButton'
import LoginPageOptions from '../../../components/Login/LoginPageOptions'

const SignUpScreen = ({ navigation }) => {
    const { setPhoneNumber, setType } = useAuth();
    const { setLoader } = useLoader()
    const countrycode = '+91'

    const handleSubmit = async () => {
        setLoader(true)
        try {
            const response = await axios.post(`${process.env.BASE_URL}/user/sendotp`, {
                phoneNo: phone,
                countryCode: countrycode,
            });

            if (response.status === 200) {
                setPhoneNumber(phone)
                navigation.navigate('OTP');
            } else {
                console.log('API request failed:', response.statusText);
            }

        } catch (err) {
            console.error('Network error:', err);
        }
        setLoader(false)
    }



    const [slideAnim] = useState(new Animated.Value(0)); // Initial value for translateY
    const [expanded, setExpanded] = useState(false)
    const [phone, setPhone] = useState('');
    const [submitEnable, setSubmitEnable] = useState(false)

    const handleInputChange = (text) => {
        setPhone(text);
        if (text.length == 10) {
            setSubmitEnable(true)
        } else {
            setSubmitEnable(false)
        }
    };
    function xor(a, b) {
        return (a || b) && !(a && b);
    }


    const slideUp = () => {
        Animated.timing(slideAnim, {
            toValue: 0, // Adjust this value to determine how much the component should move up
            duration: 500,
            useNativeDriver: true,
        }).start();
        setExpanded(true)
    }

    const slideDown = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setExpanded(false)
    };
    return (
        <SafeAreaView className="bg-[#f3f4fc] flex-1">
            <Loader />
            <View className="h-[50%] mx-2">
                <BackButton navigateBack={slideDown} />
                <View onTouchEnd={slideDown} className="flex-1 justify-end align-bottom">
                    <View className="h-[35%] absolute top-[260]">
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
                        top: 240,
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
            <Animated.View
                style={{
                    position: 'absolute',
                    left: 0,
                    bottom: expanded ? 0 : 30,
                    right: 0,
                    backgroundColor: 'white',
                    padding: 16,
                    borderTopWidth: 0.2,
                    borderTopColor: 'black',
                    transform: [{ translateY: slideAnim }],
                    flex: 1
                }}
                className="bg-white h-auto my-3 py-5 px-4 flex-1">
                <View>
                    <Text className="font-bold text-lg">
                        {expanded ? "LOGIN" : "ACCOUNT"}
                    </Text>
                    <Text className="text-md text-gray-500">
                        {expanded ? "Enter your phone number to proceed" : "Login/Create Account to manage orders"}
                    </Text>
                </View>
                <View>

                    {expanded && <>
                        <Text
                            className="text-gray-400 text-xs mt-5"
                        >
                            10 digit mobile number
                        </Text>
                        <View style={styles.container}>
                            <Text style={styles.countryCode}>{countrycode}</Text>
                            <TextInput
                                style={styles.phoneNumberInput}
                                keyboardType="phone-pad"
                                autoFocus={true}
                                value={phone}
                                onChangeText={handleInputChange}
                                maxLength={10}
                            />
                        </View>
                    </>
                    }
                    <TouchableOpacity
                        onPress={submitEnable ? handleSubmit : slideUp}
                        disabled={xor(expanded, submitEnable)}
                        style={{
                            backgroundColor: !xor(expanded, submitEnable) ? '#e46c47' : '#b55738',
                            height: 45,
                            padding: 10,
                            justifyContent: 'center',
                            marginVertical: 15
                        }} >
                        <Text style={{ color: !xor(expanded, submitEnable) ? 'white' : "#ccc", textAlign: 'center', fontSize: 14, fontWeight: '600' }}>
                            {expanded ? "CONTINUE" : "LOGIN"}
                        </Text>
                    </TouchableOpacity>
                    <Text className="text-xs text-center">
                        By clicking, I accept the <Text className="font-bold">Terms & Condions</Text> and <Text className="font-bold">Privacy Policy</Text>
                    </Text>
                </View>
                {expanded &&
                    <View style={{
                        height: 80
                    }}>

                    </View>
                }

                {!expanded && <>
                    <Divider style={{ backgroundColor: 'black', height: 1, marginVertical: 15 }} />
                    <View>
                        <LoginPageOptions
                            logoUrl={"https://img.icons8.com/external-line-adri-ansyah/64/external-restaurant-restaurant-line-adri-ansyah-18.png"}
                            text={"Partner Login"}
                            desc={"Sign in with your partner account."}
                            accType={"driver"}
                        />
                        <Divider style={{ backgroundColor: 'black', height: 0.1, marginVertical: 10 }} />

                        <LoginPageOptions
                            logoUrl={"https://img.icons8.com/ios-filled/100/tableware.png"}
                            text={"Restaurant Login"}
                            desc={"Manage your restaurant account"}
                            accType={"restaurant"}
                        />
                        <Divider style={{ backgroundColor: 'black', height: 0.1, marginVertical: 10 }} />
                        <LoginPageOptions
                            logoUrl="https://img.icons8.com/ios/100/new-post--v1.png"
                            text="Send me feedback"
                            desc="App version 1.0.0"
                        />
                    </View>
                </>}
            </Animated.View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#e46c47',
        padding: 10,
    },
    countryCode: {
        marginRight: 10,
        fontSize: 16,
        color: '#555',
    },
    phoneNumberInput: {
        flex: 1,
        fontSize: 16,
    },
});


export default SignUpScreen
