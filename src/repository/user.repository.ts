import pool from '../db';

async function createUserDB(name, surname, email, pwd) {
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

async function getAllUsersDB() {
    const client = await pool.connect();
    const sql = "SELECT * FROM users";
    const { rows } = await client.query(sql);
    return rows
}

async function getUserByEmailDB(email) {
    const client = await pool.connect();
    const sql = "SELECT * FROM users WHERE email = $1";
    const { rows } = await client.query(sql, [email]);
    return rows
}

async function getUserByIdDB(id) {
    const client = await pool.connect();
    const sql = "SELECT * FROM users WHERE id = $1";
    const { rows } = await client.query(sql, [id]);
    return rows
}

async function updateUserByIdDB(id, name, surname, email, pwd) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'UPDATE users SET name = $1, surname = $2, email = $3, pwd = $4 WHERE id = $5 RETURNING *';
        const { rows } = await client.query(sql, [name, surname, email, pwd, id]);
        await client.query('COMMIT');
        return rows
    } catch (er) {
        await client.query('ROLLBACK');
        console.log([]);
        return []
    }
}

async function deleteUserByIdDB(id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
        const { rows } = await client.query(sql, [id]);
        await client.query('COMMIT');
        return rows
    } catch (er) {
        await client.query('ROLLBACK');
        console.log([]);
        return []
    }
}

async function changeUserOnReqDB(id, body) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql_1 = 'SELECT * FROM users WHERE id = $1';
        const oldUser = (await client.query(sql_1, [id])).rows;
        const updUser = { ...oldUser[0], ...body }
        const sql_2 = 'UPDATE users SET name = $2, surname = $3, email = $4, pwd = $5  WHERE id = $1 RETURNING *';
        const data = (await client.query(sql_2, [id, updUser.name, updUser.surname, updUser.email, updUser.pwd])).rows;
        await client.query('COMMIT');
        return data
    } catch (er) {
        await client.query('ROLLBACK');
        console.log([]);
        return []
    }
}


export { createUserDB, getAllUsersDB, updateUserByIdDB, getUserByEmailDB, getUserByIdDB, deleteUserByIdDB, changeUserOnReqDB }