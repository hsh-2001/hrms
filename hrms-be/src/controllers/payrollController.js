import BaseResponse from "../helpers/baseResponse.js";
import payrollService from "../services/payrollService.js";

const upsertPayrollComponents = async (req, res) => {
    try {
        const result = await payrollService.upsertPayrollComponents(req);
        BaseResponse.success(res, result, result.status_code);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const upsertEmployeePayroll = async (req, res) => {
    try {
        const result = await payrollService.upsertEmployeePayroll(req);
        BaseResponse.success(res, result, result.status_code);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const upsertEmployeePayrollComponent = async (req, res) => {
    try {
        const result = await payrollService.upsertEmployeePayrollComponent(req);
        BaseResponse.success(res, result, result.status_code);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const getEmployeePayroll = async (req, res) => {
    try {
        const result = await payrollService.getEmployeePayroll(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const getPayrollReports = async (req, res) => {
    try {
        const result = await payrollService.getPayrollReports(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const getPayrollComponents = async (req, res) => {
    try {
        const result = await payrollService.getPayrollComponents(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const getAllEmployeePayrollComponents = async (req, res) => {
    try {
        const result = await payrollService.getAllEmployeePayrollComponents(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

export default {
    upsertPayrollComponents,
    upsertEmployeePayroll,
    getEmployeePayroll,
    getPayrollReports,
    getPayrollComponents,
    upsertEmployeePayrollComponent,
    getAllEmployeePayrollComponents,
};
