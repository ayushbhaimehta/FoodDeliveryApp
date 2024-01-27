import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const InformationTab = ({ location, fullAddress, setIsFormVisible }) => {
    return (
        <View>
            <Text style={{ fontSize: 16, margin: 10 }} className="text-gray-500">SELECT DELIEVERY LOCATION </Text>
            <View className="flex-row ">
                <Image
                    source={{
                        uri: 'https://img.icons8.com/color/96/e46c47/marker--v1.png'
                    }}
                    style={{
                        width: 20,
                        height: 20,
                        top: 18,
                        left: 10,
                    }}
                />
                <Text style={{ fontSize: 25, fontWeight: 'bold', margin: 10, left: 10 }}>{location}</Text>
                <TouchableOpacity className="justify-center items-end flex-1 right-2">
                    <Text style={{ fontSize: 16, margin: 10, color: '#e46c47', fontWeight: 'bold' }}>CHANGE</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 16, margin: 10 }}>{fullAddress}</Text>

            <TouchableOpacity
                style={{
                    backgroundColor: '#e46c47',
                    padding: 10,
                    borderRadius: 10,
                    marginHorizontal: 10,
                    marginVertical: 20,
                    alignItems: 'center'
                }}
                onPress={() => setIsFormVisible(true)}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirm Location</Text>
            </TouchableOpacity>
        </View>
    )
}

export default InformationTab