import query from "../helpers/query.js";

const createPosition = async (position) => {
    const { company_id, department_id, title, code, description } = position;
    const result = await query(
        `INSERT INTO positions (company_id, department_id, title, code, description) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [company_id, department_id, title, code, description]
    );
    return result.rows[0];
}

const getAllPositions = async (company_id) => {
    const result = await query(
        'SELECT * FROM positions WHERE company_id = $1 AND is_active = TRUE ORDER BY title',
        [company_id]
    );
    return result.rows;
}

const getPositionById = async (id, company_id) => {
    const result = await query(
        'SELECT * FROM positions WHERE id = $1 AND company_id = $2',
        [id, company_id]
    );
    return result.rows[0];
}

const getPositionsByDepartment = async (department_id, company_id) => {
    const result = await query(
        'SELECT * FROM positions WHERE department_id = $1 AND company_id = $2 AND is_active = TRUE ORDER BY title',
        [department_id, company_id]
    );
    return result.rows;
}

const updatePosition = async (id, company_id, position) => {
    const { department_id, title, code, description, is_active } = position;
    const result = await query(
        `UPDATE positions 
         SET department_id = COALESCE($1, department_id),
             title = COALESCE($2, title), 
             code = COALESCE($3, code), 
             description = COALESCE($4, description),
             is_active = COALESCE($5, is_active),
             updated_at = NOW()
         WHERE id = $6 AND company_id = $7 RETURNING *`,
        [department_id, title, code, description, is_active, id, company_id]
    );
    return result.rows[0];
}

const deletePosition = async (id, company_id) => {
    const result = await query(
        `UPDATE positions SET is_active = FALSE, updated_at = NOW() 
         WHERE id = $1 AND company_id = $2 RETURNING *`,
        [id, company_id]
    );
    return result.rows[0];
}

export default {
    createPosition,
    getAllPositions,
    getPositionById,
    getPositionsByDepartment,
    updatePosition,
    deletePosition,
}
