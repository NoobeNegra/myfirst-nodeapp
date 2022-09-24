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
    return res.status(200).send(await user.list());
});

// get user by id
router.get("/user/:id", async (req, res, next) =>{
    try {
        let requested = await user.get(req.params.id);
        return res.status(200).send(requested);
    }
    catch (error)
    {
        return res.status(500).send(error.toString());
    }
});

// add a new user
router.post("/add-user", async (req, res, next) =>{
    try {
        let added = await user.add(req.body);
        return res.status(200).send(added);
    }
    catch (error)
    {
        return res.status(500).send(error.toString());
    }
});

// update user
router.put("/user/:id", async (req, res, next) =>{
    try {
        let updated = await user.update(req.params.id, req.body);
        return res.status(200).send(updated);
    }
    catch (error)
    {
        return res.status(500).send(error.toString());
    }
});

// delete
router.delete("/user/:id", async (req, res, next) =>{
    try {
        let deleted = await user.deleteUser(req.params.id)
        return res.status(200).send(deleted);
    }
    catch (error)
    {
        return res.status(500).send(error.toString());
    }
});

app.use(express.static(VIEWS));
app.use(express.static(PUBLIC));
app.use(bodyParser.json());
app.use("/", router);

app.listen(PORT, HOST);

console.log(`All good and running on http://${HOST}:${PORT}`);




