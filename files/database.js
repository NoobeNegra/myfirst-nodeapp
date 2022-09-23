const mysql = require('mysql');

let connection = mysql.createConnection({
    host: "db",
    user: "user",
    password: "mypass",
    database: "test_ailin"
});

function GetUsers()
{
    return new Promise(resolve => {
        let users = [];
        connection.query('SELECT * FROM users ORDER BY id ASC', function (error, results, fields) {
            if (error) throw error;

            Object.keys(results).forEach(function (key) {
                let user = {};
                user.id = results[key].id;
                user.name = results[key].name;
                users.push(user);
            });
            resolve(users);
        });
    });
}

function GetUser(id)
{
    return new Promise(resolve => {
        let user = {};
        connection.query('SELECT * FROM users WHERE id = ?', [id], function (error, results, fields) {
            if (error) throw error;

            Object.keys(results).forEach(function (key) {
                user.id = results[key].id;
                user.name = results[key].name;
            });
            resolve(user);
        });
    });
}

function AddUser(username)
{
    if (username.length == 0)
        return false;

    return new Promise(resolve => {
        var post  = {name: username};
        connection.query('INSERT INTO users SET ?', post, function (error, results, fields) {
            if (error) throw error;
            resolve(1);
        });
    });
}

function UpdateUser(user)
{
    /*if (username.length == 0)
        return false;*/

    return new Promise(resolve => {
        connection.query('UPDATE users SET name = ? WHERE id = ?', [user.name, user.id], function (error, results, fields) {
            if (error) throw error;
            resolve(1);
        });
    });
}

function DeleteUser(id)
{
    /*if (username.length == 0)
        return false;*/

    return new Promise(resolve => {
        connection.query('DELETE FROM users WHERE id=?', [id], function (error, results, fields) {
            if (error) throw error;
            resolve(1);
        });
    });
}

module.exports = { connection, GetUsers, GetUser, AddUser, UpdateUser, DeleteUser };
