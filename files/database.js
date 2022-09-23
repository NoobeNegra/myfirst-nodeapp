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

module.exports = { connection, GetUsers };
