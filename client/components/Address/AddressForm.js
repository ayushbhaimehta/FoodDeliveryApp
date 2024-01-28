// AddressForm.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import SaveAsScreen from './SaveAs';
import { useAuth } from '../../features/context/AuthContext';
import axios from 'axios';

const AddressForm = ({ onSubmit, setApiData, currentLocation, fullAddress }) => {
    const [houseNo, setHouseNo] = useState('');
    const [area, setArea] = useState('');
    const [directions, setDirections] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [name, setName] = useState('');
    const [saveAs, setSaveAs] = useState('');
    const [myself, setMyself] = useState(true);
    const { phoneNumber, auth } = useAuth()

    const getUser = async (phoneNumber) => {
        try {
            const res = await axios.get(`http://192.168.1.5:3000/user/getbyphone/${phoneNumber}`, {
                headers: {
                    auth: auth,
                    "Content-Type": 'application/json'
                }
            });
            if (res.status === 200) {
                setName(res.data.result["name"]);
            } else {
                console.log("Non-200 status code:", res.status);
            }
        } catch (err) {
            console.log("Error:", err);
        }
    }

    useEffect(() => {
        // console.log(saveAs, name, myself, houseNo, area, phoneNo, directions);

        if (myself) {
            if (saveAs !== 'Other') {
                getUser(phoneNumber);
            }
            setPhoneNo(phoneNumber)
        }
        setApiData({
            "address": {
                "name": name,
                "phoneNo": phoneNo,
                "myself": myself,
                "saveAs": saveAs,
                "houseNo": houseNo,
                "area": area + ", " + fullAddress,
                "directions": directions,
                "location": {
                    "coordinates": [currentLocation.lat.toString(), currentLocation.lon.toString()]
                }
            }
        })
    }, [saveAs, name, phoneNo])

    const handleSubmit = () => {
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
                <SaveAsScreen
                    setMyself={setMyself}
                    setSaveAs={setSaveAs}
                    setName={setName}
                    name={name}
                    phoneNo={phoneNo}
                    setPhoneNo={setPhoneNo}
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

export default AddressForm;
