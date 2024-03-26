import { Pool } from 'pg';

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
})

export default pool