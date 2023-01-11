const express = require('express');
var https = require('https')

const fs = require('fs')
const path = require('path')

var router = express.Router();

function init_session_cookies(req,res,next) {
    // if (!('clicks' in req.session)) {                    // are gas points in this session cookie?
    //   req.session.clicks = 0;                            //   if not, initialize to zero
    // }
  
    if (!('visits' in req.session)) {                 // are books in this session cookie?
      req.session.visits = 0;                         //   if not, initialize to zero
    }
    if (!('ohyoureloggedin' in req.session)) {                 // are books in this session cookie?
        req.session.ohyoureloggedin = false;                         //   if not, initialize to zero
      }
    next()
}

router.get('/login', function(req, res){
    req.session.ohyoureloggedin = true;
    console.log(req.session)
    res.json({"hi":5});
});
router.get('/cookies', [init_session_cookies], function(req,res){
    let clicks;
    let visits;
    console.log(req.session);
    if (!('clicks' in req.cookies)) {
        clicks = 0;                                       // create a default value
    }  else {
        clicks = Number(req.cookies.clicks);              // pass through (but you could do something else)
    }
    res.cookie('clicks', clicks)      // initialize cookie with default (or pass through)
    // console.log(req.session.visits)
    req.session.visits = req.session.visits+1;
    visits = req.session.visits;
    console.log(req.session.ohyoureloggedin)
    if(req.session.visits > 5 && !req.session.ohyoureloggedin){
        return res.render('cookiesblocked');
    }
    console.log(visits);

    var params = {
        'clicks':clicks,
        "visits":visits
    }

    res.render('cookies', params)
})

module.exports = router;