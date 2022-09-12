var express = require('express')
var app = express();
var ejs = require('ejs');
ejs.open = '{{';
ejs.close = '}}';

app.set('view engine','ejs')

app.use(
    express.static('static_files')
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const home = require('./routes/madlibs.js')
app.use(home);

let count = 0;

let labs = {
    "labs":[
        {
            "name": "Coin Flipper",
            "labname": "/flip"
        },
        {
            "name": "Schedule",
            "labname": "/schedule"
        },
        {
            "name": "MadLibs",
            "labname": "/madlibs"
        },
    ]
    
};

// res.render('nav', labs);

app.get('/', function(req,res){
    count++;
    var obj = {'visitor':count}
    console.log(obj)
    res.render('home', obj );
});


app.get('/labs', function(req, res){
    res.render("labs", labs);
});

app.get('/flip', function(req, res){
    if (Math.random() >0.5){
        res.render('win');
    }else{
        res.render('lose');
    }
});

app.get('/schedule', function(req, res){
    let sched = {
        "count": 110,
        "next": "https://ion.tjhsst.edu/api/schedule?page=5",
        "previous": "https://ion.tjhsst.edu/api/schedule?page=3",
        "results": [
            {
                "url": "https://ion.tjhsst.edu/api/schedule/2022-09-01",
                "date": "2022-09-01",
                "day_type": {
                    "name": "Blue Day",
                    "special": false,
                    "blocks": [
                        {
                            "order": 1,
                            "name": "Period 1",
                            "start": "8:40",
                            "end": "10:15"
                        },
                        {
                            "order": 2,
                            "name": "Period 2",
                            "start": "10:25",
                            "end": "12:00"
                        },
                        {
                            "order": 3,
                            "name": "Lunch",
                            "start": "12:00",
                            "end": "12:40"
                        },
                        {
                            "order": 4,
                            "name": "Period 3",
                            "start": "12:40",
                            "end": "14:15"
                        },
                        {
                            "order": 5,
                            "name": "Period 4",
                            "start": "14:25",
                            "end": "16:00"
                            }
                        ]
                    }
                }
            ]
        };
    sched.results[0].day_type.blocks.forEach(function(elem){
        console.log(elem)
    })
    res.render('schedule', sched);
});

// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});