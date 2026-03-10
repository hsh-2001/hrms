import type { GetEmployeesResponse, ICreateEmployee } from "../types/employees";
import api from "./api";
import { BaseResponse, getResponse } from "./baseReponse";


const createEmployee = async (request: ICreateEmployee): Promise<BaseResponse> => {
    const result = await api.post("/employee", request);
    return getResponse(result.data);
};

const editEmployee = async (request: Partial<ICreateEmployee> & { id: string }): Promise<BaseResponse> => {
    const result = await api.put(`/employee`, request);
    return getResponse(result.data);
}

const getAllEmployees = async (query?: { page?: number; limit?: number }): Promise<BaseResponse<GetEmployeesResponse[]>> => {
    const result = await api.get("/employee", { params: query });
    return getResponse(result.data);
}

const getEmployeeFuzzySearch = async (search: string): Promise<BaseResponse<GetEmployeesResponse[]>> => {
    const result = await api.get("/employee/fuzzy-search", { params: {  search } });
    return getResponse(result.data);
}


export default {
    createEmployee,
    getAllEmployees,
    editEmployee,
    getEmployeeFuzzySearch,
}