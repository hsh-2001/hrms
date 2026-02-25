import type { IAttendance, ICreateAttendanceRequest } from "../types/attendance";
import api from "./api";
import { getResponse, type BaseResponse } from "./baseReponse";

const checkAttendance = async (request: ICreateAttendanceRequest): Promise<BaseResponse> => {
    const response = await api.post("/attendance/check", request);
    return getResponse(response.data);
}

const getAllAttendances = async (): Promise<BaseResponse<IAttendance[]>> => {
    const response = await api.get("/attendance");
    return getResponse(response.data);
}

const getAttendanceByEmployeeId = async (employeeId: string): Promise<BaseResponse<IAttendance[]>> => {
    const response = await api.get(`/attendance/employee/${employeeId}`);
    return getResponse(response.data);
}
const getTodayAttendanceByEmployeeId = async (employeeId: string): Promise<BaseResponse<IAttendance>> => {
    const response = await api.get(`/attendance/employee/${employeeId}/today`);
    return getResponse(response.data);
}

export default {
    checkAttendance,
    getAllAttendances,
    getAttendanceByEmployeeId,
    getTodayAttendanceByEmployeeId,
};