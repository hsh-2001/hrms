import attendanceRepository from '../repositories/attendanceRepository.js';

const checkAttendance = async (req) => {
    const { company_id, employee_id } = req.user;
    req.body.company_id = company_id;
    req.body.employee_id = employee_id;
	await attendanceRepository.checkAttendance(req);
    return await getTodayEmployeeAttendance(req);
};

const getAllAttendance = async (req) => {
    const { company_id } = req.user;
    return await attendanceRepository.getAllAttendance(company_id);
};

const getAttendanceByEmployeeId = async (req) => {
    const { employee_id } = req.user;
    return await attendanceRepository.getAttendanceByEmployeeId(employee_id);
}

const getTodayEmployeeAttendance = async (req) => {
    const { employee_id } = req.user;
    return await attendanceRepository.getTodayEmployeeAttendance(employee_id);
}

const getAttendanceByCompanyId = async (req) => {
    const { company_id } = req.user;
    return await attendanceRepository.getAttendanceByCompanyId(company_id);
}

export default {
	checkAttendance,
	getAllAttendance,
    getAttendanceByEmployeeId,
    getTodayEmployeeAttendance,
    getAttendanceByCompanyId,
};
