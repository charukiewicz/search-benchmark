var mysql = require("mysql");
var fs = require('fs');
var async = require("async");
var terms = require("./terms");
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
        console.log(err);
        return;
    }
    console.log("Connection established");
});

console.time("SQL search");

async.eachSeries(terms, function(term, callback) {
    con.query("SELECT * FROM words WHERE word LIKE ?", ""+term+"%", function(err, resp) {
        callback();
    });
}, function done() {
    console.timeEnd("SQL search");
    process.exit();
});
