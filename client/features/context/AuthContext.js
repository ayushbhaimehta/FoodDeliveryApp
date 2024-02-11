import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    phoneNumber: null,
    setPhoneNumber: null,
    auth: null,
    setAuth: null,
    userAdd: false,
    setUserAdd: null,
    type: null,
    setType: null,
})

export const AuthProvider = ({ children }) => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [auth, setAuth] = useState("");
    const [userAdd, setUserAdd] = useState(false);
    const [type, setType] = useState('user')
    const value = {
        phoneNumber,
        setPhoneNumber,
        auth,
        setAuth,
        userAdd,
        setUserAdd,
        type,
        setType
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}