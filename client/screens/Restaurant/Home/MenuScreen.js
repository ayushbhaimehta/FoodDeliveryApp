import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DummyMenu } from '../../../data/RestaurantDummyMenu';
import MenuItem from '../../../components/Restaurant/Menu/MenuItem';
import RestaurantMenuIcon from '../../../components/Restaurant/RestaurantHome/RestaurantMenuIcon';
import { Icon } from 'react-native-elements';
import FloatingAddButton from '../../../components/Restaurant/Menu/AddButton';
import { useSession } from '../../../features/context/SessionContext';

const MenuScreen = ({ navigation }) => {

    const [menuOptionsVisible, setMenuOptionsVisible] = useState(null);
    const { user } = useSession()

    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        price: '',
    });

    const handleAddNewItem = () => {
        navigation.push('AddNew');
    };



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                backgroundColor: '#c46e47',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 20
            }}>
                <TouchableOpacity style={{
                    borderRadius: 100,
                }}
                    onPress={() => navigation.pop()}
                >
                    <Image source={{ uri: "https://img.icons8.com/windows/96/ffffff/long-arrow-left.png" }}
                        style={{
                            width: 32,
                            height: 32,
                            resizeMode: "cover"
                        }}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 25, fontWeight: '700', color: 'white' }}>Menu</Text>
                <View>

                </View>
            </View>
            <View className="px-2">
                <ScrollView style={{
                    marginBottom: 65
                }}>
                    {user?.menu.map((item) => (
                        <MenuItem key={item._id} item={item}
                            menuOptionsVisible={menuOptionsVisible}
                            setMenuOptionsVisible={setMenuOptionsVisible}
                        />
                    ))}
                </ScrollView>
            </View>
            <FloatingAddButton
                onPress={handleAddNewItem}
            />
        </SafeAreaView>
    );
};

export default MenuScreen;
