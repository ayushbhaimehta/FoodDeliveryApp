import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DriverDeliveryScreen = () => {
    const [driverLocation, setDriverLocation] = useState({
        latitude: 30.767120,
        longitude: 76.785255
    });
    const [deliveryAddress, setDeliveryAddress] = useState('123 Main St, City');
    const [orderDetails, setOrderDetails] = useState('Order ID: 123456');
    const [orderStatus, setOrderStatus] = useState('Preparing');

    // Listen for updates to the driver's location in real-time

    // Function to handle changing order status
    const handleChangeOrderStatus = () => {
        // Logic to change order status (e.g., update in Firebase database)
        setOrderStatus('Delivering');
    };

    return (
        <View style={styles.container}>
            {/* Map View */}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: driverLocation ? driverLocation.latitude : 0,
                    longitude: driverLocation ? driverLocation.longitude : 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* Marker for driver's current location */}
                {driverLocation && (
                    <Marker
                        coordinate={{
                            latitude: driverLocation.latitude,
                            longitude: driverLocation.longitude,
                        }}
                        title="Driver"
                        description="Your current location"
                    />
                )}
                {/* Marker for delivery address */}
                <Marker
                    coordinate={{ latitude: 30.739358, longitude: 76.777423 }}
                    title="Delivery Address"
                    description={deliveryAddress}
                    style={
                        {
                            width: 60,
                            height: 60,
                        }
                    }

                >
                    <Image
                        source={{
                            uri: 'https://img.icons8.com/external-filled-outline-design-circle/64/e46c47/external-Home-Location-online-shopping-filled-outline-design-circle.png'
                        }}
                        style={{
                            width: 40,
                            height: 40,
                            resizeMode: 'cover'
                        }}
                    />
                </Marker>
            </MapView>

            {/* Order Details Bar */}
            <View style={styles.orderDetails}>
                <Text>{orderDetails}</Text>
                <Text>Status: {orderStatus}</Text>
            </View>

            {/* Button to change order status */}
            <Button
                title="Change Status"
                onPress={handleChangeOrderStatus}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    orderDetails: {
        backgroundColor: '#fff',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default DriverDeliveryScreen;
