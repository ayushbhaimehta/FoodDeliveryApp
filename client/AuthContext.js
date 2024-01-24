import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    phoneNumber: null,
    setPhoneNumber: null
})

export const AuthProvider = ({ children }) => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const value = {
        phoneNumber,
        setPhoneNumber
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