import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CurrentOrderBox = () => {
    return (
        <View style={styles.orderStatusContainer}>
            <Text style={styles.orderStatusTitle}>Current Order</Text>
            {/* Display order information */}
            <Text style={styles.orderInfo}>Restaurant: XYZ Restaurant</Text>
            <Text style={styles.orderInfo}>Customer: John Doe</Text>
            <Text style={styles.orderInfo}>Items: 2</Text>
            <Text style={styles.orderInfo}>Status: In Transit</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    orderStatusContainer: {
        marginBottom: 20,
    },
    orderStatusTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderInfo: {
        fontSize: 16,
        marginBottom: 5,
    }
})

export default CurrentOrderBox