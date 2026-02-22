import { useState } from "react";
import type { ILoginRequest, IRegisterRequest } from "../types/auth";
import { login } from "../lib/userApi";

export default function useAuthentication() {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [loginModel, setLoginModel] = useState<ILoginRequest>({
        username: "",
        password: "",
    });

    const [registerModel, setRegisterModel] = useState<IRegisterRequest>({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
    });

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await login(loginModel);
            if (response) {
                localStorage.setItem("token", response.data.token);
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Register Model", registerModel);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isLogin) {
            await handleLogin(e);
        } 
        else {
            await handleRegister(e);
        }
    }; 

    return {
        loginModel,
        setLoginModel,
        handleSubmit,
        isLogin,
        setIsLogin,
        registerModel,
        setRegisterModel,
    }
};