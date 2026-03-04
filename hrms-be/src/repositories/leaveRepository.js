import query from "../helpers/query.js";

const getLeaveTypeByCompanyId = async (req) => {
    const { company_id } = req.user;
    const sql = "SELECT * FROM leave_types WHERE company_id IN (0, $1)";
    const result = await query(sql, [company_id]);
    return result.rows;
}

const getAllLeaveRequestsByCompanyId = async (req) => {
    const { company_id } = req.user;
    const sql = "SELECT * from get_company_leave_requests($1)";
    const result = await query(sql, [company_id]);
    return result.rows;
}

const getLeaveRequestById = async (req) => {
    const { company_id } = req.user;
    const { id } = req.params;
    const sql = "SELECT * FROM leave_requests WHERE id = $1 AND company_id = $2";
    const result = await query(sql, [id, company_id]);
    return result.rows[0];
}

const getLeaveRequestsByEmployeeId = async (req) => {
    const { company_id } = req.user;
    const { employee_id } = req.params;
    const sql = "SELECT * FROM leave_requests WHERE company_id = $1 AND employee_id = $2 ORDER BY created_at DESC";
    const result = await query(sql, [company_id, employee_id]);
    return result.rows;
}

const createLeaveRequest = async (req) => {
    const { company_id } = req.user;
    const { employee_id, leave_type_id, start_date, end_date, reason } = req.body;
    const sql = "INSERT INTO leave_requests (company_id, employee_id, leave_type_id, start_date, end_date, reason) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const result = await query(sql, [company_id, employee_id, leave_type_id, start_date, end_date, reason]);
    return result.rows[0];
}

const updateLeaveRequest = async (req) => {
    const { company_id } = req.user;
    const { status, reason, id } = req.body;
    let sql = "UPDATE leave_requests SET status = $1, reason = $2, updated_at = NOW() WHERE id = $3 AND company_id = $4 RETURNING *";
    
    const result = await query(sql, [status, reason, id, company_id]);
    return result.rows[0];
}

const deleteLeaveRequest = async (req) => {
    const { company_id } = req.user;
    const { id } = req.params;
    const sql = "DELETE FROM leave_requests WHERE id = $1 AND company_id = $2";
    const result = await query(sql, [id, company_id]);
    return result;
}

const createLeaveType = async (req) => {
    const { company_id } = req.user;
    const { name, description } = req.body;
    const sql = "INSERT INTO leave_types (company_id, name, description) VALUES (?, ?, ?)";
    const result = await query(sql, [company_id, name, description]);
    return result;
}

const updateLeaveType = async (req) => {
    const { company_id } = req.user;
    const { id } = req.params;
    const { name, description } = req.body;
    const sql = "UPDATE leave_types SET name = ?, description = ?, updated_at = NOW() WHERE id = ? AND company_id = ?";
    const result = await query(sql, [name, description, id, company_id]);
    return result;
}

const deleteLeaveType = async (req) => {
    const { company_id } = req.user;
    const { id } = req.params;
    const sql = "DELETE FROM leave_types WHERE id = ? AND company_id = ?";
    const result = await query(sql, [id, company_id]);
    return result;
}

const getLeaveBalance = async (req) => {
    const { company_id } = req.user;
    const { employee_id } = req.params;
    const sql = "SELECT * FROM leave_balances WHERE company_id = ? AND employee_id = ?";
    const result = await query(sql, [company_id, employee_id]);
    return result;
}

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
}