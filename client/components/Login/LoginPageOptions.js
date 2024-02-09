import { Image, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../../features/context/AuthContext'

const LoginPageOptions = ({ logoUrl, text, desc, accType }) => {

    const { setType } = useAuth();
    return (
        <View className="flex-row items-center w-[100%] h-10" onTouchEnd={() => setType(accType)}>
            <Image
                source={{
                    uri: logoUrl
                }}
                style={{
                    width: 25,
                    height: 25
                }}
            />
            <Text className="text-md font-bold mx-3">
                {text}
                {desc &&
                    <Text className="text-xs font-light">
                        {"\n" + desc}
                    </Text>
                }
            </Text>
            <Image
                source={{
                    uri: "https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png"
                }}
                style={{
                    width: 20,
                    height: 20,
                    position: "absolute",
                    right: 10
                }}
            />
        </View>
    )
}

export default LoginPageOptions
