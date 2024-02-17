import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    FlatList,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const FetchRecent = ({ setSelectedImage }) => {
    const [recentPhotos, setRecentPhotos] = useState([]);

    useEffect(() => {
        fetchRecentPhotos();
    }, []);

    const fetchRecentPhotos = async () => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();

            if (status !== 'granted') {
                console.error('Permission to access media library denied');
                return;
            }

            const result = await MediaLibrary.getAssetsAsync({
                first: 10, // You can adjust the number of recent photos you want to fetch
            });

            setRecentPhotos(result.assets);
        } catch (error) {
            console.error('Error fetching recent photos:', error);
        }
    };
    const renderImageItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.imageContainer} onPress={() => {
                setSelectedImage(item.uri)
            }}>
                <Image source={{ uri: item.uri }} style={styles.image} />
            </TouchableOpacity>
        )
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Photos</Text>
            <ScrollView horizontal>
                <View style={{
                    height: 200,
                    flex: 1
                }}>
                    <FlatList
                        data={recentPhotos.slice(1)}
                        renderItem={renderImageItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#121212'

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    imageContainer: {
        margin: 5,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 5
    },
});

export default FetchRecent;
