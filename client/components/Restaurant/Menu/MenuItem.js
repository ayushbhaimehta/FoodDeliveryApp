import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import axios from 'axios';

import { useLoader } from '../../../features/context/LoaderContext';
import { useAuth } from '../../../features/context/AuthContext';
import { useSession } from '../../../features/context/SessionContext';

const MenuItem = ({ item, setMenuOptionsVisible, menuOptionsVisible }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const altImage = "https://firebasestorage.googleapis.com/v0/b/food-delivery-app-2a7d6.appspot.com/o/menuImage%2Ffood-modified.jpg?alt=media&token=9f7c3e47-dd70-4dec-ae20-5f1e3b7705d7"
    const { setLoader } = useLoader();
    const { auth, phoneNumber, type } = useAuth();
    const { reloadUser } = useSession()

    useEffect(() => {
        if (menuOptionsVisible === item._id) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [menuOptionsVisible]);
    const handleClick = () => {
        if (menuOptionsVisible === item._id) {
            setMenuOptionsVisible(null);
        } else {
            setMenuOptionsVisible(item._id);
        }
    }

    const handleMenuDelete = async (id, auth, phoneNumber, type) => {
        setLoader(true);
        console.log(id, auth);
        try {
            const res = await axios.delete(`${process.env.BASE_URL}/restaurant/deleteMenu`, {
                headers: {
                    auth: auth,
                    "Content-Type": 'application/json'
                },
                data: {
                    "menuId": id
                }
            });

            if (res.status === 200) {
                console.log('Deleted Successfully');
                alert('Deleted Successfully');
                await reloadUser(auth, phoneNumber, type)
            } else {
                console.log('Error in deleting');
            }
        }
        catch (e) {
            console.log("Couldn't delete the menu item", e);
        } finally {
            setLoader(false);
        }
    }

    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={handleClick}
            >
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',

                    }}>
                        <Text style={styles.price}>Price: Rs.{item.price}</Text>
                        <View style={styles.ratingContainer}>
                            <Icon name='star-rate' size={20} color='#e46c47' />
                            <Text style={styles.rating}>{item.rating}</Text>
                        </View>
                        <View></View>
                    </View>
                </View>
                <Image source={{ uri: item.img || altImage }} style={styles.image} />
            </TouchableOpacity>

            {menuOptionsVisible === item._id && (
                <Animated.View
                    style={[
                        {
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginVertical: 10,
                        },
                        {
                            opacity: fadeAnim,
                        },
                    ]}
                >
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}
                        onPress={() => handleMenuDelete(item._id, auth, phoneNumber, type)}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
            <Divider
                width={0.5}
                orientation='horizontal'
                color='#e46c47'
                style={{ marginVertical: 10 }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    detailsContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 16,
        color: '#666',
    },
    button: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        width: '40%',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MenuItem;
