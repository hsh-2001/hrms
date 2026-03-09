import type { IGetPayrollReportsResponse } from "../types/payroll/payrollList";
import type { IAssignPayrollComponentToEmployeeRequest, ICreatePayrollComponentRequest, IGetEmployeePayrollComponentResponse, IGetPayrollComponentResponse } from "../types/payroll/payrollStructure";
import api from "./api";
import { getResponse, type BaseResponse } from "./baseReponse";

const getPayrollReports = async (): Promise<BaseResponse<IGetPayrollReportsResponse[]>> => {
    const response = await api.get("/payroll/reports");
    return getResponse(response.data);
};

const createPayrollComponent = async (request: ICreatePayrollComponentRequest) => {
    const response = await api.post("/payroll/components", request);
    return getResponse(response.data);
};

const getPayrollComponent = async (): Promise<BaseResponse<IGetPayrollComponentResponse[]>> => {
    const response = await api.get("/payroll/components");
    return getResponse(response.data);
}

const upSertEmployeePayrollComponent = async (request: IAssignPayrollComponentToEmployeeRequest): Promise<BaseResponse> => {
    const response = await api.post("/payroll/components/employee", request);
    return getResponse(response.data);
}

const getAllEmployeePayrollComponents = async (): Promise<BaseResponse<IGetEmployeePayrollComponentResponse[]>> => {
    const response = await api.get(`/payroll/components/employees`);
    return getResponse(response.data);
}

export default {
    getPayrollReports,
    createPayrollComponent,
    getPayrollComponent,
    upSertEmployeePayrollComponent,
    getAllEmployeePayrollComponents,
};