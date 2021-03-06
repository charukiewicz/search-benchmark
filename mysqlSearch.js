var mysql = require("mysql");
var fs = require('fs');
var config = require("./config");

var con = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});

con.connect(function(err) {
    if(err) {
        console.log("Error connection to MySQL");
        return;
    }
    console.log("Connection established");
});

var term = process.argv[2];
console.log("Searching for term: " + term);

console.time("SQL search");
con.query("SELECT * FROM words WHERE word LIKE ?", "%"+term+"%", function(err, resp) {
    console.timeEnd("SQL search");
    console.log(resp);
    process.exit();
});
