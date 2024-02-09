import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, Animated } from 'react-native';

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        { id: 1, uri: 'https://via.placeholder.com/600/92c952' },
        { id: 2, uri: 'https://via.placeholder.com/600/771796' },
        { id: 3, uri: 'https://via.placeholder.com/600/24f355' },
        { id: 4, uri: 'https://via.placeholder.com/600/d32776' }
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
                        style={{ width: Dimensions.get('window').width, height: 600 }}
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
