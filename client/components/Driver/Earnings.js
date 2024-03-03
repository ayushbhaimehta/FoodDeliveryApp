import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Earnings = () => {
    return (
        <View style={styles.earningsContainer}>
            <Text style={styles.earningsTitle}>Earnings Overview</Text>
            {/* Display earnings summary */}
            <Text style={styles.earningsInfo}>Today: ₹500</Text>
            <Text style={styles.earningsInfo}>This Week: ₹3000</Text>
            <Text style={styles.earningsInfo}>This Month: ₹12000</Text>
        </View>
    )
}

export default Earnings

const styles = StyleSheet.create({
    earningsContainer: {
        marginBottom: 20,
    },
    earningsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    earningsInfo: {
        fontSize: 16,
        marginBottom: 5,
    },
})