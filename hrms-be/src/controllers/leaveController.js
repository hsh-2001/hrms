import BaseResponse from "../helpers/baseResponse.js";
import leaveService from "../services/leaveService.js";

const getLeaveTypeByCompanyId = async (req, res) => {
    try {
        const result = await leaveService.getLeaveTypeByCompanyId(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const getAllLeaveRequestsByCompanyId = async (req, res) => {
    try {
        const result = await leaveService.getAllLeaveRequestsByCompanyId(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const getLeaveRequestById = async (req, res) => {
    try {
        const result = await leaveService.getLeaveRequestById(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message, error.code);
    }
};

const getLeaveRequestsByEmployeeId = async (req, res) => {
    try {
        const result = await leaveService.getLeaveRequestsByEmployeeId(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message, error.code);
    }
};

const createLeaveRequest = async (req, res) => {
    try {
        const result = await leaveService.createLeaveRequest(req);
        BaseResponse.success(res, result, 201);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const updateLeaveRequest = async (req, res) => {
    try {
        const result = await leaveService.updateLeaveRequest(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const deleteLeaveRequest = async (req, res) => {
    try {
        const result = await leaveService.deleteLeaveRequest(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const createLeaveType = async (req, res) => {
    try {
        const result = await leaveService.createLeaveType(req);
        BaseResponse.success(res, result, 201);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const updateLeaveType = async (req, res) => {
    try {
        const result = await leaveService.updateLeaveType(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const deleteLeaveType = async (req, res) => {
    try {
        const result = await leaveService.deleteLeaveType(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const getLeaveBalance = async (req, res) => {
    try {
        const result = await leaveService.getLeaveBalance(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message, error.code);
    }
};

export default {
    getLeaveTypeByCompanyId,
    getAllLeaveRequestsByCompanyId,
    getLeaveRequestById,
    getLeaveRequestsByEmployeeId,
    createLeaveRequest,
    updateLeaveRequest,
    deleteLeaveRequest,
    createLeaveType,
    updateLeaveType,
    deleteLeaveType,
    getLeaveBalance
};
