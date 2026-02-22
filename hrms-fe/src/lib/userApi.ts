import type { ILoginRequest, IRegisterRequest } from "../types/auth";
import type { ICompanyUser } from "../types/user";
import api from "./api";
import type { ApiResponse } from "./baseReponse";

export const login = async (user: ILoginRequest) => {
    const response = await api.post("/user/login", user);
    return response.data;
};

export const register = async (user: IRegisterRequest) => {
    const response = await api.post("/user/register", user);
    return response.data;
}

export const getAllUsers = async (): Promise<ApiResponse<ICompanyUser[]>> => {
    const response = await api.get(`/user/company-users`);
    return response.data;
}