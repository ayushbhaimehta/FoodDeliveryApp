import React, { createContext, useState, useContext } from "react";
export const LoaderContext = createContext({
    loader: null,
    setLoader: React.SetStateAction
})


export const LoaderContextProvider = ({ children }) => {
    const [loader, setLoader] = useState(false);

    const value = {
        loader,
        setLoader
    }
    return (
        <LoaderContext.Provider value={value}>
            {children}
        </LoaderContext.Provider>
    )
}

export const useLoader = () => {
    const context = useContext(LoaderContext)
    if (!context) {
        throw Error("Loader must be used inside an LoaderContextProvider")
    }
    return context
}