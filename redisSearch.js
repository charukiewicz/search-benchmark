var redis = require("redis");
var rd = redis.createClient();

var term = process.argv[2];
console.log("Searching for term: " + term);

console.time("Redis search");
rd.zrangebylex("search", "["+term+"", "["+term+"\xff", function(err, resp) {
    console.timeEnd("Redis search");
    console.log(resp);
    console.log("");
    console.log("Results found: " + resp.length);
    rd.zcard("search", function(err2, count) {
        console.log("Terms searched: " + count);
        process.exit();
    });
});
