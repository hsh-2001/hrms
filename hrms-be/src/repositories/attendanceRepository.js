import query from "../helpers/query.js";

const checkAttendance = async (req) => {
    const { employee_id, company_id, attendance_date, check_in_time, check_out_time, re_check_in_time, re_check_out_time, status } = req.body;
    const sql = "SELECT * FROM check_attendance($1, $2, $3, $4, $5, $6, $7, $8)";
    const values = [employee_id, company_id, attendance_date, check_in_time, check_out_time, re_check_in_time, re_check_out_time, status];
    const result = await query(sql, values);
    return result.rows;
};

const getAllAttendance = async (company_id) => {
    const sql = "SELECT * FROM attendance WHERE company_id = $1";
    const values = [company_id];
    const result = await query(sql, values);
    return result.rows;
};

const getAttendanceByEmployeeId = async (employee_id) => {
    const sql = "SELECT * FROM get_attendance_by_employee_id($1)";
    const values = [employee_id];
    const result = await query(sql, values);
    return result.rows;
}

const getTodayEmployeeAttendance = async (employee_id) => {
    const sql = "SELECT * FROM get_today_employee_attendance($1)";
    const values = [employee_id];
    const result = await query(sql, values);
    return result.rows[0];
}

export default {
    checkAttendance,
    getAllAttendance,
    getAttendanceByEmployeeId,
    getTodayEmployeeAttendance
}