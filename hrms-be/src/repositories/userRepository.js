import pool from "../db/config.js";
import query from "../helpers/query.js";

const register = async (user) => {
    const { username, email, password, phone, company_id, role } = user;
    if (!username || !email || !password) {
        throw new Error('Username, email, and password are required');
    }
    const result = await pool.query('INSERT INTO users (username, email, password_hash, phone, company_id, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [username, email, password, phone, company_id, role]);
    return result.rows[0];
}

const login = async (user) => {
    const { username } = user;
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
}

const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

const getUserByCompanyId = async (companyId) => {
    const result = await pool.query('SELECT * FROM get_user_by_company_id($1)', [companyId]);
    return result.rows;
}

const getUserDetail = async (userId) => {
    const user = await query("SELECT * FROM get_user_detail($1)", [userId]);
    return user.rows[0];
}
export default {
    register,
    login,
    getAllUsers,
    getUserByCompanyId,
    getUserDetail,
}