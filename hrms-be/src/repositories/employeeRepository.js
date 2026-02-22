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

const getAllEmployees = async (company_id) => {
    const result = await query('SELECT * FROM employees WHERE company_id = $1', [company_id]);
    return result.rows;
}
export default {
    createEmployee,
    getAllEmployees,
}