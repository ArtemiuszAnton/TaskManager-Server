import { createTaskDB, getAllTasksDB, updateTaskDB, deleteTaskDB, getTaskByIdDB, changeTaskOnReqDB } from '../repository/task.repository';

async function createTask(task, user_id) {
    const data = await createTaskDB(task, user_id);
    if (!data.length) throw new Error('data not created');
    return data
}

async function getAllTasks() {
    const data = await getAllTasksDB();
    if (!data.length) throw new Error('data not found');
    return data
}

async function updateTask(id, task, user_id) {
    const data = await updateTaskDB(id, task, user_id);
    if (!data.length) throw new Error('data not created');
    return data
}

async function deleteTask(id) {
    const data = await deleteTaskDB(id);
    if (!data.length) throw new Error('data not created');
    return data
}

async function getTaskById(id) {
    const data = await getTaskByIdDB(id);
    if (!data.length) throw new Error('data not created');
    return data
}

async function changeTaskOnReq(id, body) {
    const data = await changeTaskOnReqDB(id, body);
    if (!data.length) throw new Error('data not created');
    return data
}

export { createTask, getAllTasks, updateTask, deleteTask, getTaskById, changeTaskOnReq }