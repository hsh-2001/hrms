import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import type { ILoginRequest, IRegisterRequest } from "../types/auth";
import { login, register } from "../lib/userApi";
import { useAppDispatch } from "../store/hooks";
import { setCredentials, setLoading } from "../store/slices/userSlice";
import useNotification from "./useNotification";

export default function useAuthentication() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { addNotification } = useNotification();
    const from = location.state?.from?.pathname || "/";

    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [loginModel, setLoginModel] = useState<ILoginRequest>({
        username: "",
        password: "",
    });

    const [registerModel, setRegisterModel] = useState<IRegisterRequest>({
        username: "",
        password: "",
        company_id: 1,
        confirmPassword: "",
        email: "",
        phone: "",
    });

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // dispatch(setLoading(true));
            const response = await login(loginModel);
            console.log("Login model:", response.data);
            if (response.isSuccess) {
                dispatch(setCredentials({
                    user: response.data,
                    token: response.data.token,
                }));
                
                const navigateTo = String(response.data.role).toLowerCase() === 'employee' ? "/attendance/clock-in-out" : from;
                // Use window.location for full page reload to ensure loaders get fresh localStorage data
                window.location.href = navigateTo;
            } else {
                addNotification("Login failed");
            }
        } catch (error) {
            addNotification("Login failed");
            console.error("Login failed", error);
        } finally {
            // dispatch(setLoading(false));
        }
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await register(registerModel);
            if (response) {
                setIsLogin(true);
            }
        } catch (error) {
            console.error("Registration failed", error);
        }
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