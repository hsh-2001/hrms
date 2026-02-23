import type { ICreateEmployee, IGetEmployeesResponse } from "../types/employees";
import api from "./api";
import { BaseResponse, getResponse } from "./baseReponse";


const createEmployee = async (request: ICreateEmployee): Promise<BaseResponse> => {
    const result = await api.post("/employee", request);
    return getResponse(result.data);
};

const getAllEmployees = async (): Promise<BaseResponse<IGetEmployeesResponse[]>> => {
    const result = await api.get("/employee");
    return getResponse(result.data);
}


export default {
    createEmployee,
    getAllEmployees,
}