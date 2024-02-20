import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native'
import React, { useState, useRef, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../../features/context/AuthContext'
import { useLoader } from '../../../features/context/LoaderContext'
import axios from 'axios'
import UploadScreen from '../../../components/Global/ImageAdder'

const RestaurantNameEmailInput = ({ navigation }) => {
    const { auth } = useAuth()
    const { setLoader } = useLoader()
    const [focused, setFocused] = useState("name")
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [imgUrl, setImgUrl] = useState(null);
    const [uploadPage, setUploadPage] = useState(false)
    const handleUpload = () => {
        setUploadPage(true)
    }

    const handleFormSubmit = async () => {
        setLoader(true)
        try {
            const response = await axios.post(`${process.env.BASE_URL}/restaurant/updateName`, {
                restaurantName: name,
                email: email
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth': auth
                },
            });


            const res = await axios.post(`${process.env.BASE_URL}/restaurant/addImg`, {
                img: imgUrl
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth': auth
                },
            });
            if (res.status === 200) {
                console.log(res.data);
            } else {
                console.log('Failed to Add Image:', res.statusText);
            }
            console.log(response.data);
            if (response.status === 200) {

                navigation.navigate('Address');
            } else {
                console.log('API request failed:', response.statusText);
            }

        } catch (err) {
            console.error('Network error:', err);
        }
        setLoader(false)
    }

    return (
        <SafeAreaView className="mx-1 flex-1">
            {uploadPage ?
                <View className="flex-1">

                    <UploadScreen
                        navigation={navigation}
                        setImgUrl={setImgUrl}
                        setUploadPage={setUploadPage}
                        bucket={"restaurantLogo"}

                    />
                </View>
                :
                <>
                    <View className="bg-[#f7f8fc] flex-row" style={
                        {
                            height: imgUrl ? 100 : 250,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }
                    }>
                        {/* <TouchableOpacity >
                    <Image source={{ uri: "https://img.icons8.com/windows/96/long-arrow-left.png" }}
                        style={{
                            width: 32,
                            height: 32,
                            marginTop: 10,
                            marginLeft: 1
                        }}
                    // onTouchEnd={navigateToHome}
                    />
                </TouchableOpacity> */}
                        <View className="mx-2 flex-1 justify-center items-center">
                            <Text className="text-2xl font-black mt-4">ENTER RESTAURANT DETAILS</Text>
                            <Text className="text-gray-500 mt-1">Fill your restaurant name and email</Text>
                        </View>
                    </View>
                    <View >
                        {imgUrl &&
                            <View>
                                <Image
                                    source={{
                                        uri: imgUrl
                                    }}


                                    style={{
                                        width: Dimensions.get('window').width,
                                        height: 200,
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        resizeMode: 'cover'
                                    }}
                                />
                            </View>
                        }
                        <View className="mx-3 mt-10">
                            <Text style={{ color: focused === "name" ? "#e46c47" : "#6B7280" }}>Restaurant Name</Text>
                            <TextInput
                                keyboardType="default"
                                className="border-b-2"
                                style={{
                                    borderColor: focused === "name" ? "#e46c47" : "#D1D5DB"
                                }}
                                placeholder='Enter your restaurant name'
                                autoFocus
                                value={name}
                                cursorColor={"#e46c47"}
                                onChangeText={(e) => setName(e)}
                                onFocus={() => setFocused("name")}
                            />
                        </View>
                        <View className="mx-3 mt-10">
                            <Text style={{ color: focused === "email" ? "#e46c47" : "#6B7280" }}>Email</Text>
                            <TextInput
                                keyboardType="email-address"
                                autoCapitalize="none"
                                textContentType="emailAddress"
                                className="border-b-2"
                                placeholder='Enter email you want to associated with restaurant'
                                onChangeText={(e) => setEmail(e)}
                                value={email}
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
                            onPress={imgUrl ? handleFormSubmit : handleUpload}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                {
                                    imgUrl ? "Submit" : "Upload Restaurant Image"
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>

            }
        </SafeAreaView>
    )

}
export default RestaurantNameEmailInput

