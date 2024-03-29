import React, { Component, useLayoutEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Entypo'
import { ScrollView } from "react-native";

import Category from "../../../components/User/Home/Category";
import Offer from "../../../components/User/Home/Offer";
import Feature from "../../../components/User/Home/Feature";
import Discount from "../../../components/User/Home/Discount";
import { useSession } from "../../../features/context/SessionContext";

const HomeScreen = ({ navigation }) => {
    const { user } = useSession()
    const [fullAddressVisible, setFullAddressVisible] = useState(false);
    return (
        <SafeAreaView className=" bg-white">

            {/* Header */}
            <View className=" flex-row justify-between mt-2 mx-3 pb-4">
                <View className=" flex-row space-x-2 items-center ">
                    <Image
                        src="https://images.unsplash.com/photo-1619454016518-697bc231e7cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                        className=" h-9 w-9 rounded-full"
                    />
                    <View className=" overflow-hidden" onTouchEnd={() => setFullAddressVisible(!fullAddressVisible)}>
                        <Text className=" text-sm text-gray-500">Deliver to</Text>
                        <Text className=" font-bold text-xl">{user?.address[0]['name']} <Icon name="down" size={20} color="#e47c46" /></Text>
                    </View>
                </View>
                <Icon2 name="user-circle-o"
                    onPress={() => navigation.push('AccountOptions')}
                    size={33} color="#e46c47" />
            </View>
            {fullAddressVisible &&
                <View className="mx-3">
                    <Text className="text-lg font-bold">Your full address</Text>
                    <Text className="text-gray-500 text-sm">{user?.address[0]['houseNo'] + " " + user?.address[0]['area']}</Text>
                    <Text className="text-lg font-bold">Directions to your place</Text>
                    <Text className="text-gray-500 text-sm">{user?.address[0]['directions']}</Text>
                </View>

            }

            {/* Search */}
            <View className="flex-row items-center mx-3 pb-4 space-x-2">
                <View className=" flex-row flex-auto space-x-2 py-1 px-2 items-center bg-gray-200">
                    <Icon name="search1" size={18} />
                    <TextInput placeholder="Resturents and cuisines" keyboardType="default" className=" text-sm" />
                </View>
                <Icon3 name="sound-mix" size={28} color="#e46c47" />
            </View>
            {/* Body */}
            <ScrollView showsVerticalScrollIndicator={false} className="bg-gray-100">
                {/* categories */}
                <Category />
                {/* Offer near you */}
                <Offer />
                {/* Feature */}
                <Feature />
                {/* Tasty Discount */}
                <Discount />
            </ScrollView>

        </SafeAreaView>
    );
};

export default HomeScreen;
