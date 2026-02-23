import type { ICreateDepartmentRequest, IGetDepartmentResponse } from "../types/department";
import api from "./api";
import type { BaseResponse } from "./baseReponse";

const createDepartment = async (request: ICreateDepartmentRequest): Promise<BaseResponse<IGetDepartmentResponse>> => {
    const result = await api.post("/department", request);
    return result.data;
}

const getDepartmentById = async (id: number): Promise<BaseResponse<IGetDepartmentResponse>> => {
    const result = await api.get(`/department/${id}`);
    return result.data;
}

const getAllDepartments = async (): Promise<BaseResponse<IGetDepartmentResponse[]>> => {
    const result = await api.get("/department");
    return result.data;
}

const updateDepartment = async (id: number, request: ICreateDepartmentRequest): Promise<BaseResponse<IGetDepartmentResponse>> => {
    const result = await api.put(`/department/${id}`, request);
    return result.data;
}

export default {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
}