import BaseResponse from "../helpers/baseResponse.js";
import attendanceService from "../services/attendanceService.js";

const checkAttendance = async (req, res) => {
    try {
        const result = await attendanceService.checkAttendance(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const getAllAttendances = async (req, res) => {
    try {
        const result = await attendanceService.getAllAttendance(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message);
    }
};

const getAttendanceByEmployeeId = async (req, res) => {
    try {
        const result = await attendanceService.getAttendanceByEmployeeId(req);
        BaseResponse.success(res, result);
    } catch (error) {
        BaseResponse.error(res, error.message, error.code);
    }
}

const getTodayEmployeeAttendance = async (req, res) => {
    try {
        const result = await attendanceService.getTodayEmployeeAttendance(req);
        BaseResponse.success(res, result);
    } catch (error) {
        console.error(error);
        BaseResponse.error(res, error.message, error.code);

    }
}

export default {
    checkAttendance,
    getAllAttendances,
    getAttendanceByEmployeeId,
    getTodayEmployeeAttendance
}