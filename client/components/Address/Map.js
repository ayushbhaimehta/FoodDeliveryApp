import { StyleSheet } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';

const Map = ({ currentLocation, setCurrentLocation }) => {
    return (
        <MapView
            style={styles.map}
            showsUserLocation
            followUserLocation
            showsMyLocationButton
            loadingEnabled
            showsCompass
            toolbarEnabled={false}
            onPress={(e) => {
                setCurrentLocation({
                    lat: e.nativeEvent.coordinate["latitude"],
                    lon: e.nativeEvent.coordinate["longitude"]
                })
            }}
            initialRegion={{
                latitude: currentLocation.lat,
                longitude: currentLocation.lon,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <Marker
                draggable={true}
                coordinate={{
                    latitude: currentLocation.lat || 10.00,
                    longitude: currentLocation.lon || 10.00,
                }}
                onDragEnd={(e) => {
                    setCurrentLocation({
                        lat: e.nativeEvent.coordinate["latitude"],
                        lon: e.nativeEvent.coordinate["longitude"]
                    })
                }}
                title='Order will be delivered here'
                description='Place the pin accurately on the map'

            />
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
})