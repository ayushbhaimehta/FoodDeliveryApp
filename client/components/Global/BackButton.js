import { TouchableOpacity, Image } from 'react-native'
import React from 'react'

const BackButton = ({ navigateBack }) => {
    return (
        <TouchableOpacity style={{
            backgroundColor: 'white',
            borderRadius: 100,
            width: 40,
            height: 40,
            top: 50,
            left: 10,
            zIndex: 40,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
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