import type { IGetRolesAndPermissionsResponse, IUpdatePermissionRRequestByRole } from "../types/permission";
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

const getRolesAndPermissions = async (): Promise<BaseResponse<IGetRolesAndPermissionsResponse[]>> => {
    const response = await api.get(`/setting/company/roles-permissions`);
    return getResponse(response.data);
}

const updateRolesAndPermissions = async (data: IUpdatePermissionRRequestByRole): Promise<BaseResponse> => {
    const response = await api.put(`/setting/company/roles-permissions`, data);
    return getResponse(response.data);
}

const updateUserRole = async (user_id: number, role_id: number): Promise<BaseResponse> => {
    const response = await api.put("/setting/company/user-role", { user_id, role_id });
    return getResponse(response.data);
}

export default {
    getCompanySettings,
    updateCompanySettings,
    getCompanyOverview,
    updateRolesAndPermissions,
    getRolesAndPermissions,
    updateUserRole,
}