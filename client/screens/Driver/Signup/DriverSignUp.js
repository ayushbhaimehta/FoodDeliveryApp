import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loader from '../../../components/Global/Loader'
import BackButton from '../../../components/Global/BackButton'
import { useLoader } from '../../../features/context/LoaderContext'
import { useAuth } from '../../../features/context/AuthContext'
import { Divider } from 'react-native-elements'
import LoginPageOptions from '../../../components/Login/LoginPageOptions'
import Slider from '../../../components/Login/DriverLoginSlider'
import axios from 'axios'


const DriverSignUp = ({ navigation }) => {
    const { setPhoneNumber } = useAuth();
    const { setLoader } = useLoader()
    const countrycode = '+91'
    const inputRef = useRef(null);

    const handleSubmit = async () => {
        setLoader(true)
        try {
            const response = await axios.post(`${process.env.BASE_URL}/driver/sendPhoneOtp`, {
                phoneNo: phone,
                countryCode: "+91",
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
        if (inputRef.current) {
            inputRef.current.blur(); // Blur the input if it is in focus
        }
        setExpanded(false)
    };
    const navigateToLogin = () => {
        navigation.navigate('DriverLogin')
    }

    return (
        <SafeAreaView className="bg-[#f3f4fc] flex-1">
            <Loader />
            {expanded && <BackButton navigateBack={slideDown} />}
            {!expanded &&
                <View className="h-[600]">
                    <Slider />
                </View>
            }
            <Animated.View
                style={{
                    position: 'absolute',
                    left: 0,
                    top: expanded ? 100 : 650,
                    right: 0,
                    backgroundColor: 'white',
                    padding: 16,
                    borderTopWidth: !expanded ? 0.2 : 0,
                    borderTopColor: 'black',
                    transform: [{ translateY: slideAnim }],
                    flex: 1
                }}
                className="bg-white h-auto my-3 py-5 px-4 flex-1">
                <View>
                    {
                        expanded &&
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '600' }} className="text-gray-600">Enter your phone number to get started</Text>
                            <Divider style={{ marginVertical: 10 }} />
                        </View>
                    }

                    <View style={styles.Inputcontainer}>
                        <TextInput
                            ref={inputRef}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 10,
                                borderColor: 'black',
                                borderWidth: 1,
                                justifyContent: 'center',
                                marginVertical: 10,
                                elevation: 5,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },

                            }}
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={handleInputChange}
                            maxLength={10}
                            onFocus={slideUp}
                            label={"Phone Number"}
                            placeholder='Enter your 10 digit phone number'
                            underlineColor='white'
                            activeUnderlineColor='black'
                            left={<TextInput.Affix text={`${countrycode} | `} />}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={submitEnable ? handleSubmit : slideUp}
                        disabled={xor(expanded, submitEnable)}
                        style={{
                            backgroundColor: !xor(expanded, submitEnable) ? '#e46c47' : '#b55738',
                            height: 50,
                            padding: 10,
                            justifyContent: 'center',
                            marginVertical: 15,
                            borderRadius: 10
                        }} >
                        <Text style={{ color: !xor(expanded, submitEnable) ? 'white' : "#ccc", textAlign: 'center', fontSize: 14, fontWeight: '600' }}>
                            {expanded ? "CONTINUE" : "Get Started"}
                        </Text>
                    </TouchableOpacity>
                    {
                        expanded &&
                        <TouchableOpacity onPress={navigateToLogin}>
                            <Divider style={{ marginVertical: 10 }} width={1} />
                            <LoginPageOptions
                                text={"Already have an account?"}
                                desc={"Login to your account"}
                                logoUrl={"https://img.icons8.com/ios-filled/100/000000/login-rounded-right.png"}
                                accType={"driver"}
                            />
                        </TouchableOpacity>
                    }
                </View>

            </Animated.View>
        </SafeAreaView >
    )
}

export default DriverSignUp

const styles = StyleSheet.create({
    Inputcontainer: {
        borderRadius: 10,
        padding: 10,

    },

})