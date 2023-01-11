const express = require('express');
var https = require('https')

var router = express.Router();

router.get("/weatherform", function(req, res, next){
    res.render("weatherform")
});

var getting = function(req,res, next){
    // req.body
    let lat = req.body.lat
    let lon = req.body.long
    res.locals.lon = lon
    res.locals.lat = lat
    next();
}

var httprequest = function(req,res, next){
    var url1 = 'https://api.weather.gov/points/'
    url1 = url1+res.locals.lat +","+res.locals.lon
    console.log("LatLon URL:\n"+url1+"\n")
    var options = {
        headers : {
            'User-Agent': 'request'
        }
    }
    https.get(url1, options, function(response){
        var rawData = '';

        response.on('data', function(chunk) {
            rawData += chunk;
        });

        response.on('end', function() {
            // console.log(rawData)
            var loc = JSON.parse(rawData);
            console.log("LatLon Data:\n");
            console.log(loc)
            if(loc.type.includes("problems")){
                console.log("Found Invalid Point")
                res.render("weather", {"out":[], "valid": false})
                return
            }
            console.log("Valid LATLON")
            res.locals.forecast = loc.properties.forecast
            if(res.locals.forecast == null){
                res.render("weather", {"out":[], "valid": false})
                return
            }

            res.locals.valid = true;
            next();
        });

    }).on('error', function(e) {
        console.error(e);
    });
    
}

var forecastreq = function(req, res, next){
    // console.log(res.locals.forecast)
    var options = {
        headers : {
            'User-Agent': 'request'
        }
    }
    https.get(res.locals.forecast, options, function(response){
        var rawData = '';

        response.on('data', function(chunk) {
            rawData += chunk;
        });

        response.on('end', function() {
            // console.log(rawData)
            var loc = JSON.parse(rawData);
            console.log("Forecast Data:\n");
            console.log(loc)
            if(loc.type.includes("problems")){
                console.log("Found Invalid Point")
                res.render("weather", {"out":[], "valid": false})
                return
            }
            console.log("Valid URLs");
            res.locals.periods = loc.properties.periods

            next();
        });

    }).on('error', function(e) {
        console.error(e);
    });
}

var ren = function(req, res, next){
    // var valid = true
    if(res.locals.valid){
        var out = res.locals.periods
    }
    else{
        var out = []
    }
    console.log(out)
    // console.log(out.forecastlink)
    // console.log(out)
    res.render("weather", {"out":out, "valid": res.locals.valid})
}

router.post("/getweather", 
    [getting, httprequest, forecastreq,ren]
);

module.exports = router;