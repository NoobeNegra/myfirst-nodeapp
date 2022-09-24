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

    if (result.length === 0)
        throw Error("This user doesn't exist");

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
        return "User "+name+" added to the base!";
    }
    throw Error("This user already exist");
}

async function update(id, requestBody)
{
    let name    = requestBody.name;
    let exist   = await checkName(name);
    let checkId = await database.getUser('id', id);

    if (!exist && checkId.length > 0)
    {
        await database.updateUser({name:name, id:id});
        return "User "+checkId[0].name+" has been updated to "+name;
    }
    throw Error ("Either the name is already in use or that user doesn't exists");
}

async function deleteUser(id)
{
    let checkId = await database.getUser('id', id);
    if (checkId.length > 0)
    {
        await database.deleteUser(id);
        return "User "+checkId[0].name+" has been deleted";
    }
    throw Error ("That user doesn't exists");
}

module.exports = { list, get, add, update, deleteUser };

async function checkName(name)
{
    let result  = await database.getUser('name', name);
    return result.length
}