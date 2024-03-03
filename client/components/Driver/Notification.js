import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Notification = () => {
    return (
        <View style={styles.notificationsContainer}>
            <Text style={styles.notificationsTitle}>Notifications</Text>
            {/* Display list of notifications */}
            <TouchableOpacity style={styles.notification}>
                <Text style={styles.notificationText}>New order received</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.notification}>
                <Text style={styles.notificationText}>Promotion: Extra ₹50 per delivery</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    notificationsContainer: {
        marginBottom: 20,
    },
    notificationsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    notification: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    notificationText: {
        fontSize: 16,
    },
})