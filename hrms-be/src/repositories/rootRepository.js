import query from "../helpers/query.js";

const createNewCompany = async (company) => {
    const { name, address, phone, email } = company;
    const sql = 'INSERT INTO companies (name, address, phone, email) VALUES ($1, $2, $3, $4) RETURNING *';
    const params = [name, address, phone, email];
    const result = await query(sql, params);
    return result.rows[0];
}

const getAllCompanies = async () => {
    const sql = 'SELECT * FROM get_all_companies()';
    const result = await query(sql);
    return result.rows;
}

const updateCompany = async(companyId, company) => {
    const { name, address, phone, email } = company;
    const sql = 'UPDATE companies SET name = $1, address = $2, phone = $3, email = $4 WHERE id = $5 RETURNING *';
    const params = [name, address, phone, email, companyId];
    const result = await query(sql, params);
    return result.rows[0];
}

const deleteCompany = async (companyId) => {
    const sql = 'DELETE FROM companies WHERE id = $1';
    const params = [companyId];
    await query(sql, params);
}

export default {
    createNewCompany,
    getAllCompanies,
    updateCompany,
    deleteCompany,
}