import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useSession } from '../../features/context/SessionContext';
import RestaurantMenuIcon from './RestaurantMenuIcon';
import Icon from 'react-native-vector-icons/MaterialIcons'

const Header = ({ navigation }) => {
    const { user } = useSession();

    return (
        <View style={styles.Header}>
            <Text style={styles.headerText}>Welcome, {user?.restaurantName}</Text>
            <RestaurantMenuIcon navigation={navigation} />
        </View>
    );

}

const RestaurantInfo = ({ navigation }) => {
    const { user } = useSession();

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <Image source={{ uri: user?.img }} style={styles.image} />
            <View style={styles.addressContainer}>
                <View className="flex-row justify-between">
                    <Text style={styles.name}>
                        {user?.restaurantName}
                    </Text>
                    <Text style={styles.name}>
                        <Icon name='star-rate' size={20} color='#e46c47' style={{}} />
                        4.2
                    </Text>
                </View>

                <Text style={styles.address}>{user?.address.area}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: Dimensions.get('window').width - 40,
        height: 200,
        marginRight: 20,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    address: {
        fontSize: 16,
    },
    addressContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    Header: {
        backgroundColor: '#e47c45',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default RestaurantInfo;
