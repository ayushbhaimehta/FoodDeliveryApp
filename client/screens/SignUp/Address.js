import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
//hooks
import { useGetLocation } from '../../features/hook/useGetLocation';
import { useLoader } from '../../features/context/loaderContext';
import { useAuth } from '../../features/context/AuthContext';
//Components
import Loader from '../../components/Global/Loader';
import BackButton from '../../components/Global/BackButton';
import Map from '../../components/Address/Map';
import AddressForm from '../../components/Address/AddressForm';
import { PaperProvider } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const Address = ({ navigation }) => {
    const { setLoader } = useLoader();
    const { setUser, auth } = useAuth();
    const [currentLocation, setCurrentLocation] = useState({
        "lon": 76.7688417,
        "lat": 30.7285578
    });
    const [apiData, setApiData] = useState({})

    const [isFormVisible, setIsFormVisible] = useState(true);
    const [fullAddress, setFullAddress] = useState("");
    const [location, setLocation] = useState("")

    const [lat, lon, error] = useGetLocation();

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };


    const getAddress = async (lat, lon) => {
        setLoader(true)
        try {
            const res = await axios.post(`http://192.168.1.5:3000/user/getUserLocation`, {
                lat: currentLocation.lat,
                lon: currentLocation.lon
            });
            if (res.status === 200) {
                setFullAddress(res.data.result[0]["address_line2"])
                setLocation(res.data.result[0]['suburb'])
            }
        }
        catch (err) {
            console.log(" New error", err);
        } finally {
            setLoader(false)
        }
    }
    useEffect(() => {
        if (lat && lon) {
            setCurrentLocation({
                lat: lat,
                lon: lon
            })
        }
    }, [lat, lon])

    useEffect(() => {
        getAddress(currentLocation.lat, currentLocation.lon)
    }
        , [currentLocation])

    const navigateBack = () => {
        if (isFormVisible) {
            setIsFormVisible(false)
        }
        else {
            navigation.navigate('Input')
        }
    }
    const addAddress = async (apiData) => {
        setLoader(true)
        try {
            const res = await axios.post(`http://192.168.1.5:3000/user/addaddress`, {
                address: apiData.address
            }, {
                headers: {
                    auth: auth,
                    "Content-Type": 'application/json'
                }
            });
            if (res.status === 200) {
                console.log("Address added successfully");
                setUser(true)
            }
        }
        catch (err) {
            console.log("ERROR: ", err);
        }

    }

    const handleSubmit = () => {
        addAddress(apiData);
    }
    return (

        <SafeAreaView style={styles.container}>
            <Loader />
            <BackButton navigateBack={navigateBack} />

            {currentLocation && (
                <Map currentLocation={currentLocation}
                    setCurrentLocation={setCurrentLocation}
                />
            )}
            <View style={[isFormVisible ? {
                height: '90%',
                width: '100%',
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,

            } : {}]}>
                {!isFormVisible &&
                    <Text style={{ fontSize: 16, margin: 10 }} className="text-gray-500">SELECT DELIEVERY LOCATION </Text>
                }
                <View className="flex-row mt-4">
                    <Image
                        source={{
                            uri: 'https://img.icons8.com/color/96/e46c47/marker--v1.png'
                        }}
                        style={{
                            width: 20,
                            height: 20,
                            top: 18,
                            left: 10,
                        }}
                    />
                    <Text style={{ fontSize: 25, fontWeight: '800', margin: 10, left: 10 }}>{location}</Text>
                    {!isFormVisible && <TouchableOpacity className="justify-center items-end flex-1 right-2">
                        <Text style={{ fontSize: 16, margin: 10, color: '#e46c47', fontWeight: 'bold' }}>CHANGE</Text>
                    </TouchableOpacity>}
                </View>
                <Text style={{ fontSize: 16, marginHorizontal: 10, fontWeight: '600' }}>{fullAddress}</Text>
                {isFormVisible &&
                    <PaperProvider >
                        <View style={styles.sliderContainer}>
                            <Animatable.View
                                style={styles.formContainer}
                                animation={isFormVisible ? 'slideInUp' : 'slideOutDown'}
                            >
                                <AddressForm
                                    onSubmit={handleSubmit}
                                    isVisible={isFormVisible}
                                    onClose={toggleFormVisibility}
                                    setApiData={setApiData}
                                    currentLocation={currentLocation}
                                    fullAddress={fullAddress}
                                />
                            </Animatable.View>
                        </View>
                    </PaperProvider>}
                {!isFormVisible && <TouchableOpacity
                    style={{
                        backgroundColor: '#e46c47',
                        padding: 10,
                        borderRadius: 10,
                        marginHorizontal: 10,
                        marginVertical: 20,
                        alignItems: 'center'
                    }}
                    onPress={() => setIsFormVisible(true)}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirm Location</Text>
                </TouchableOpacity>}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    formContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999
    },
});

export default Address;
