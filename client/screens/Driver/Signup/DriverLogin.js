import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { TextInput } from 'react-native-paper'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'

import BackButton from '../../../components/Global/BackButton'
import { useAuth } from '../../../features/context/AuthContext'
import { useSession } from '../../../features/context/SessionContext'
import Loader from '../../../components/Global/Loader'
import { useLoader } from '../../../features/context/LoaderContext'

const DriverLogin = ({ navigation }) => {
    const { setAuth, setPhoneNumber, setUserAdd, setType } = useAuth();
    const { login } = useSession()
    const { setLoader } = useLoader()
    const [phoneNo, setPhoneNo] = useState('')
    const [password, setPassword] = useState('')
    const navigateBack = () => {
        navigation.goBack()
    }
    const driverLogin = async () => {
        setLoader(true)
        try {
            const response = await axios.post(`${process.env.BASE_URL}/driver/loginDriver`, {
                phoneNo,
                password
            });
            if (response.status === 200) {
                setAuth(response.headers.auth)
                setPhoneNumber(phoneNo)
                setType('driver')
                await login(response.headers.auth, phoneNo, 'driver')
                setUserAdd(true)
            }
        } catch (err) {
            console.error('Network error:', err);
        } finally {
            setLoader(false)
        }
    }
    return (
        <SafeAreaView className="p-4">
            <Loader />
            <BackButton navigateBack={navigateBack} />
            <View className="mt-10">
                <Image
                    source={{
                        uri: 'https://th.bing.com/th/id/OIG2.DIQxRcJZ1qsuea.72I8a?w=1024&h=1024&rs=1&pid=ImgDetMain'
                    }}
                    style={{
                        width: Dimensions.get('window').width - 30,
                        borderRadius: 10,
                        marginBottom: 15,
                        height: 220,
                    }}
                />
                <View>
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
                        left={<TextInput.Affix text={`+91 | `} />}
                        keyboardType="phone-pad"
                        value={phoneNo}
                        onChangeText={setPhoneNo}
                        maxLength={10}
                        label={"Phone Number"}
                        placeholder='Enter your 10 digit phone number'
                        underlineColor='white'
                        activeUnderlineColor='black'
                    />
                    <Text className="h-0"></Text>
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
                            shadowOffset: { width: 0, height: 2 }
                        }}
                        secureTextEntry={true}
                        autoCapitalize='none'
                        value={password}
                        onChangeText={setPassword}
                        multiline={false}
                        keyboardType='default'
                        label={"Password"}
                        placeholder='Enter Password'
                        underlineColor='white'
                        activeUnderlineColor='black'
                    />
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#e46c47',
                        height: 50,
                        padding: 10,
                        justifyContent: 'center',
                        marginVertical: 15,
                        borderRadius: 10
                    }}
                    onPress={driverLogin}
                >
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: '600' }}>
                        {"LOGIN"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default DriverLogin

const styles = StyleSheet.create({})