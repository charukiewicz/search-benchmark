var mysql = require("mysql");
var fs = require('fs')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "search"
});

con.connect(function(err) {
    if(err) {
        console.log("Error connection to MySQL");
        return;
    }
    console.log("Connection established");
});

var array = fs.readFileSync('words.txt').toString().split("\n");
array = shuffle(array);
var arlen = array.length;
console.log("Adding " + arlen + " terms to index");
var it = 0;
for(i in array) {
    var word = { word: array[i] };
    con.query("INSERT INTO words SET ?", word, function(err, resp) {
        it += 1;
        if (it === arlen) {
            console.log("Done");
            process.exit();
        }
    });
}

// from stackoverflow
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
