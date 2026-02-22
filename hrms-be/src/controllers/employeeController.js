import BaseResponse from "../helpers/baseResponse.js";
import employeeService from "../services/employeeService.js";

const createEmployee = async (req, res) => {
    try {
        const response = await employeeService.createEmployee(req);
        BaseResponse.success(res, response, 'Employee created successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const getAllEmployees = async (req, res) => {
    try {
        const response = await employeeService.getAllEmployees(req);
        BaseResponse.success(res, response, 'Employees retrieved successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

export default {
    createEmployee,
    getAllEmployees,
}