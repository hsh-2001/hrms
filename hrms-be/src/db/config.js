import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ override: false });

const { Pool } = pg;

const isLocalhost = process.env.DB_HOST === 'localhost' || process.env.DB_HOST === '127.0.0.1';

const pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ...(!isLocalhost && { ssl: { rejectUnauthorized: false } }),
    });

export default pool;