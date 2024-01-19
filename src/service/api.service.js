const { createUserApiDB, getUserByEmailDB, checkUserApiDB } = require('../repository/api.repository');
const bcrypt = require('bcrypt');

const saltround = 3;

async function createUserApi(name, surname, email, pwd) {
    const findEmail = await getUserByEmailDB(email);
    if (findEmail.length) throw new Error('this email found');

    const hashPwd = await bcrypt.hash(pwd, saltround);
    const data = await createUserApiDB(name, surname, email, hashPwd);
    if (!data.length) throw new Error('data not saved');
    return data
};

async function checkUserApi(name, surname, email, pwd) {
    const findEmail = await getUserByEmailDB(email);
    if (findEmail.length) throw new Error('this email found');
}


module.exports = { createUserApi }