import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save token to AsyncStorage
const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem('authToken', token);
    } catch (e) {
        console.log('Error saving token:', e);
    }
};

// Retrieve token from AsyncStorage
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        return token;
    } catch (e) {
        console.log('Error getting token:', e);
    }
};

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check for stored token on app start
    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token) {
                // Fetch user data using the token and set the user state
                // For example, make an API request to get user details
                // setUser(api.getUserDetails(token));
            }
        };

        checkToken();
    }, []);

    const login = async (token) => {
        // Save token to storage
        await saveToken(token);

        // Fetch user data using the token and set the user state
        // setUser(api.getUserDetails(token));
    };

    const logout = async () => {
        // Remove token from storage
        await AsyncStorage.removeItem('authToken');
        setUser(null);
    };

    return (
        <SessionContext.Provider value={{ user, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};

const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
};

export { SessionProvider, useSession };