import { useState } from "react";
import { useLocation } from "react-router";
import type { ILoginRequest, IRegisterRequest } from "../types/auth";
import { login, register } from "../lib/userApi";
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/slices/userSlice";
// import useNotification from "./useNotification";
import useMessage from "./useMessage";

export default function useAuthentication() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {
        message,
        addOneMessage,
    } = useMessage();
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
            const response = await login(loginModel);
            if (response.isSuccess) {
                dispatch(setCredentials({
                    user: response.data,
                    token: response.data.token,
                }));
                
                const navigateTo = String(response.data.role).toLowerCase() === 'employee' ? "/attendance/clock-in-out" : from;
                window.location.href = navigateTo;
            } else {
                addOneMessage(response.message || "Login failed");
            }
        } catch (error) {
            addOneMessage("Invalid username or password");            
            console.error("Login failed", error);
        }
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await register(registerModel);
            if (response) {
                setIsLogin(true);
                addOneMessage("Registration successful");
            }
        } catch (error) {
            addOneMessage("Registration failed");
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
        message,
    }
};