import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
import { storage } from '../../firebase'; // Import Firebase storage

const useUploadMedia = () => {
    const [imageUrl, setImageUrl] = useState(null);

    const uploadMedia = async (selectedImage, bucket) => {
        try {
            const { uri } = await FileSystem.getInfoAsync(selectedImage);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new Error(`Network Request Failed`));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });

            const filename = selectedImage.substring(selectedImage.lastIndexOf('/') + 1);
            const ref = storage.ref(`/${bucket}`).child(filename);
            await ref.put(blob);

            const imgUrl = await storage.ref(`/${bucket}/${filename}`).getDownloadURL();
            setImageUrl(imgUrl);
            return imgUrl;
        } catch (error) {
            Alert.alert('Failed', `${error}\nUpload failed!!\nTry again.`);
        }
    };

    useEffect(() => {
        // Additional side effects or cleanup can be performed here
        // For example, if you want to reset the imageUrl after some time
        const timer = setTimeout(() => {
            setImageUrl(null);
        }, 5000);

        return () => clearTimeout(timer); // Cleanup when the component is unmounted
    }, [imageUrl]);

    return { imageUrl, uploadMedia };
};

export default useUploadMedia;
