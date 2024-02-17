import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Divider, Icon } from 'react-native-elements';

const MenuItem = ({ item, setMenuOptionsVisible, menuOptionsVisible }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

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
                <Image source={{ uri: item.img }} style={styles.image} />
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
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}>
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
