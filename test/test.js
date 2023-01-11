var https = require('https');
var url = 'https://ion.tjhsst.edu/api/schedule?format=json&page=3'


var options = {}

https.get(url, options, function(response) {
  var rawData = '';

  response.on('data', function(chunk) {
    rawData += chunk;
  });

  response.on('end', function() {
    var schedule = JSON.parse(rawData);
    console.log( schedule.results[0].day_type.name );
  });

}).on('error', function(e) {
  console.error(e);
});