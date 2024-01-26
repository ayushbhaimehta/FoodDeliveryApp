import React, { useEffect, useState } from "react";
import * as Location from 'expo-location';

export const useGetLocation = () => {
    const [error, setError] = useState(null);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    const fetchLocationData = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setError('Permission to Access Location Denied!!');
            return
        }
        let location = await Location.getCurrentPositionAsync({});
        setLat(location.coords.latitude);
        setLon(location.coords.longitude);

    }
    useEffect(() => {
        fetchLocationData();
    }, [lat, lon])

    return [lat, lon, error]
}