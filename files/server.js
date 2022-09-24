'use strict';

// Constants
const PORT      = 8080;
const HOST      = '0.0.0.0';
const VIEWS     = __dirname + '/views/';
const PUBLIC    = __dirname + '/public/';

// Router configuration
let express     = require('express');
let app         = express();
let router      = express.Router();
let bodyParser  = require('body-parser');
let user        = require('./user');

// Base URL
router.get("/",function(req,res){
    return res.status(200).sendFile(VIEWS+"index.html");
});

// get all users
router.get("/get-users", async (req, res, next) =>{
    res.status(200).send(await user.list());
});

// get user by id
router.get("/user/:id", async (req, res, next) =>{
    res.status(200).send(await user.get(req.params.id));
});

// add a new user
router.post("/add-user", async (req, res, next) =>{
    res.status(200).send(await user.add(req.body));
});

// update user
router.put("/user/:id", async (req, res, next) =>{
    res.status(200).send(await user.update(req.params.id, req.body));
});

// delete
router.delete("/user/:id", async (req, res, next) =>{
    await user.deleteUser(req.params.id)
    res.status(200).send("ok");
});

app.use(express.static(VIEWS));
app.use(express.static(PUBLIC));
app.use(bodyParser.json());
app.use("/", router);

app.listen(PORT, HOST);

console.log(`All good and running on http://${HOST}:${PORT}`);




