import type { GetCompanyOverviewResponse, IGetCompanySettingResponse, IUpdateCompanySetting } from "../types/settings";
import api from "./api";
import { BaseResponse, getResponse } from "./baseReponse";

const getCompanySettings = async (): Promise<BaseResponse<IGetCompanySettingResponse>> => {
    const response = await api.get(`/setting/company`);
    return getResponse(response.data);
}

const updateCompanySettings = async (data: IUpdateCompanySetting): Promise<BaseResponse> => {
    const response = await api.put(`/setting/company`, data);
    return getResponse(response.data);
}

const getCompanyOverview = async (): Promise<BaseResponse<GetCompanyOverviewResponse>> => {
    const response = await api.get(`/setting/company/overview`);
    return getResponse(response.data);
}

export default {
    getCompanySettings,
    updateCompanySettings,
    getCompanyOverview,
}