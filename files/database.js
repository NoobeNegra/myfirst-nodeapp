const mysql = require('mysql');

let connection = mysql.createConnection({
    host: "db",
    user: "user",
    password: "mypass",
    database: "test_ailin"
});

function getUsers()
{
    return new Promise(resolve => {
        connection.query('SELECT * FROM users ORDER BY id ASC', function (error, results) {
            if (error) throw error;
            resolve(results);
        });
    });
}

function getUser(field, id)
{
    return new Promise(resolve => {
        let query = connection.query('SELECT * FROM users WHERE ?? = ?', [field, id], function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        });
        console.log(query.sql);
    });
}

function addUser(username)
{
    return new Promise(resolve => {
        let post  = {name: username};
        connection.query('INSERT INTO users SET ?', post, function (error, results, fields) {
            if (error) throw error;
            resolve(1);
        });
    });
}

function updateUser(user)
{
    return new Promise(resolve => {
        connection.query('UPDATE users SET name = ? WHERE id = ?', [user.name, user.id], function (error, results, fields) {
            if (error) throw error;
            resolve(1);
        });
    });
}

function deleteUser(id)
{
    return new Promise(resolve => {
        connection.query('DELETE FROM users WHERE id=?', [id], function (error, results, fields) {
            if (error) throw error;
            resolve(1);
        });
    });
}

module.exports = { connection, getUsers, getUser, addUser, updateUser, deleteUser };
