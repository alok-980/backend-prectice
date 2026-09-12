import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerApi } from "../api/authApi"
import { AuthProvider } from "../../../app/context/authContext"
import { useNavigate } from "react-router"

export const useAuth = () => {
    const navigate = useNavigate();

    const { setUser, setAccessToken } = AuthProvider();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const handleRegister = async (data) => {
        const res = await registerApi(data);
        setUser(res.user);
        setAccessToken(res.accessToken);

        console.log("Registration data:", res);
        reset()

        navigate("/profile")
    };

    return {
        showPassword,
        setShowPassword,
        register,
        handleSubmit,
        errors,
        handleRegister
    }
}