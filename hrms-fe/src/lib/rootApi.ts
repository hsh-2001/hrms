import type { ICreateCompanyAccountRequest, IGetCompanyAccountResponse } from "../types/company";
import api from "./api"
import type { ApiResponse } from "./baseReponse";

const getAllCompanies = async (): Promise<ApiResponse<IGetCompanyAccountResponse[]>> => {
    const response = await api.get("/root/companies");
    return response.data;
}

const createCompanyAccount = async (data: ICreateCompanyAccountRequest): Promise<ApiResponse<IGetCompanyAccountResponse>> => {
    const response = await api.post("/root/company", data);
    return response.data;
}

export default {
    getAllCompanies,
    createCompanyAccount,
}