import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSession } from '../../../features/context/SessionContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';

const Header = ({ navigation }) => {
    return (
        <View style={styles.Header}>
            <TouchableOpacity style={{
                borderRadius: 100,
            }}
                onPress={() => navigation.pop()}
            >
                <Image source={{ uri: "https://img.icons8.com/windows/96/0f0f0f/long-arrow-left.png" }}
                    style={{
                        width: 25,
                        height: 25,
                        resizeMode: "cover"
                    }}
                />
            </TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20 }}>ADDRESSES</Text>
        </View>
    );

}

const AddressScreen = ({ navigation }) => {
    const { user } = useSession()
    const savedAddresses = user?.address || []

    const handleEditAddress = (index) => {
        navigation.navigate('AddNewAddress', { edit: true, index });
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <ScrollView>
                <View className="h-16 justify-center px-4 bg-[#f0f0f0]">
                    <Text style={styles.title}>SAVED ADDRESSES</Text>
                </View>
                <View className="flex-1 px-2">
                    {
                        savedAddresses.map((item, index) => (
                            <View key={index} >
                                <View style={styles.addressItem}>
                                    <View className=" justify-start items-center flex h-16">
                                        {item.saveAs === "Home" ?
                                            <Icon name="home" type='feather' color='' size={24} />
                                            : item.saveAs === 'Work' ?
                                                <Icon name="work" type='material-icons' color='' size={24} />
                                                : item.saveAs === "Friends and Family" ? <Icon name="users" type='feather' color='' size={24} />
                                                    : <Icon name="location-pin" type='entypo' color='' size={24} />}
                                    </View>
                                    <View className="mx-2 w-full">
                                        <View>
                                            <Text style={styles.addressName}>{item.myself && item.saveAs !== "Other" ? item.saveAs : item.name}</Text>
                                            <Text style={styles.address} className="w-[95%]" numberOfLines={3}>{item.area}</Text>
                                            <Text style={styles.phone}>Phone number:  {item.phoneNo}</Text>
                                            <View className="flex-row justify-between w-[60%] mt-3">
                                                <TouchableOpacity onPress={() => handleEditAddress(index)}>
                                                    <Text style={styles.optionText}>
                                                        EDIT
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Text style={styles.optionText}>
                                                        DELETE
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Text style={styles.optionText}>
                                                        SHARE
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                                <View className="h-[0.7] bg-gray-400 my-4 ml-8" />
                            </View>
                        ))
                    }
                </View>


            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('AddNewAddress')}>
                    <Text style={styles.addnew}>
                        ADD NEW ADDRESS
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 15,
    },
    addressList: {
        flexGrow: 1,
    },
    addressItem: {
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
    },
    addressName: {
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 5,

    },
    address: {
        fontSize: 13,
        overflow: 'visible',
    },
    phone: {
        fontSize: 13,
        marginTop: 5,
    },
    optionText: {
        color: '#e46c47',
        fontWeight: 'bold',
        fontSize: 15
    },
    addnew: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'green',
    },
    footer: {
        borderTopWidth: 1,
        borderColor: '#ccc',
        padding: 15,
    },
    Header: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 0.2,
    }
});

export default AddressScreen;
