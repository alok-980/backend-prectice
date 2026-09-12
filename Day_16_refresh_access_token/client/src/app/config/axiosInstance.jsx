import axios from "axios"

export const axiosInstance = (accessToken, setAccessToken) => {
    const api = axios.create({
        baseURL: "http://localhost:5173/api",
        withCredentials: true,
    })

    api.interceptors.request.use(config => {
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
        return config
    })

    api.interceptors.response.use(
        response => response,
        async error => {
            if (error.response?.status === 401) {
                const res = await axios.post("http://localhost:5173/api/auth/refresh", {}, { withCredentials: true })
                setAccessToken(res.data.accessToken)
                error.config.headers.Authorization = `Bearer ${res.data.accessToken}`
                return axios(error.config)
            }
            return Promise.reject(error)
        }
    )

    return api
}