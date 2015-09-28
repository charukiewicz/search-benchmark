var redis = require("redis");
var rd = redis.createClient();
var fs = require('fs')

var array = fs.readFileSync('words.txt').toString().split("\n");
array = shuffle(array);
var arlen = array.length;
console.log("Adding " + arlen + " terms to index");
var it = 0;
for(i in array) {
    rd.zadd("search", 0, array[i], function(err, resp) {
        it += 1;
        if (it === arlen) {
            console.log("Done");
            process.exit();
        }
    });
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
