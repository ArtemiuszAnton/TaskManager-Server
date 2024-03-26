import express from 'express';
const routeTask = express.Router();
import { createTask, getAllTasks, updateTask, deleteTask, getTaskById, changeTaskOnReq } from '../service/task.service';

import { buildResponse } from '../helper/buildResponse';

routeTask.post('/', async (req, res) => {
    try {
        const { task, user_id } = req.body;
        const data = await createTask(task, user_id);
        buildResponse(200, data, res)
    } catch (er: any) {
        buildResponse(404, er.message, res)
    }
})

routeTask.get('/', async (_req, res) => {
    try {
        const data = await getAllTasks();
        buildResponse(200, data, res)
    } catch (er: any) {
        buildResponse(404, er.message, res)
    }
})

routeTask.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getTaskById(id);
        buildResponse(200, data, res);
    } catch (er: any) {
        buildResponse(404, er.message, res)
    }
})

routeTask.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { task, user_id } = req.body;
        const data = await updateTask(id, task, user_id)
        buildResponse(200, data, res)
    } catch (er: any) {
        buildResponse(404, er.message, res)
    }
})

routeTask.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteTask(id)
        buildResponse(200, data, res)
    } catch (er: any) {
        buildResponse(404, er.message, res)
    }
})

routeTask.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const newTask = await changeTaskOnReq(id, body);
        buildResponse(200, newTask, res)
    } catch (er: any) {
        buildResponse(404, er.message, res)
    }
})

export default routeTask
