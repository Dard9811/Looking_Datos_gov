var express = require("express");
var router = express.Router();
let MongoClient = require("mongodb").MongoClient;
let url = "mongodb+srv://daniel:dard9811@looking-pmave.mongodb.net/test?retryWrites=true&w=majority"; // mongodb+srv://daniel:dard9811@looking-pmave.mongodb.net/test?retryWrites=true&w=majority

const dbNombre = "looking";
const collection = "datos";

let con = MongoClient.connect(url, {useNewUrlParser:true});


function createDatos(content, callBack){
    con.then(client => {
        client.db(dbNombre).collection(collection).insertOne(content, (err, data) => {
            callBack(data)
        })
    })
}
function findDatos(callback){
    con.then(client => {
        client.db(dbNombre).collection(collection).find({}).toArray((err, data) => {
            callback(data)
        })
    })
}

function findUrl(url ,callback){
    con.then(client => {
        client.db(dbNombre).collection(collection).find({"url": url}).toArray((err, data) => {
            callback(data)
        })
    })
}

router.get("/getData", function(req,res,next){
    function callBack(data){
        res.json(data);
    }
    findDatos(callBack)
});

router.post("/getUrl", function(req,res,next){
    function callBack(data){
        res.json(data)
    }
    findUrl(req.body.url, callBack);
});

/* POST to mongo */
router.post("/addData", function(req, res, next) {
    function callBack(data){
        res.json(data)
    }
    let data = req.body;
    createDatos(data, callBack)
    console.log(req.body)
});

module.exports = router;
