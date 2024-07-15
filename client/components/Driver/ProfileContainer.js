import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import NotificationIcon from './NotificationIcon'
import { useSession } from '../../features/context/SessionContext'

const ProfileContainer = ({ active }) => {
    const { user } = useSession()
    return (
        <View style={styles.profileContainer}>
            <NotificationIcon />
            <Image
                source={{
                    uri: 'https://randomuser.me/api/portraits/men/85.jpg',
                }}
                style={styles.profilePicture(active)}
            />
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileInfo}>{`+91-` + user?.phoneNo + '  • ' + user?.email[0].toUpperCase() + user?.email.substr(1)}</Text>
        </View>
    )
}

export default ProfileContainer

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#e46c47'
    },
    profilePicture: (active) => ({
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: active ? 5 : 0,
        borderColor: 'green',
    }),
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    profileInfo: {
        fontSize: 16,
        marginTop: 5,
        color: 'white',
    },
})