import { axiosInstance } from "../../../app/config/axiosInstance"

export const registerApi = async (data) => {
    try {
        const api = axiosInstance()
        const res = await api.post("/auth/register", data)
        return res.data
    } catch (error) {
        console.error("Error registering user:", error)
        throw error
    }
}

export const meApi = async (accessToken, setAccessToken) => {
    try {
        const api = axiosInstance(accessToken, setAccessToken)
        const res = await api.get("/auth/me")
        return res.data
    } catch (error) {
        console.error("Error fetching user data:", error)
        throw error
    }
}