import React, { useEffect, useState } from 'react';
import { View, Text, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';

const Component = ({ icon, text, active, setActive, setSaveAs }) => {
    return (
        <View className=" w-auto rounded-3xl border-gray-600 border-2 h-[40] my-2 mr-2 justify-center"
            onTouchEnd={() => {
                setActive(text)
                setSaveAs(text)
            }}
            style={{
                backgroundColor: active === text ? '#e46c47' : 'white',
                borderColor: active === text ? '#e46c47' : 'gray'

            }}
        >
            <View className="flex flex-row pl-3 pr-5">
                <Image
                    source={{
                        uri: icon
                    }}
                    style={{
                        width: 15,
                        height: 15,
                        resizeMode: 'contain',
                        marginTop: 1
                    }}
                />
                <View className=" text-center">
                    <Text className=" font-bold left-2">
                        {text}
                    </Text>
                </View>
            </View>
        </View >
    )
}

const SaveAsScreen = ({ setMyself, setSaveAs, setName, name, phoneNo, setPhoneNo }) => {
    const [active, setActive] = useState('');
    useEffect(() => {

        if (active !== 'Friends and Family') {
            setMyself(true);
        } else {
            setMyself(false)
        }
    }, [active])

    return (
        <View className="mt-4"
        >
            <View>
                <Text className="text-gray-500 font-bold">
                    SAVE AS
                </Text>
            </View>
            <View className="flex-row flex-wrap justify-start mt-2">
                <Component
                    icon={'https://img.icons8.com/ios-filled/100/home.png'}
                    text={'Home'}
                    active={active}
                    setActive={setActive}
                    setSaveAs={setSaveAs}
                />
                <Component
                    icon={'https://img.icons8.com/ios-filled/100/business.png'}
                    text={'Work'}
                    active={active}
                    setActive={setActive}
                    setSaveAs={setSaveAs}
                />
                <Component
                    icon={'https://img.icons8.com/android/96/group.png'}
                    text={'Friends and Family'}
                    active={active}
                    setActive={setActive}
                    setSaveAs={setSaveAs}
                />
                <Component
                    icon={'https://img.icons8.com/ios-glyphs/90/marker--v1.png'}
                    text={'Other'}
                    active={active}
                    setActive={setActive}
                    setSaveAs={setSaveAs}
                />
            </View>
            {
                active === 'Friends and Family' &&
                <View className="">
                    <TextInput
                        label={"Reviever's Name"}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        className="bg-white"
                        underlineColorAndroid={' rgb(107 114 128 )'}
                        activeUnderlineColor='#c46e47'
                    />
                    <TextInput
                        label={"Recievers Phone Number"}
                        value={phoneNo}
                        onChangeText={(text) => setPhoneNo(text)}
                        className="bg-white "
                        underlineColorAndroid={' rgb(107 114 128 )'}
                        activeUnderlineColor='#c46e47'
                    />
                </View>
            }
            {
                active === 'Other' &&
                <View className="">
                    <TextInput
                        label={"Name"}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        className="bg-white"
                        underlineColorAndroid={' rgb(107 114 128 )'}
                        activeUnderlineColor='#c46e47'
                    />
                </View>
            }

        </View >
    )
}


export default SaveAsScreen;