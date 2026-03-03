import type { GetLeaveRequestResponse, ICreateLeaveRequest, ILeaveType } from "../types/leave";
import api from "./api";
import { getResponse, type BaseResponse } from "./baseReponse";

const getAllLeaveTypes = async (): Promise<BaseResponse<ILeaveType[]>> => {
    const result = await api.get("/leave/types");
    return getResponse(result.data);
}

const AddLeaveRequest = async (request: ICreateLeaveRequest): Promise<BaseResponse> => {
    const result = await api.post("/leave/requests", request);
    return getResponse(result.data);
}

const getAllLeaveRequests = async (): Promise<BaseResponse<GetLeaveRequestResponse[]>> => {
    const result = await api.get("/leave/requests");
    return getResponse(result.data);
}

export default {
    getAllLeaveTypes,
    AddLeaveRequest,
    getAllLeaveRequests,
}