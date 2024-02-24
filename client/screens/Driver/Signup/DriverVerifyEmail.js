import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useLoader } from '../../../features/context/LoaderContext';
import { useAuth } from '../../../features/context/AuthContext';
import axios from 'axios';
import Loader from '../../../components/Global/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/Global/BackButton';

const EmailVerificationScreen = ({ navigation }) => {
    const [emailID, setEmailID] = useState('');
    const [otp, setOTP] = useState('');
    const [otpSent, setOTPSent] = useState(false);
    const { setLoader } = useLoader()
    const { setEmail } = useAuth()

    const handleSendOTP = async () => {
        setLoader(true)
        try {
            const response = await axios.post(`${process.env.BASE_URL}/driver/sendEmailOtp`, {
                email: emailID,
            });

            if (response.status === 200) {
                setOTPSent(true)
                console.log('OTP sent to:', emailID);
            } else {
                console.log('API request failed:', response.statusText);
            }
        }
        catch (err) {
            console.error('Network error:', err);
        } finally {
            setLoader(false)
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const response = await axios.post(`${process.env.BASE_URL}/driver/verifyEmailOtp`, {
                "email": emailID,
                "emailOtp": otp
            });

            if (response.status === 200) {
                setEmail(emailID)
                navigation.navigate('registerDriver')
            } else {
                console.log('API request failed:', response.statusText);
            }
        }
        catch (err) {
            console.error('Network error:', err);
        } finally {
            setLoader(false)
        }

        setOTP('');
    };

    const handleback = () => {
        setOTPSent(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Loader />
            <BackButton
                navigateBack={handleback}
            />
            <View className="mt-8">
                {!otpSent && <Image source={require('../../../assets/Gemini_Generated_Image.jpg')}
                    style={{ width: Dimensions.get('screen').width, height: 300, alignSelf: 'center' }} />}
                <View className="my-5">
                    <Text style={styles.title}>Email Verification</Text>
                    <View style={styles.Inputcontainer}>
                        <TextInput
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
                            keyboardType='email-address'
                            value={emailID}
                            disabled={otpSent}
                            onChangeText={(text) => setEmailID(text)}
                            label={"Email"}
                            placeholder='Enter Email Address'
                            underlineColor='white'
                            activeUnderlineColor='black'
                        />
                    </View>
                    {!otpSent ? (
                        <TouchableOpacity
                            onPress={handleSendOTP}
                            onFocus={() => setOTPSent(false)}
                            style={{
                                backgroundColor: '#e46c47',
                                height: 50,
                                padding: 10,
                                justifyContent: 'center',
                                marginVertical: 15,
                                borderRadius: 10
                            }} >
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: '600' }}>
                                Send OTP
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TextInput
                                value={otp}
                                onChangeText={(text) => setOTP(text)}
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
                                keyboardType="numeric"
                                maxLength={10}
                                label={"OTP"}
                                placeholder='Enter OTP Sent to your Email'
                                underlineColor='white'
                                activeUnderlineColor='black'
                            />
                            <TouchableOpacity
                                onPress={handleVerifyOTP}
                                style={{
                                    backgroundColor: '#e46c47',
                                    height: 50,
                                    padding: 10,
                                    justifyContent: 'center',
                                    marginVertical: 15,
                                    borderRadius: 10
                                }} >
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: '600' }}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>

            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
});

export default EmailVerificationScreen;
