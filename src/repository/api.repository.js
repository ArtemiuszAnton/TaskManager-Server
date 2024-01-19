const pool = require('../db');

async function createUserApiDB(name, surname, email, pwd) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'INSERT INTO users (name, surname, email, pwd) VALUES ($1, $2, $3, $4) RETURNING *';
        const { rows } = await client.query(sql, [name, surname, email, pwd]);
        await client.query('COMMIT');
        return rows
    } catch (er) {
        await client.query('ROLLBACK');
        console.log();
        return []
    }
}

async function getUserByEmailDB(email) {
    const client = await pool.connect();
    const sql = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await client.query(sql, [email]);
    return rows
}

async function checkUserApiDB(pwd) {
    const client = await pool.connect();
    const sql = 'SELECT * FROM users WHERE pwd = $1';
    const {rows} = await client.query(sql,[pwd]);
    return rows
}


module.exports = { createUserApiDB, getUserByEmailDB, checkUserApiDB }