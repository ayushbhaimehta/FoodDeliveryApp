import { TouchableOpacity, Image } from 'react-native'
import React from 'react'

const BackButton = ({ navigateBack }) => {
    return (
        <TouchableOpacity style={{
            position: 'absolute',
            top: 50,
            left: 10,
            zIndex: 999,
            backgroundColor: 'white',
            borderRadius: 100
        }} >
            <Image source={{ uri: "https://img.icons8.com/windows/96/long-arrow-left.png" }}
                style={{
                    width: 32,
                    height: 32,
                }}
                onTouchEnd={navigateBack}
            />
        </TouchableOpacity>
    )
}

export default BackButton