import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';
import FetchRecent from './FetchRecent';
import useUploadMedia from '../../features/hook/useUploadMedia';
import Loader from './Loader';
import { useLoader } from '../../features/context/LoaderContext';

const UploadScreen = ({ navigation, setImgUrl, setUploadPage }) => {
    const [cameraSide, setCameraSide] = useState(Camera.Constants.Type.back);
    const [camera, setCamera] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const { uploadMedia } = useUploadMedia()
    const { setLoader } = useLoader()

    const requestPermissions = async () => {
        try {
            const storagePermissionStatus = await AsyncStorage.getItem('storagePermission');
            const cameraPermissionStatus = await AsyncStorage.getItem('cameraPermission');
            if (cameraPermissionStatus !== 'granted') {
                const { status: cameraPermission } = await ImagePicker.requestCameraPermissionsAsync();
                if (cameraPermission === 'granted') {
                    await AsyncStorage.setItem('cameraPermission', 'granted');
                } else {
                    Alert.alert("Camera access denied", "Kindly provide camera access to click a picture!!")
                }
            }

            if (storagePermissionStatus !== 'granted') {
                const { status: storagePermission } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (storagePermission === 'granted') {
                    await AsyncStorage.setItem('storagePermission', 'granted');
                } else {
                    Alert.alert("Media access denied", "Kindly provide Media access to upload a post!")
                }
            }
            if (cameraPermissionStatus !== 'granted' && storagePermissionStatus !== 'granted') {
                Alert.alert("Access denied", "Ig can not access camera or media. \n Please Give the access to upload a post.")

            }
        } catch (error) {
            Alert.alert("Error", error + "Please try Again!")

        }
    };

    const handFlip = () => {
        if (cameraSide === Camera.Constants.Type.back) {
            setCameraSide(Camera.Constants.Type.front);
        }
        else {
            setCameraSide(Camera.Constants.Type.back);
        }
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };
    const takePhoto = async () => {
        if (camera) {
            const photo = await camera.takePictureAsync();
            setSelectedImage(photo.uri);
        }
    };
    const uploadImage = async (selectedImage, bucket) => {
        if (selectedImage) {
            const img = await uploadMedia(selectedImage, bucket);
            setImgUrl(img);
            setUploadPage(false);
            setLoader(false)

        }
    }
    useEffect(() => {
        setLoader(true);
        requestPermissions();
        uploadImage(selectedImage, 'menuImage');
        setLoader(false)
    }, [selectedImage])

    return (

        <View style={styles.container}>
            <View className="items-center">
                <Text style={styles.title}>Choose or Take a Photo</Text>

                <Camera
                    style={[styles.cameraPreview, {
                        borderRadius: 50
                    }]}
                    type={cameraSide}
                    ref={(ref) => setCamera(ref)}
                >
                    <Loader />
                    <View onTouchEnd={handFlip}>
                        <Image source={{ uri: 'https://img.icons8.com/sf-black/64/FFFFFF/change.png' }}
                            style={{
                                width: 50,
                                height: 50,
                                zIndex: 999,
                                backgroundColor: 'black',
                                borderRadius: 10,
                                padding: 10,
                                borderColor: 'white',
                                borderWidth: 2
                            }}
                        />
                    </View>

                </Camera>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>Gallery</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.button} onPress={takePhoto}>
                        <Text style={styles.buttonText}>Take a Photo</Text>
                    </TouchableOpacity>
                </View>
                <FetchRecent setSelectedImage={setSelectedImage} />
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginVertical: 10
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        width: '40%',
        overflow: 'hidden'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    cameraPreview: {
        width: 350,
        height: 450,
        alignItems: 'flex-end'

    },
});

export default UploadScreen;
