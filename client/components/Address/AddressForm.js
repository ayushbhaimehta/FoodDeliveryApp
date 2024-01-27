// AddressForm.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
import RadioButtonGroup from 'react-native-paper/src/components/RadioButton/RadioButtonGroup';

const AddressForm = ({ onSubmit }) => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = () => {
        // Combine the form fields into a complete address
        const completeAddress = `${street}, ${city}, ${zipCode}, ${country}`;

        // Call the onSubmit prop with the complete address
        onSubmit(completeAddress);
    };
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        onSelect(option);
    };
    return (
        <View style={styles.container}>
            <View className="border-2 border-[#d6bba1] bg-[#fffdf4] p-2 rounded-md my-3">
                <Text className="text-[#a78565] font-semibold">
                    A detailed address will help our Delivery Partner reach your doorstep easily
                </Text>
            </View>
            <TextInput
                label="HOUSE/FLAT /BLOCK NO.*"
                value={street}
                onChangeText={(text) => setStreet(text)}
                className="bg-white my-4"
                underlineColorAndroid={' rgb(107 114 128 )'}
                activeUnderlineColor='#c46e47'
            />
            <TextInput
                label="APARTMENT /ROAD /AREA"
                value={city}
                className="bg-white my-2"
                onChangeText={(text) => setCity(text)}
            />
            <Text className=" text-base text-gray-600 mb-2 left-4">
                DIRECTION TO REACH{' '}
                <Text className="text-gray-400">
                    (Optional)
                </Text>
            </Text>
            <TextInput
                placeholder='e.g. Ring the bell on the red gate'
                className="bg-gray-200 h-32 justify-start align-top rounded-md"
            />
            <View style={{ padding: 16, flexDirection: 'row' }}>
                <RadioButtonGroup onValueChange={(value) => handleOptionSelect(value)} value={selectedOption}
                    style={{

                    }}
                >
                    <View style={styles.optionContainer}>
                        <RadioButton value="home" />
                        <Text>Home</Text>
                    </View>
                    <View style={styles.optionContainer}>
                        <RadioButton value="work" />
                        <Text>Work</Text>
                    </View>
                    <View style={styles.optionContainer}>
                        <RadioButton value="friends" />
                        <Text>Friends</Text>
                    </View>
                    <View style={styles.optionContainer}>
                        <RadioButton value="family" />
                        <Text>Family</Text>
                    </View>
                    <View style={styles.optionContainer}>
                        <RadioButton value="others" />
                        <Text>Others</Text>
                    </View>
                </RadioButtonGroup>
            </View>
            <Button mode='elevated' onPress={handleSubmit} style={styles.Button} >
                <Text className="text-white text-lg">
                    Submit
                </Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'white',
        position: 'absolute'
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
