import query from "../helpers/query.js";

const upsertPayrollComponents = async (req) => {
    const { company_id } = req.user;
    const { id, name, description, component_type, calculation_type } = req.body;
    const sql = "SELECT * FROM upsert_payroll_components($1, $2, $3, $4, $5, $6)";
    const params = [id, company_id, name, description, component_type, calculation_type];
    const result = await query(sql, params);
    return result.rows[0];
}

const upsertEmployeePayroll = async (req) => {
    const { company_id, employee_id } = req.user;
    const { salary, payment_type, currency, effective_date } = req.body;
    const sql = "SELECT * FROM upsert_employee_payroll($1, $2, $3, $4, $5, $6)";
    const params = [company_id, employee_id, salary, payment_type, currency, effective_date];
    const result = await query(sql, params);
    return result.rows[0];
};

const upsertEmployeePayrollComponent = async (req) => {
    const { company_id } = req.user;
    const { employee_id, component_id, value } = req.body;
    const sql = "INSERT INTO employee_payroll_components(company_id, employee_id, component_id, value) VALUES ($1, $2, $3, $4) RETURNING *";  
    const params = [company_id, employee_id, component_id, value];
    const result = await query(sql, params);
    return result.rows[0];
}

const getAllEmployeePayrollComponents = async (req) => {
    const { company_id } = req.user;
    const sql = "SELECT * FROM get_all_employees_payroll_components($1)";
    const params = [company_id];
    const result = await query(sql, params);
    return result.rows;
    
}

const getPayrollComponents = async (req) => {
    const { company_id } = req.user;
    const sql = "SELECT * FROM get_payroll_components($1)";
    const params = [company_id];
    const result = await query(sql, params);
    return result.rows;
};

const getEmployeePayroll = async (req) => {
    const { company_id, employee_id } = req.user;
    const sql = "SELECT * FROM get_employee_payroll($1, $2)";
    const params = [company_id, employee_id];
    const result = await query(sql, params);
    return result.rows[0];
}

const getPayrollReports = async (req) => {
    const { company_id } = req.user;
    const { start_date, end_date, is_get_all = true } = req.query;
    const sql = "SELECT * FROM get_payroll_reports($1, $2, $3, $4)";
    const params = [company_id, start_date, end_date, is_get_all];
    const result = await query(sql, params);
    return result.rows;
}

export default {
    upsertPayrollComponents,
    upsertEmployeePayroll,
    getEmployeePayroll,
    getPayrollComponents,
    getPayrollReports,
    upsertEmployeePayrollComponent,
    getAllEmployeePayrollComponents,
}