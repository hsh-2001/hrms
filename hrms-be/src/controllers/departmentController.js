import BaseResponse from "../helpers/baseResponse.js";
import departmentService from "../services/departmentService.js";

const createDepartment = async (req, res) => {
    try {
        const response = await departmentService.createDepartment(req);
        BaseResponse.success(res, response, 'Department created successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const getAllDepartments = async (req, res) => {
    try {
        const response = await departmentService.getAllDepartments(req);
        BaseResponse.success(res, response, 'Departments retrieved successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const getDepartmentById = async (req, res) => {
    try {
        const response = await departmentService.getDepartmentById(req);
        if (!response) {
            return BaseResponse.error(res, 'Department not found', 404);
        }
        BaseResponse.success(res, response, 'Department retrieved successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const updateDepartment = async (req, res) => {
    try {
        const response = await departmentService.updateDepartment(req);
        if (!response) {
            return BaseResponse.error(res, 'Department not found', 404);
        }
        BaseResponse.success(res, response, 'Department updated successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const response = await departmentService.deleteDepartment(req);
        if (!response) {
            return BaseResponse.error(res, 'Department not found', 404);
        }
        BaseResponse.success(res, response, 'Department deleted successfully');
    } catch (error) {
        BaseResponse.error(res, error.message, 500);
    }
}

export default {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
}
