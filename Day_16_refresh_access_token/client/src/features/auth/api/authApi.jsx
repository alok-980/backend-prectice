import { axiosInstance } from "../../../app/config/axiosInstance"

export const registerApi = async (data) => {
    try {
        const res = await axiosInstance.post("/auth/register", data)
        return res.data
    } catch(error) {
        console.error("Error registering user:", error)
        throw error
    }
}