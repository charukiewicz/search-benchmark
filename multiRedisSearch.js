var redis = require("redis");
var rd = redis.createClient();
var async = require("async");
var terms = require("./terms");

//var term = process.argv[2];
//console.log("Searching for term: " + term);


console.time("Redis search");
async.eachSeries(terms, function(term, callback) {
        rd.zrangebylex("search", "["+term+"", "["+term+"\xff", function(err, resp) {
            //console.log(resp);
            console.log("Results found: " + resp.length);
            callback();
        });

}, function done() {
    console.timeEnd("Redis search");
    process.exit();
});
