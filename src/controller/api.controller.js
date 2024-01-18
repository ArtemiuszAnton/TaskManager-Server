const express = require('express');
const { buildResponse } = require('../helper/buildResponse');
const { createUserApi } = require('../service/api.service')

const routeApi = express.Router();

routeApi.post('/', async (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = await createUserApi(name, surname, email, pwd);
        buildResponse(200, data, res)
    } catch (er) {
        buildResponse(404, er.message, res)
    }
})



module.exports = routeApi