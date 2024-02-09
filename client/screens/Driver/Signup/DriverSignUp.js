import { StyleSheet, Text, View, Animated, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loader from '../../../components/Global/Loader'
import BackButton from '../../../components/Global/BackButton'
import { useLoader } from '../../../features/context/LoaderContext'
import { useAuth } from '../../../features/context/AuthContext'
import { Divider } from 'react-native-elements'
import LoginPageOptions from '../../../components/Login/LoginPageOptions'
import Slider from '../../../components/Login/DriverLoginSlider'

const DriverSignUp = () => {
    const { setPhoneNumber } = useAuth();
    const { setLoader } = useLoader()
    const countrycode = '+91'
    const sliderImages = [
        'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-james-wheeler-414612.jpg&fm=jpg',
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfZIG7rVkxZNSk9ahTmjKCe1jfRPqRS0NyFtQy8BoLjw&s'
    ]

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
            <BackButton navigateBack={slideDown} />
            {!expanded &&
                <View className="h-[65%]">
                    <Slider />
                </View>
            }
            <Animated.View
                style={{
                    position: 'absolute',
                    left: 0,
                    top: expanded ? 75 : 560,
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
                        {expanded ? "LOGIN" : "PARTNER ACCOUNT"}
                    </Text>
                    <Text className="text-md text-gray-500">
                        {expanded ? "Enter your phone number to proceed" : "Login/Create Account to manage your deliever"}
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
                        {/* <LoginPageOptions
                            logoUrl={"https://img.icons8.com/external-line-adri-ansyah/64/external-restaurant-restaurant-line-adri-ansyah-18.png"}
                            text={"Partner Login"}
                            desc={"Sign in with your partner account."}
                            accType={"driver"}
                        />
                        <Divider style={{ backgroundColor: 'black', height: 0.1, marginVertical: 10 }} />

                        <LoginPageOptions
                            logoUrl={"https://img.icons8.com/ios-filled/100/tableware.png"}
                            text={"User Login"}
                            desc={"Order your favorite food"}
                            accType={"user"}
                        /> 
                        <Divider style={{ backgroundColor: 'black', height: 0.1, marginVertical: 10 }} /> */}
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

export default DriverSignUp

const styles = StyleSheet.create({})