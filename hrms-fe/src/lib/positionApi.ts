import type { ICreatePositionRequest, IGetPositionsResponse } from "../types/position";
import api from "./api";
import { BaseResponse, getResponse } from "./baseReponse";

const createPosition = async (request: ICreatePositionRequest): Promise<BaseResponse<IGetPositionsResponse>> => {
    const response = await api.post("/positions", request);
    return getResponse(response.data);
}

const getAllPositions = async (): Promise<BaseResponse<IGetPositionsResponse[]>> => {
    const response = await api.get("/position");
    return getResponse(response.data);
}

const updatePosition = async (id: number, request: ICreatePositionRequest): Promise<BaseResponse<IGetPositionsResponse>> => { 
    const response = await api.put(`/position/${id}`, request);
    return getResponse(response.data);
}

export default {
    createPosition,
    getAllPositions,
    updatePosition,
}