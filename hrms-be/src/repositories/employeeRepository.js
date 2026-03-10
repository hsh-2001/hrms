import query from "../helpers/query.js";

const createEmployee = async (employee) => {
    const { user_id, first_name, last_name, position, department, date_of_joining, company_id } = employee;
    const result = await query(
        `INSERT INTO employees (user_id, first_name, last_name, position, department, date_of_joining, company_id) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [user_id, first_name, last_name, position, department, date_of_joining, company_id]
    );
    return result.rows[0];
}

const getAllEmployees = async (req) => {
    const { company_id } = req.user;
    const { page = 1, limit = 1 } = req.query;
    const offset = (parseInt(page) > 0) ? ((parseInt(page) - 1) * parseInt(limit)) : 0;
    const result = await query('SELECT * FROM get_employees_details($1, $2, $3)', [company_id, limit, offset]);
    return result.rows;
}

const updateEmployee = async (req) => {
    const { id, first_name, last_name, email, phone, position, department, date_of_joining } = req.body;
    const sql = `SELECT * FROM update_employee($1, $2, $3, $4, $5, $6, $7, $8)`;
    const result = await query(sql, [id, first_name, last_name, email, phone, date_of_joining, position, department]);
    return result.rows[0];
}

const getEmployeeByFuzzySearch = async (req) => {
    const { company_id } = req.user;
    const { search } = req.query;
    const sql = `SELECT * FROM get_employee_by_fuzzy_search($1, $2)`;
    const result = await query(sql, [company_id, search]);
    return result.rows;
}
export default {
    createEmployee,
    getAllEmployees,
    updateEmployee,
    getEmployeeByFuzzySearch,
}