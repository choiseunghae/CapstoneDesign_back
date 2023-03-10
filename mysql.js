var mysql = require('mysql');
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : '963472',
database : 'capstone'
});

connection.connect();

connection.query('query', function(error, results, fields){
    if(error) {
    console.log(error);
    };
    console.log(results);
    });
    
    connection.end();