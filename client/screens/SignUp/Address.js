import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useGetLocation } from '../../features/hook/useGetLocation';

const Address = () => {
    const [currentLocation, setCurrentLocation] = useState({
        "lon": 76.7688417,
        "lat": 30.7285578
    });
    const [lat, lon, error] = useGetLocation();
    useEffect(() => {
        setCurrentLocation({
            lat: lat,
            lon: lon
        })
    }, [lat, lon])
    console.log(currentLocation);


    return (
        <View style={styles.container}>
            {currentLocation && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: currentLocation.lat,
                        longitude: currentLocation.lon,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: currentLocation.lat,
                            longitude: currentLocation.lon,
                        }}
                    />
                </MapView>
            )}
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
});

export default Address;
