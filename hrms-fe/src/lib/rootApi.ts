import type { ICreateCompanyAccountRequest, IGetCompanyAccountResponse } from "../types/company";
import api from "./api"
import { BaseResponse, getResponse, type IApiResponse } from "./baseReponse";

const getAllCompanies = async (): Promise<IApiResponse<IGetCompanyAccountResponse[]>> => {
    const response = await api.get("/root/companies");
    return getResponse(response.data);
}

const createCompanyAccount = async (data: ICreateCompanyAccountRequest): Promise<IApiResponse<IGetCompanyAccountResponse>> => {
    const response = await api.post("/root/company", data);
    return getResponse(response.data);
}

const editCompanyAccount = async (id: number, request: ICreateCompanyAccountRequest): Promise<BaseResponse<IGetCompanyAccountResponse>> => {
    const response = await api.put(`/root/company/${id}`, request);
    return getResponse(response.data);
}

export default {
    getAllCompanies,
    createCompanyAccount,
    editCompanyAccount,
}