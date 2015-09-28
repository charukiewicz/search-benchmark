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

var term = process.argv[2];
console.log("Searching for term: " + term);

console.time("SQL search");
con.query("SELECT * FROM words WHERE word LIKE ?", "%"+term+"%", function(err, resp) {
    console.timeEnd("SQL search");
    console.log(resp);
    process.exit();
});
