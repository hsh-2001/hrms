import payrollRepository from '../repositories/payrollRepository.js';

const upsertPayrollComponents = async (req) => {
    return await payrollRepository.upsertPayrollComponents(req);
};

const upsertEmployeePayroll = async (req) => {
    return await payrollRepository.upsertEmployeePayroll(req);
};
const upsertEmployeePayrollComponent = async (req) => {
    return await payrollRepository.upsertEmployeePayrollComponent(req);
};

const getEmployeePayroll = async (req) => {
    return await payrollRepository.getEmployeePayroll(req);
};

const getPayrollReports = async (req) => {
    return await payrollRepository.getPayrollReports(req);
};

const getPayrollComponents = async (req) => {
    return await payrollRepository.getPayrollComponents(req);
};

const getAllEmployeePayrollComponents = async (req) => {
    return await payrollRepository.getAllEmployeePayrollComponents(req);
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
