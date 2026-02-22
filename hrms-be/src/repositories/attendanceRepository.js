import query from "../helpers/query.js";

const addNewAttendance = async (req) => {
    const { employee_id, company_id, attendance_date, check_in_time, check_out_time, status } = req.body;
    const sql = "INSERT INTO attendances (employee_id, company_id, attendance_date, check_in_time, check_out_time, status) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [employee_id, company_id, attendance_date, check_in_time, check_out_time, status];
    return await query(sql, values);
};

export default {
    addNewAttendance
}