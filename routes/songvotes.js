const express = require('express');
var https = require('https')
var mysql = require('mysql');

var router = express.Router();

var pool =  mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'snsnnine',
    database : 'web'
});    

function sqlPromise(pool, sqlQuery, params) {
    return new Promise(function(resolve,reject){
        pool.query(sqlQuery,params, function(error,results,fields){
            if (error) throw error;
            console.log("updated")
            console.log(results)
            resolve(results)
        })
    })
}

router.get("/melodicblue", function(req, res){
    var sqlQuery = 'SELECT * from melodicblue;'
    pool.query(sqlQuery, function(error,results,fields){
        if (error) throw error;
        console.log("queried")
        console.log(results)
        results.forEach(function(elem) {
            console.log(elem['songname'])
        });
        res.render("songform", {'results': results})
        
    })
});

var update = async function(req, res,next){
    console.log(req.body)
    var sqlQuery = 'update melodicblue set votes=votes+1 where songname = ?;'
    console.log(sqlQuery)
    
    let k = await sqlPromise(pool, sqlQuery, [req.body['songselect']])
    next();
    // res.render("songresults")
}

var display = function(req, res){
    console.log("in song results")
    var sqlQuery = 'SELECT * from melodicblue;'
    pool.query(sqlQuery, function(error,results,fields){
        if (error) throw error;
        console.log("queried")
        console.log(results)
        results.forEach(function(elem) {
            console.log(elem['songname'])
        });
        res.render("songresults", {'results': results})
    })
}

router.post("/songresults", [update, display]);

module.exports = router;