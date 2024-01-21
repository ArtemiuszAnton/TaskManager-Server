const pool = require('../db');

async function createTaskDB(task, user_id) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        const sql = 'INSERT INTO tasks (task, user_id) VALUES ($1, $2) RETURNING *';
        const { rows } = await client.query(sql, [task, user_id]);
        await client.query('COMMIT');
        return rows
    } catch (er) {
        await client.query('ROLLBACK');
        return []
    }
}

async function getAllTasksDB() {
    const client = await pool.connect();
    const sql = 'SELECT * FROM tasks';
    const { rows } = await client.query(sql);
    return rows
}

async function getTaskByIdDB(id) {
    const client = await pool.connect();
    const sql = 'SELECT * FROM tasks WHERE id = $1';
    const { rows } = await client.query(sql, [id]);
    return rows
}

async function updateTaskDB(id, task, user_id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'UPDATE tasks SET task = $1, user_id = $2 WHERE id = $3 RETURNING *';
        const { rows } = await client.query(sql, [task, user_id, id]);
        await client.query('COMMIT');
        return rows
    } catch (er) {
        await client.query('ROLLBACK');
        return []
    }
}

async function deleteTaskDB(id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
        const { rows } = await client.query(sql, [id]);
        await client.query('COMMIT');
        return rows
    } catch (er) {
        await client.query('ROLLBACK');
        return []
    }
}

async function changeTaskOnReqDB(id, body) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql_1 = 'SELECT * FROM tasks WHERE id = $1';
        const oldTask = (await client.query(sql_1, [id])).rows;
        const updTask = { ...oldTask[0], ...body }
        const sql_2 = 'UPDATE tasks SET task = $2, user_id = $3, WHERE id = $1 RETURNING *';
        const data = (await client.query(sql_2, [id, updTask.task, updTask.user_id])).rows;
        await client.query('COMMIT');
        return data
    } catch (er) {
        await client.query('ROLLBACK');
        return []
    }
}

module.exports = { createTaskDB, getAllTasksDB, updateTaskDB, deleteTaskDB, getTaskByIdDB, changeTaskOnReqDB }