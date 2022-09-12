const express = require('express');
var router = express.Router();



router.get('/madlibs', function(req, res){

    res.render('madlibs');
});

router.post('/madlibsresults', function(req, res){
    // console.log(req.query)
    
    var q = req.body
    let madLib = "There was once a person named {madlibname}. They lived in a very big mansion, and their favorite color was {color}. They really enjoyed gardening, but they looked like a {beast}. \
    It was very clear that they loved to visit {n1}, and every time they did, they {v1}";
    madLib = madLib.replace("{madlibname}", q['madlibname'])
    madLib = madLib.replace("{color}", q['color'])
    madLib = madLib.replace("{beast}", q['beast'])
    madLib = madLib.replace("{n1}", q['n1'])
    madLib = madLib.replace("{v1}", q['v1'])
    if(q['beast']=="ur mom"){
        q['beast'] = "ur_mom"
    }
    let words = {
        "madlib":madLib,
        "imgpath": "img/"+q['beast']+".png"
    }

    res.render('mlresults', words);
});



module.exports = router;