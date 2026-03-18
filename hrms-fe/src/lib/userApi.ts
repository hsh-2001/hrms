import type { ILoginRequest, IRegisterRequest } from "../types/auth";
import type { IOrderBy } from "../types/base";
import type { ICompanyUser } from "../types/user";
import api from "./api";
import { BaseResponse, getResponse } from "./baseReponse";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = async (user: ILoginRequest): Promise<BaseResponse<any>> => {
    const response = await api.post("/user/login", user);
    return getResponse(response.data);
};

export const register = async (user: IRegisterRequest): Promise<BaseResponse> => {
    const response = await api.post("/user/register", user);
    return getResponse(response.data);
}

export const getAllUsers = async (param: { page: number; limit: number } & IOrderBy): Promise<BaseResponse<ICompanyUser[]>> => {
    const response = await api.get(`/user/company-users`, { params: param });
    return getResponse(response.data);
}

export const resetPassword = async (user_id: string, password: string): Promise<BaseResponse> => {
    const response = await api.post(`/user/reset-password`, { user_id, password });
    return getResponse(response.data);
}