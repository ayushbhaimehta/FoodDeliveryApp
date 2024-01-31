import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    phoneNumber: null,
    setPhoneNumber: null,
    auth: null,
    setAuth: null,
    userAdd: false,
    setUserAdd: null
})

export const AuthProvider = ({ children }) => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [auth, setAuth] = useState("");
    const [userAdd, setUserAdd] = useState(false);
    const value = {
        phoneNumber,
        setPhoneNumber,
        auth,
        setAuth,
        userAdd,
        setUserAdd
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