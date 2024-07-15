import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import CurrentOrderBox from './CurrentOrderBox'

const Orders = () => {
    return (
        <>
            <CurrentOrderBox />
            <View style={styles.upcomingOrdersContainer}>
                <Text style={styles.upcomingOrdersTitle}>Recent Orders</Text>
                {/* Display list of upcoming orders */}
                <TouchableOpacity style={styles.upcomingOrder}>
                    <Text style={styles.upcomingOrderInfo}>Restaurant: ABC Cafe</Text>
                    <Text style={styles.upcomingOrderInfo}>Items: 1</Text>
                    <Text style={styles.upcomingOrderInfo}>Time: 12:00 PM</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.upcomingOrder}>
                    <Text style={styles.upcomingOrderInfo}>Restaurant: PQR Biryani</Text>
                    <Text style={styles.upcomingOrderInfo}>Items: 3</Text>
                    <Text style={styles.upcomingOrderInfo}>Time: 1:30 PM</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Orders

const styles = StyleSheet.create({
    upcomingOrdersContainer: {
        marginBottom: 20,
    },
    upcomingOrdersTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    upcomingOrder: {
        borderWidth: 1,
        borderColor: '#888',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    upcomingOrderInfo: {
        fontSize: 16,
        marginBottom: 5,
    },
})