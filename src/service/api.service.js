const { createUserApiDB, getUserByEmailDB, authUserApiDB } = require('../repository/api.repository');
const bcrypt = require('bcrypt');

const saltround = 3;

async function createUserApi(name, surname, email, pwd) {
    const findEmail = await getUserByEmailDB(email);
    if (findEmail.length) throw new Error('this email found');

    const hashPwd = await bcrypt.hash(pwd, saltround);
    const user = await createUserApiDB(name, surname, email, hashPwd);
    if (!user.length) throw new Error('data not saved');
    return user
};


async function authUserApi(email, pwd) {
    const findEmail = await getUserByEmailDB(email);
    if (!findEmail.length) throw new Error('this email not found');
    const comparePwd = await bcrypt.compare(pwd, findEmail[0].pwd);
    if (!comparePwd) throw new Error('wrong password');
    return findEmail
}

module.exports = { createUserApi, authUserApi }