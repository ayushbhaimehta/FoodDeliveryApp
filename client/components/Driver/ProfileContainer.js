import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import NotificationIcon from './NotificationIcon'

const ProfileContainer = () => {
    return (
        <View style={styles.profileContainer}>
            <NotificationIcon />
            <Image
                source={{
                    uri: 'https://randomuser.me/api/portraits/men/85.jpg',
                }}
                style={styles.profilePicture}
            />
            <Text style={styles.profileName}>Rajesh Kumar</Text>
            <Text style={styles.profileInfo}>Delivery Partner</Text>
        </View>
    )
}

export default ProfileContainer

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#e46c47'
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    profileInfo: {
        fontSize: 16,
        marginTop: 5,
        color: 'white',
    },
})