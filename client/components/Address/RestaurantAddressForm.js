// AddressForm.js
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useAuth } from '../../features/context/AuthContext';

const RestaurantAddressForm = ({ onSubmit, setApiData, currentLocation, fullAddress, city }) => {
    const [houseNo, setHouseNo] = useState('');
    const [area, setArea] = useState('');
    const [directions, setDirections] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [name, setName] = useState('');
    const [saveAs, setSaveAs] = useState('');
    const [myself, setMyself] = useState(true);
    const [gstinNo, setGstinNo] = useState('');
    const { phoneNumber, auth } = useAuth()
    const setData = async () => {
        setApiData({
            "address": {
                "houseNo": houseNo,
                "area": area + ", " + fullAddress,
                "city": city,
                "directions": directions,
                "location": {
                    "coordinates": [currentLocation.lat.toString(), currentLocation.lon.toString()]
                },
                "gstinNo": gstinNo
            }
        })
    }

    const handleSubmit = async () => {
        await setData()
        onSubmit()
    };
    return (
        <KeyboardAvoidingView className=""
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView
                automaticallyAdjustKeyboardInsets={true}
            >
                <View className="border-2 border-[#d6bba1] bg-[#fffdf4] p-2 rounded-md my-3">
                    <Text className="text-[#a78565] font-semibold">
                        A detailed address will help our Delivery Partner reach your doorstep easily
                    </Text>
                </View>
                <TextInput
                    label="HOUSE/FLAT /BLOCK NO.*"
                    value={houseNo}
                    onChangeText={(text) => setHouseNo(text)}
                    className="bg-white mt-2"
                    underlineColorAndroid={' rgb(107 114 128 )'}
                    activeUnderlineColor='#c46e47'
                />
                <TextInput
                    label="APARTMENT /ROAD /AREA"
                    value={area}
                    className="bg-white my-2"
                    onChangeText={(text) => setArea(text)}
                    underlineColorAndroid={' rgb(107 114 128 )'}
                    activeUnderlineColor='#c46e47'
                />
                <TextInput
                    label="Enter your GSTIN No."
                    value={gstinNo}
                    className="bg-white my-2"
                    onChangeText={(text) => setGstinNo(text)}
                    underlineColorAndroid={' rgb(107 114 128 )'}
                    activeUnderlineColor='#c46e47'
                />
                <Text className=" text-sm text-gray-600 my-2 left-4">
                    DIRECTION TO REACH{' '}
                    <Text className="text-gray-400">
                        (Optional)
                    </Text>
                </Text>
                <TextInput

                    placeholder='e.g. Ring the bell on the red gate'
                    onChangeText={(text) => setDirections(text)}
                    value={directions}
                    className="bg-gray-200 h-[80] justify-start align-top rounded-md"
                    underlineColorAndroid={' rgb(107 114 128 )'}
                    activeUnderlineColor='#c46e47'
                />
                <Button mode='elevated' onPress={handleSubmit} style={styles.Button} >
                    <Text className="text-white text-lg">
                        Submit
                    </Text>
                </Button>
                <View className="h-[30]">

                </View>
            </ScrollView>

        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'white',
        flex: 1
    },
    Button: {
        marginTop: 20,
        backgroundColor: '#e46c47',
        padding: 4,
        borderRadius: 5,
        color: 'white',
        alignItems: 'center'
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
});

export default RestaurantAddressForm;
