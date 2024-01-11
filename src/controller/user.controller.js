const express = require('express');
const { createUser, getAllUsers, updateUserById, getUserById, deleteUserById } = require('../service/user.service');
const { buildResponse } = require('../helper/buildResponse');

const routeUser = express.Router();

routeUser.post('/', async (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = await createUser(name, surname, email, pwd);
        buildResponse(200, data, res)
    } catch (er) {
        buildResponse(404, er.message, res)
    }
})

routeUser.get('/', async (_req, res) => {
    try {
        const data = await getAllUsers();
        buildResponse(200, data, res)
    } catch (er) {
        buildResponse(404, er.message, res)
    }
})

routeUser.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getUserById(id);
        buildResponse(200, data, res)
    } catch (er) {
        buildResponse(404, er.message, res)
    }
})

routeUser.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, email, pwd } = req.body;
        const data = await updateUserById(id, name, surname, email, pwd);
        buildResponse(200, data, res)
    } catch (er) {
        buildResponse(404, er.message, res)
    }
})

routeUser.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteUserById(id);
        buildResponse(200, data, res)
    } catch (er) {
        buildResponse(404, er.message, res)
    }
})


module.exports = routeUser;