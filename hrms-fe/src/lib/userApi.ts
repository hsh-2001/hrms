import type { ILoginRequest, IRegisterRequest } from "../types/auth";
import api from "./api";

export const login = async (user: ILoginRequest) => {
    const response = await api.post("/user/login", user);
    return response.data;
};

export const register = async (user: IRegisterRequest) => {
    const response = await api.post("/user/register", user);
    return response.data;
}

export const getAllUsers = async () => {
    const response = await api.get("/user/all");
    return response.data;
}