import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RestaurantMenuIcon from '../../../components/RestaurantHome/RestaurantMenuIcon';

// Custom Header component
const Header = ({ title, navigation }) => (
    <View style={styles.header}>
        {navigation &&
            <TouchableOpacity onPress={() => navigation.pop()}>
                <Image source={{ uri: "https://img.icons8.com/windows/96/ffffff/long-arrow-left.png" }}
                    style={{
                        width: 30,
                        height: 30,
                        marginTop: 10,
                        right: 10
                    }}
                />
            </TouchableOpacity>}
        <Text style={styles.headerText}>{title}</Text>
        <View></View>
    </View>
);

const RestaurantLiveOrders = ({ navigation, orderNumber = 100 }) => {
    // Mock data for orders
    const [orderStatus, setOrderStatus] = useState({
        1: 'Pending',
        2: 'Preparing',
        3: 'Ready for pickup',
        4: 'Delivered'
    });
    const orders = [
        { id: 1, customer: 'John Doe', items: ['Burger', 'Fries'], status: 'Preparing' },
        { id: 2, customer: 'Jane Smith', items: ['Pizza', 'Salad'], status: 'Ready for pickup' },
        { id: 3, customer: 'Alice Johnson', items: ['Pasta', 'Garlic bread'], status: 'Delivered' },
        { id: 4, customer: 'Anuj', items: ['Sandwich', 'Coke'], status: 'Delivered' },
        // Add more orders as needed
    ];
    const handleCancel = (orderId) => {
        // Remove order from the state
        setOrderStatus({
            ...orderStatus,
            [orderId]: 'Cancelled'
        });
    };
    const handleStatusUpdate = (orderId) => {
        // Update order status in the state
        setOrderStatus({
            ...orderStatus,
            [orderId]: orderStatus[orderId] === 'Pending' ? 'Preparing' :
                orderStatus[orderId] === 'Preparing' ? 'Ready for pickup' :
                    orderStatus[orderId] === 'Ready for pickup' ? 'Delivered' : 'Completed'
        });
        console.log(`Order ${orderId} status updated to `);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Live Orders"
                navigation={orderNumber === 100 ? navigation : null}
            />
            <ScrollView contentContainerStyle={styles.ordersContainer}>
                {orders.slice(0, orderNumber).map(order => (
                    <View key={order.id} style={styles.orderContainer}>
                        <Text style={styles.orderText}>Customer: {order.customer}</Text>
                        <Text style={styles.orderText}>Items: {order.items.join(', ')}</Text>
                        <Text style={styles.orderText}>Status: {orderStatus[order.id]}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => handleCancel(order.id)} style={[styles.button, {
                                backgroundColor: 'red'
                            }]}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleStatusUpdate(order.id)} style={styles.button}>
                                <Text style={styles.buttonText}>
                                    {
                                        orderStatus[order.id] === 'Pending' ? 'Accept'
                                            : orderStatus[order.id] === 'Preparing' ? 'Ready for pickup' : 'Delivered'
                                    }

                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: 'green',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    ordersContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    orderContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    orderText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: 'green',
        padding: 8,
        borderRadius: 8,
        width: '40%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default RestaurantLiveOrders;
