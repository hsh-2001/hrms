import type { ICreateCompanyAccountRequest, IGetCompanyAccountResponse } from "../types/company";
import api from "./api"
import type { IApiResponse } from "./baseReponse";

const getAllCompanies = async (): Promise<IApiResponse<IGetCompanyAccountResponse[]>> => {
    const response = await api.get("/root/companies");
    return response.data;
}

const createCompanyAccount = async (data: ICreateCompanyAccountRequest): Promise<IApiResponse<IGetCompanyAccountResponse>> => {
    const response = await api.post("/root/company", data);
    return response.data;
}

export default {
    getAllCompanies,
    createCompanyAccount,
}