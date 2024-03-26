import express from 'express';
import { createUser, getAllUsers, updateUserById, getUserById, deleteUserById, changeUserOnReq } from '../service/user.service';
import { buildResponse } from '../helper/buildResponse';
import { isValidId } from '../helper/validation';
const routeUser = express.Router();

routeUser.post('/', async (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = await createUser(name, surname, email, pwd);
        buildResponse(200, data, res)
    } catch (er: any) {
        buildResponse(404, er.message, res)
    }
})

routeUser.get('/', async (_req, res) => {
    try {
        const data = await getAllUsers();
        buildResponse(200, data, res)
    } catch (er: any) {
        buildResponse(404, er.message, res)
    }
})

routeUser.get('/:id', isValidId, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getUserById(id);
        buildResponse(200, data, res)
    } catch (er: any) {
        buildResponse(404, er.message, res)
    }
})

routeUser.put('/:id', isValidId, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, email, pwd } = req.body;
        const data = await updateUserById(id, name, surname, email, pwd);
        buildResponse(200, data, res)
    } catch (er: any) {
        buildResponse(404, er.message, res)
    }
})

routeUser.delete('/:id', isValidId, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteUserById(id);
        buildResponse(200, data, res)
    } catch (er: any) {
        buildResponse(404, er.message, res)
    }
})

routeUser.patch('/:id', isValidId, async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const newUser = await changeUserOnReq(id, body);
        buildResponse(200, newUser, res)
    } catch (er: any) {
        buildResponse(404, er.message, res)
    }
})


export default routeUser;