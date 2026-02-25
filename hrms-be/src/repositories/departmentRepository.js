import query from "../helpers/query.js";

const createDepartment = async (department) => {
    const { name, code, description, company_id, manager_id } = department;
    const result = await query(
        `INSERT INTO departments (name, code, description, company_id, manager_id) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, code, description, company_id, manager_id]
    );
    return result.rows[0];
}

const getAllDepartments = async (company_id) => {
    const result = await query(
        'SELECT * FROM get_all_departments($1)',
        [company_id]
    );
    return result.rows;
}

const getDepartmentById = async (id, company_id) => {
    const result = await query(
        'SELECT * FROM departments WHERE id = $1 AND company_id = $2',
        [id, company_id]
    );
    return result.rows[0];
}

const updateDepartment = async (id, company_id, department) => {
    const { name, code, description, manager_id, is_active } = department;
    const result = await query(
        `UPDATE departments 
         SET name = COALESCE($1, name), 
             code = COALESCE($2, code), 
             description = COALESCE($3, description), 
             maanager_id = COALESCE($4, maanager_id),
             is_active = COALESCE($5, is_active),
             updated_at = NOW()
         WHERE id = $6 AND company_id = $7 RETURNING *`,
        [name, code, description, manager_id, is_active, id, company_id]
    );
    return result.rows[0];
}

const deleteDepartment = async (id, company_id) => {
    const result = await query(
        `UPDATE departments SET is_active = FALSE, updated_at = NOW() 
         WHERE id = $1 AND company_id = $2 RETURNING *`,
        [id, company_id]
    );
    return result.rows[0];
}

export default {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
}
