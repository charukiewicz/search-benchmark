var redis = require("redis");
var rd = redis.createClient();
var async = require("async");
var terms = require("./terms");

console.time("Redis search");
async.eachSeries(terms, function(term, callback) {
        rd.zrangebylex("search", "["+term+"", "["+term+"\xff", function(err, resp) {
            callback();
        });

}, function done() {
    console.timeEnd("Redis search");
    process.exit();
});
