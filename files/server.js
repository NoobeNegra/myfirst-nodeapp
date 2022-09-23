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



