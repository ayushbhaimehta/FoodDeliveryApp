import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotificationIcon = () => {
    return (
        <View style={styles.noti}>
            <Image
                source={{
                    uri: 'https://img.icons8.com/ios-filled/ffffff/appointment-reminders.png',
                }}
                style={styles.icon}

            />
        </View>
    )
}

export default NotificationIcon

const styles = StyleSheet.create({
    noti: {
        width: 30,
        height: 30,
        position: 'absolute',
        right: 10,
        top: 10
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 20,
    }

})