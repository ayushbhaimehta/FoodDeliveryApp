import React, { useState } from 'react';
import { Divider } from 'react-native-elements';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSession } from '../../features/context/SessionContext'

const Settings = () => {
    const { logout } = useSession();
    const [activeTab, setActiveTab] = useState('');
    return (
        <View style={styles.container}>
            {/* Profile Section */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle,
                {
                    fontWeight: activeTab === 'profile' ? 'bold' : 'normal',
                }
                ]}
                    onPress={() => setActiveTab('profile')}
                >Profile</Text>
                {activeTab === 'profile' && <>
                    <TouchableOpacity style={styles.option}>
                        <Text style={styles.optionText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <Text style={styles.optionText}>Change Password</Text>
                    </TouchableOpacity>
                </>}
            </View>
            {/* Notification Settings */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle,
                {
                    fontWeight: activeTab === 'noti' ? 'bold' : 'normal',
                }
                ]}
                    onPress={() => setActiveTab('noti')}
                >Notifications</Text>
                {activeTab === 'noti' && <>
                    <TouchableOpacity style={styles.option}>
                        <Text style={styles.optionText}>Enable Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <Text style={styles.optionText}>Notification Sound</Text>
                    </TouchableOpacity>
                </>
                }
            </View>
            {/* Language Settings */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle,
                {
                    fontWeight: activeTab === 'language' ? 'bold' : 'normal',
                }
                ]}
                    onPress={() => setActiveTab('language')}
                >Language</Text>
                {activeTab === 'language' && <>
                    <TouchableOpacity style={styles.option}>
                        <Text style={styles.optionText}>Select Language</Text>
                    </TouchableOpacity>
                </>
                }
            </View>

            {/* About */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle,
                {
                    fontWeight: activeTab === 'about' ? 'bold' : 'normal',
                }
                ]}
                    onPress={() => setActiveTab('about')}
                >About</Text>
                {activeTab === 'about' && <><TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>App Version</Text>
                </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <Text style={styles.optionText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <Text style={styles.optionText}>Terms of Service</Text>
                    </TouchableOpacity>
                </>}
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton}
                onPress={() => logout()}
            >

                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
        borderBottomWidth: 0.5
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 15,
    },
    option: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    optionText: {
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#e46c47',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Settings;
