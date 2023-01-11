const express = require('express');
var https = require('https')

const fs = require('fs')
const path = require('path')


const all_words = fs.readFileSync("./data/enable.txt").toString().split('\n')

var router = express.Router();

router.get('/scrabble', function(req,res){
    res.render('scrabble')
})

router.post('/scrabblejson', async function(req, res){
    console.log(req.body);
    console.log("k")
    console.log(req.body.word)
    var re = new RegExp("^"+req.body.word+"$")
    // res.json({"arr": all_words})
    console.log(re)
    var searched = []
    all_words.forEach(function(elem){
        if(re.exec(elem)!=null){
            searched.push(elem)
        }
    }) 
    console.log(searched)   
    res.json({"possiblewords":searched})
})


module.exports = router;