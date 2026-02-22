import query from "../helpers/query.js";

const createEmployee = async (employee) => {
    const { user_id, first_name, last_name, position, department, date_of_joining } = employee;
    const result = await query(
        `INSERT INTO employees (user_id, first_name, last_name, position, department, date_of_joining) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [user_id, first_name, last_name, position, department, date_of_joining]
    );
    return result.rows[0];
}

export default {
    createEmployee,
}