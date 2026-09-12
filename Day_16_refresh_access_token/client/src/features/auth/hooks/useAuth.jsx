import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { registerApi, meApi } from "../api/authApi"
import { authContext } from "../../../app/context/authContext"
import { useNavigate } from "react-router"

export const useAuth = () => {
    const navigate = useNavigate();

    const { setUser, accessToken, setAccessToken } = useContext(authContext);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const handleRegister = async (data) => {
        const res = await registerApi(data);
        setUser(res.data.user);
        setAccessToken(res.accessToken);

        console.log("Registration data:", res);
        reset()

        navigate("/profile")
    };

    const fetchProfile = async () => {
        const res = await meApi(accessToken, setAccessToken);
        setUser(res.data.user)
    }

    return {
        showPassword,
        setShowPassword,
        register,
        handleSubmit,
        errors,
        handleRegister,
        fetchProfile
    }
}