import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const MenuContainer = ({ active, setActive }) => {
    return (
        <View style={styles.menuContainer}>
            {/* Menu items */}
            <TouchableOpacity style={[styles.menuItem, { backgroundColor: active === 'orders' ? 'skyblue' : 'white' }]}
                onPress={() => setActive('orders')}
            >
                < Text style={[styles.menuItemText, { fontWeight: active === 'orders' ? "700" : 'normal' }]} > Orders</Text>
            </TouchableOpacity >
            <TouchableOpacity style={[styles.menuItem, { backgroundColor: active === 'earning' ? 'skyblue' : 'white' }]}
                onPress={() => setActive('earning')}
            >
                <Text style={[styles.menuItemText, { fontWeight: active === 'earning' ? "700" : 'normal' }]}>Earnings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuItem, { backgroundColor: active === 'setting' ? 'skyblue' : 'white' }]}
                onPress={() => setActive('setting')}
            >
                <Text style={[styles.menuItemText, { fontWeight: active === 'setting' ? "700" : 'normal' }]}>Settings</Text>
            </TouchableOpacity>
        </View >
    )
}

export default MenuContainer

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f0f0f0',
        paddingBottom: 20,
        borderBottomWidth: 1
    },
    menuItem: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#888',
    },
    menuItemText: {
        fontSize: 16
    }
})