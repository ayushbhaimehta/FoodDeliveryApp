import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import UploadScreen from '../../Global/ImageAdder';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLoader } from '../../../features/context/LoaderContext';
import axios from 'axios';
import Loader from '../../Global/Loader';
import { useAuth } from '../../../features/context/AuthContext';
import { useSession } from '../../../features/context/SessionContext';

const AddNewItemPage = ({ navigation }) => {
    const [imageUrl, setImageUrl] = useState(null)
    const { auth, phoneNumber, type } = useAuth()
    const { user, reloadUser } = useSession()
    const [uploadPage, setUploadPage] = useState(false)
    const { setLoader } = useLoader()
    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        price: '',
    });
    const handleAddNewItem = async () => {

        if (!newItem.name || !newItem.description || !newItem.price) {
            alert('Please fill out all fields.');
            return;
        }
        for (let i in user?.menu) {
            console.log(i);
            if (user?.menu[i].name.toLowerCase().trim() === newItem.name.toLowerCase().trim()) {
                alert('Item already exists.');
                return;
            }
        }
        setLoader(true);
        try {
            const res = await axios.post(`${process.env.BASE_URL}/restaurant/addMenu`, {
                "menu": [{
                    "name": newItem.name,
                    "description": newItem.description,
                    "price": newItem.price,
                    "img": imageUrl,
                    "rating": '5.0'
                }]
            },
                {
                    headers: {
                        auth: auth,
                        "Content-Type": 'application/json'
                    }
                })

            console.log(res.data);
            if (res.status === 200) {
                alert('Item added successfully!');
                navigation.pop();
            } else {
                alert('Error adding item.');
            }


        } catch (err) {
            console.log("Error", err);
        } finally {
            setLoader(false)
        }

        setNewItem({
            name: '',
            description: '',
            price: '',
        });
        setImageUrl(null)
        await reloadUser(auth, phoneNumber, type);
        navigation.navigate('MenuPage')
    };

    return (
        <SafeAreaView className="flex-1">
            <Loader />
            {uploadPage ?
                <UploadScreen
                    navigation={navigation}
                    setImgUrl={setImageUrl}
                    setUploadPage={setUploadPage}
                />
                :
                <View style={styles.container}>
                    <Text style={styles.title}>Add New Item to Menu</Text>
                    <TextInput
                        placeholder="Name"
                        value={newItem.name}
                        onChangeText={(text) => setNewItem({ ...newItem, name: text })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Description"
                        value={newItem.description}
                        onChangeText={(text) => setNewItem({ ...newItem, description: text })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Price"
                        value={newItem.price}
                        onChangeText={(text) => setNewItem({ ...newItem, price: text })}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    {imageUrl !== null ?
                        <Button title="Add Item" onPress={handleAddNewItem} />
                        :
                        <Button title="Upload Image" onPress={() => setUploadPage(true)} />}
                </View>
            }
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
});

export default AddNewItemPage;
