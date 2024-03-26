import express from 'express';
import { buildResponse } from '../helper/buildResponse';
import { createUserApi, authUserApi } from '../service/api.service';
import { createToken } from '../helper/JWT';

const routeApi = express.Router();

routeApi.post('/reg', async (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = await createUserApi(name, surname, email, pwd);
        buildResponse(200, data, res)
    } catch (er: any) {
        buildResponse(404, er.message, res)
    }
})

routeApi.post('/auth', async (req, res) => {
    try {
        const { email, pwd } = req.body;
        const data = await authUserApi(email, pwd);
        const token = createToken(data);
        buildResponse(200, token, res)
    } catch (er: any) {
        buildResponse(404, er.message, res)
    }
})





export default routeApi


