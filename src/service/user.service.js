const { createUserDB, getAllUsersDB, updateUserByIdDB, getUserByEmailDB, getUserByIdDB, deleteUserByIdDB, changeUserOnReqDB } = require('../repository/user.repository');

async function createUser(name, surname, email, pwd) {
    const foundUser = await getUserByEmailDB(email);
    if (foundUser.length) throw new Error('user already exists');

    const data = await createUserDB(name, surname, email, pwd);
    if (!data.length) throw new Error('data not saved');
    return data
};

async function getAllUsers() {
    const data = await getAllUsersDB();
    if (!data.length) throw new Error('data not saved');
    return data
}

async function getUserById(id) {
    const data = await getUserByIdDB(id);
    if (!data.length) throw new Error('data not saved');
    return data
}

async function updateUserById(id, name, surname, email, pwd) {
    const data = await updateUserByIdDB(id, name, surname, email, pwd);
    if (!data.length) throw new Error('data not saved');
    return data
}

async function deleteUserById(id) {
    const data = await deleteUserByIdDB(id);
    if (!data.length) throw new Error('data not saved');
    return data
}

async function changeUserOnReq(id, body) {
    const data = await changeUserOnReqDB(id, body);
    if (!data.length) throw new Error('data not saved');
    return data
}

module.exports = { createUser, getAllUsers, updateUserById, getUserById, deleteUserById, changeUserOnReq }