import pool from "../db/config.js";

const query = async (sql, params) => {
  try {
    const result = await pool.query(sql, params);
    return result;
  } catch (error) {
    throw error;
  }
};

export default query;
