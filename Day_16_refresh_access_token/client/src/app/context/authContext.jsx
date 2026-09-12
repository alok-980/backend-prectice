import { createContext, useState } from "react";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [accessToken, setAccessToken] = useState(null)
    const [loading, setLoading] = useState(true)

    return (
        <authContext.Provider value={{ user, setUser, accessToken, setAccessToken, loading, setLoading }}>
            {children}
        </authContext.Provider>
    )
}