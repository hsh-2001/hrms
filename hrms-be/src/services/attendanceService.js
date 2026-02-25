import attendanceRepository from '../repositories/attendanceRepository.js';

const checkAttendance = async (req) => {
    const { company_id } = req.user;
    req.body.company_id = company_id;
	await attendanceRepository.checkAttendance(req);
    return await getAttendanceByEmployeeId(req);
};

const getAllAttendance = async (req) => {
    const { company_id } = req.user;
    return await attendanceRepository.getAllAttendance(company_id);
};

const getAttendanceByEmployeeId = async (req) => {
    const { id: employee_id } = req.user;
    return await attendanceRepository.getAttendanceByEmployeeId(employee_id);
}

const getTodayEmployeeAttendance = async (req) => {
    const { id: employee_id } = req.user;
    return await attendanceRepository.getTodayEmployeeAttendance(employee_id);
}

export default {
	checkAttendance,
	getAllAttendance,
    getAttendanceByEmployeeId,
    getTodayEmployeeAttendance
};
