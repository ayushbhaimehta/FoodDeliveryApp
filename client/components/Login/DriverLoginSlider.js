import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, Animated } from 'react-native';

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        { id: 1, uri: 'https://firebasestorage.googleapis.com/v0/b/food-delivery-app-2a7d6.appspot.com/o/data%2Fslide1.jpeg?alt=media&token=52201b0e-e452-4d0e-bf54-a3fcc9b6cdaf' },
        { id: 2, uri: 'https://firebasestorage.googleapis.com/v0/b/food-delivery-app-2a7d6.appspot.com/o/data%2Fslide2.jpeg?alt=media&token=26f0818e-ce83-4e05-a719-0b8a9222a913' },
        { id: 3, uri: 'https://firebasestorage.googleapis.com/v0/b/food-delivery-app-2a7d6.appspot.com/o/data%2Fslide3.jpeg?alt=media&token=4c314500-55bd-4fca-9e83-d66b0b5baf00' },
        { id: 4, uri: 'https://firebasestorage.googleapis.com/v0/b/food-delivery-app-2a7d6.appspot.com/o/data%2Fslide4.jpeg?alt=media&token=51438a30-57f9-4151-b209-793e8f06c1be' }
    ];
    const flatListRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % images.length;
            setCurrentIndex(nextIndex);
            flatListRef.current.scrollToIndex({ index: nextIndex });
        }, 5000);

        return () => clearInterval(timer);
    }, [currentIndex]);

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item.uri }}
                        style={{ width: Dimensions.get('window').width, height: 600, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
                        resizeMode="cover"
                    />
                )}
                onMomentumScrollEnd={(event) => {
                    const contentOffsetX = event.nativeEvent.contentOffset.x;
                    const index = Math.floor(contentOffsetX / Dimensions.get('window').width);
                    setCurrentIndex(index);
                }}
            />
            <View style={styles.dotsContainer}>
                {images.map((_, index) => (
                    <Animated.View key={index} style={[styles.dot,
                    index === currentIndex && styles.activeDot
                    ]} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 10
    },
    dot: {
        width: "22%",
        height: 5,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#e46c47', // Change color as needed
    },
});

export default Slider;
