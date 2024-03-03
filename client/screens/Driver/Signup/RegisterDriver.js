import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import axios from 'axios';

import BackButton from '../../../components/Global/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../features/context/AuthContext';
import { useSession } from '../../../features/context/SessionContext';

const RegisterDriver = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [aadharId, setAadharId] = useState('');
    const [panCard, setPanCard] = useState('');
    const [bankDetails, setBankDetails] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { phoneNumber, email, setType, setUserAdd, setAuth } = useAuth()
    const { login } = useSession()

    const handleNextStep = () => {
        if (step === 1) {
            // Validate inputs for step 1
            if (!name || !aadharId) {
                alert('Please fill out all fields.');
                return;
            }
        } else if (step === 2) {
            // Validate inputs for step 2
            if (!panCard || !bankDetails) {
                alert('Please fill out all fields.');
                return;
            }
        } else if (step === 3) {
            // Validate inputs for step 3
            if (!password || !confirmPassword || password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            // Handle submission of the form
            handleSubmit();
            return;
        }
        // Proceed to the next step
        setStep(step + 1);
    };

    const handleSubmit = async () => {
        // Submit the form data to the server
        // This is where you would handle registration logic

        try {
            const response = await axios.post(`${process.env.BASE_URL}/driver/registerDriver`, {
                "phoneNo": phoneNumber,
                "email": email,
                name,
                aadharId,
                panCard,
                bankDetails,
                password,
            });
            console.log(response.data);
            console.log(response.headers);

            if (response.status === 200) {
                setAuth(response.headers.auth)
                setType('driver')
                setUserAdd(true)
                await login(response.headers.auth, phoneNumber, "driver")
                console.log('Driver registered successfully:', response.data);
            } else {
                console.log('API request failed:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
        console.log('Form submitted:', {
            name,
            aadharId,
            panCard,
            bankDetails,
            password,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackButton />
            <View className="mt-8 p-2">
                <Text style={styles.title}>Driver Registration</Text>
                <Image
                    source={{
                        uri: 'https://lh3.googleusercontent.com/fife/AGXqzDmIZcFWX7rCXFCFRj_Iiuqse3MV1m-gNDa2XybZqGVoWqX3383X8oAkOA9BF1SUXjghzhBBZGHTgmBLQoGg_BRLXQnCtbEOylYMznG-Chx8hLEhaTp8b0wRJbYEJUBLGF7lMZI3MOAmxc5iSfp2kQIEy3Iw4AgQaXwnhmdvCpkYg2SD6CDvzP6IiVemO6P-aZ4eRcPl2fxdaKXOyFJShzmGgdfb0SkHAMHQ5XCOEtvciNHU2hrRML3HLAu-gNJTiLagnXciZsrDE3HAISkAyYCkO91ol0vBAplLw3iL87hjUxDc0YXDibIn_5CvsOjJYY9zTUcMEm9i-nJboua1b9wh-QRsFaqHwJuCs99PJgaT27khDNVt2YNI_rSIINKQsiQPJI9xKQP5vwqeH5NISa5MyYPmqA1prTuvdKgiLVTCOiU5AEN7bKnTXz0T13DMC1ys1_midvJ-b5Uulyi4Uwjfch2-ehA9q57rx60QYY3_d34Xeqs-RuNON-8AK8WFColfifIj39kZKGDBDzW1TeIWlkcTmTrCyfi_pK4EinaUTvx_X7IZLO8j6DT-MUL55U1o7FuCUql1wfDZ3-JgT881iTm1UPuXDUnHE3w039fnxI1PmmXXg_HZ-q0jNaNvrpB2CHME5Bh1Ev-ql7Y22rwR9t-ceD8TjX5SXv4J9FpilBN7kzP0nmxBtVQzS6iQ0o6u3ERAPUW5h0eC5k61lS9LwFkA7x2J_QBUu0pcG_HJxlIwftX7PAR3_74vnUzJfJRzmX8r9BU7NXx6BoEj4TOMT64PcD_AiPEUTJ0Hs85bB8JF_yfXaBvKiUXBoX8ngNL8ZZAbqmFaZLeo6bZ4eqz5WbBYPicrDITGgp9G7fXrCWHgmATGzZNBvsWrSFz0yE1L-FVh1EyHGtCdBrZoHZ5nWYtfqdL3PDic03I_Az0K-jA7jm7khjPMXdpe212RRGCIUq_ASV6VB5EgV6mg6eMzeNGDobbLNipZnMIwIVaqeIPFiS_jsdHrlCoNuoqY5D2xapKzkakqxDs7t9F1yJDlE81C7KUMwqn7oPfHyi_wpq9kNGl7TaQe1izFicalm83nDo1IIEwJX2lz7wlaTB92JZHu_bcldToq6US2h0WsBjqZPaFCXosG-BqRwbzFlFqKyQzxhBcpSxRxCc-DA5AovBl_9vyVRnyuHA6p8gZ-arb8hdM2gQ3i1EBp35vLq0eTlSU1WzNjWooq-bDrBolReJG9rCTTqvQueRIVwhkQxA78wUzoB3kflLnT8H5klAacCDVUvBgxL4wTlXVqfZXhL75pu6U_GaDbE4zLC0-3sivFz8Tm_s46CgeUkzlkqFRBTigU6tXKyqWkHdX51ysZac_wRKgE60_uTSCGwWjmkTbfj0xKmztIKU2PycBTQoxM5iTbBesdAn1Fh7uKGCobSZTE8uBtKxHPd_fnzNwyt3-jD2Eitc6wvbsk_MzHQa_bWqAH0XjM1zmp-F5mmYzhTakw8QDgcGDyLsPFF_34QbUqC4IrUc7Rh3bHzUO7p-2OHA0=s512?authuser=1'
                    }}
                    style={{ width: Dimensions.get('screen').width - 20, height: 200, resizeMode: 'cover' }}
                />
            </View>
            <View className="p-4">
                {step === 1 && (
                    <>
                        <TextInput
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Aadhar ID"
                            value={aadharId}
                            maxLength={12}
                            onChangeText={setAadharId}
                            style={styles.input}
                            keyboardType="numeric"
                        />
                    </>
                )}
                {step === 2 && (
                    <>
                        <TextInput
                            placeholder="PAN Card"
                            value={panCard}
                            maxLength={10}
                            onChangeText={setPanCard}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Bank Details"
                            value={bankDetails}
                            onChangeText={setBankDetails}
                            style={styles.input}
                        />
                    </>
                )}
                {step === 3 && (
                    <>
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            secureTextEntry
                        />
                        <TextInput
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={styles.input}
                            secureTextEntry
                        />
                    </>
                )}
                <TouchableOpacity
                    onPress={handleNextStep}
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
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
});

export default RegisterDriver;
