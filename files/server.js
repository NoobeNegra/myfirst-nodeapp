'use strict';

const express = require('express');
const myDatabase = require('./database');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// app & router
const app = express();
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

//const router = express.Router();

/*app.use(function (req,res,next) {
    console.log("/" + req.method);
    console.log(req.params);
});*/

// index
app.get("/",function(req,res){
    (async() => {
        let users = await myDatabase.GetUsers();
        res.send({ result: users })
    })();
});

// get one user
app.get("/users/:id",function(req,res){
    (async() => {
        let user = await myDatabase.GetUser(req.params.id);
        res.send({ result: user })
    })();
});

// add a new user
app.post('/add-user', (req, res) => {
    (async() => {
        let isNew = await myDatabase.AddUser("aname");
        res.send({ result: isNew })
    })();
});

// update user info
app.post('/update-user/:id/:name', (req, res) => {
    (async() => {
        let isNew = await myDatabase.UpdateUser({id:4, name:"Rachel"});
        res.send({ result: isNew })
    })();
});

// delete user
app.get('/delete-user/:id', (req, res) => {
    (async() => {
        let isNew = await myDatabase.DeleteUser(req.params.id);
        res.send({ result: isNew })
    })();
});



