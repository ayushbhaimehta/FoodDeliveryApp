import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const RestaurantMenuIcon = ({ navigation }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.push('RestaurantOptions')}>
                <Image source={{ uri: "https://img.icons8.com/ios-filled/50/FFFFFF/menu--v1.png" }}
                    style={{
                        width: 25,
                        height: 25,
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default RestaurantMenuIcon
