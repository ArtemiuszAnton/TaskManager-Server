const express = require('express');
const { buildResponse } = require('../helper/buildResponse');
const { createUserApi, authUserApi } = require('../service/api.service')

const routeApi = express.Router();

routeApi.post('/reg', async (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = await createUserApi(name, surname, email, pwd);
        buildResponse(200, data, res)
    } catch (er) {
        buildResponse(404, er.message, res)
    }
})

routeApi.post('/auth', async (req, res) => {
    try {
        const { email, pwd } = req.body;
        const data = await authUserApi(email, pwd);
        buildResponse(200, data, res)
    } catch (er) {
        buildResponse(404, er.message, res)
    }
})



module.exports = routeApi


