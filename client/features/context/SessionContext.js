import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useLoader } from './LoaderContext';
import { useAuth } from './AuthContext';
// Save token to AsyncStorage
const saveToken = async (token, phone, type) => {
    try {
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('phone', phone);
        await AsyncStorage.setItem('type', type);
    } catch (e) {
        console.log('Error saving token:', e);
    }
};

// Retrieve token from AsyncStorage
const getToken = async () => {
    try {
        const auth = await AsyncStorage.getItem('authToken');
        const phone = await AsyncStorage.getItem('phone');
        const type = await AsyncStorage.getItem('type');
        return [auth, phone, type];
    } catch (e) {
        console.log('Error getting token:', e);
    }
};

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { setLoader } = useLoader();
    let userFetched = false;

    //Fetch user
    const getUser = async (phoneNumber, auth, type) => {
        setLoader(true)
        console.log("User Loading...", type);
        if (type === "user") {
            try {
                const res = await axios.get(`${process.env.BASE_URL}/user/getbyphone/${phoneNumber}`, {
                    headers: {
                        auth: auth,
                        "Content-Type": 'application/json'
                    }
                });
                // console.log(res.data.result);
                if (res.status === 200) {
                    setUser(res.data.result);
                    userFetched = true;
                } else {
                    console.log("Non-200 status code:", res.status);
                }
            } catch (err) {
                console.log("Error:", err);
            } finally {
                setLoader(false);
            }
        }
        else if (type === "restaurant") {
            try {
                const res = await axios.get(`${process.env.BASE_URL}/restaurant/getbyphone/${phoneNumber}`, {
                    headers: {
                        auth: auth,
                        "Content-Type": 'application/json'
                    }
                });

                // console.log(res.status);
                if (res.status === 200) {
                    setUser(res.data.result);
                    userFetched = true;
                } else {
                    console.log("Non-200 status code:", res.status);
                }
            } catch (err) {
                console.log("Error:", err);
            } finally {
                setLoader(false);
            }
        }
        else {
            try {
                const res = await axios.get(`${process.env.BASE_URL}/driver/getbyphone/${phoneNumber}`, {
                    headers: {
                        auth: auth,
                        "Content-Type": 'application/json'
                    }
                });
                // console.log(res.data.result);
                if (res.status === 200) {
                    setUser(res.data.result);
                    userFetched = true;
                } else {
                    console.log("Non-200 status code:", res.status);
                }
            } catch (err) {
                console.log("Error:", err);
            } finally {
                setLoader(false);
            }
        }
    }

    const { setAuth, setPhoneNumber, setUserAdd, setType } = useAuth()

    //Fetch user on Load
    useEffect(() => {
        const checkToken = async () => {
            const [auth, phone, type] = await getToken();
            if (auth) {
                console.log("Token Found!");
                await getUser(phone, auth, type);
                if (userFetched) {
                    console.log("User Fetched!");
                    setAuth(auth);
                    setPhoneNumber(phone);
                    setType(type);
                    setUserAdd(true)
                }
            }
        };

        checkToken();
    }, []);
    const login = async (auth, phone, type) => {
        setLoader(true)
        await saveToken(auth, phone, type);
        await getUser(phone, auth, type);
        setLoader(false)
    };
    const reloadUser = async (auth, phone, type) => {
        if (auth) {
            setLoader(true);
            console.log("Token Found!");
            await getUser(phone, auth, type);
            setLoader(false);
        }
    }
    const logout = async () => {
        // Remove token from storage
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('phone');
        await AsyncStorage.removeItem('type');
        setUser(null);
        setUserAdd(false);

    };

    return (
        <SessionContext.Provider value={{ user, login, logout, reloadUser }}>
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