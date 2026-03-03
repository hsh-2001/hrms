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
export default {
    createEmployee,
    getAllEmployees,
}