const express = require('express');
const router = express.Router()

router.get('/numform', function(req, res){
    res.render('numform');
});

router.post('/numreroute', function(req, res){
    let destination_number = req.body.number
    let redirect_url = '/number/' + destination_number
    console.log(redirect_url)
    res.redirect(redirect_url)
});

router.get('/:num', function(req, res){
    let num = req.params.num
    console.log(num)
    let num69 = num*69
    let num420 = num*420

    steez = {
        "num": num,
        "num69": num69,
        "num420":num420
    }

    if ('format' in req.query) {
        if (req.query.format == 'json') {
          res.json(steez);
          return
        }
    }

    res.render('numdisplay', steez)

});

module.exports = router;