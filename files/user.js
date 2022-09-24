// Database
let database  = require('./database');

async function list()
{
    let users   = [];
    let results = await database.getUsers();

    Object.keys(results).forEach(function (key) {
        let user    = {};
        user.id     = results[key].id;
        user.name   = results[key].name;
        users.push(user);
    });
    return users;
}

async function get(id)
{
    let result  = await database.getUser('id', id);
    let user    = [];

    user.push({id:result[0].id, name:result[0].name});

    return user;
}

async function add(requestBody)
{
    let name    = requestBody.name;
    let exist   = await checkName(name);
    if (!exist)
    {
        await database.addUser(name);
        return true;
    }
}

async function update(id, requestBody)
{
    let name    = requestBody.name;
    let exist   = await checkName(name);
    if (!exist)
    {
        await database.updateUser({name:name, id:id});
        return true;
    }
}

async function deleteUser(id)
{
    return await database.deleteUser(id);
}

module.exports = { list, get, add, update, deleteUser };

async function checkName(name)
{
    let result  = await database.getUser('name', name);
    return result.length
}