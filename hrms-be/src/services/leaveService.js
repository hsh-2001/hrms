import leaveRepository from '../repositories/leaveRepository.js';

const getLeaveTypeByCompanyId = async (req) => {
    return await leaveRepository.getLeaveTypeByCompanyId(req);
};

const getAllLeaveRequestsByCompanyId = async (req) => {
    return await leaveRepository.getAllLeaveRequestsByCompanyId(req);
};

const getLeaveRequestById = async (req) => {
    return await leaveRepository.getLeaveRequestById(req);
};

const getLeaveRequestsByEmployeeId = async (req) => {
    return await leaveRepository.getLeaveRequestsByEmployeeId(req);
};

const createLeaveRequest = async (req) => {
    return await leaveRepository.createLeaveRequest(req);
};

const updateLeaveRequest = async (req) => {
    return await leaveRepository.updateLeaveRequest(req);
};

const deleteLeaveRequest = async (req) => {
    return await leaveRepository.deleteLeaveRequest(req);
};

const createLeaveType = async (req) => {
    return await leaveRepository.createLeaveType(req);
};

const updateLeaveType = async (req) => {
    return await leaveRepository.updateLeaveType(req);
};

const deleteLeaveType = async (req) => {
    return await leaveRepository.deleteLeaveType(req);
};

const getLeaveBalance = async (req) => {
    return await leaveRepository.getLeaveBalance(req);
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
