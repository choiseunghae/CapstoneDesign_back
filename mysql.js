const mysql = require('mysql');

var connection = mysql.createConnection({
  host: '104.154.91.162',
  user: 'root',
  password: '963472',
  database: 'dictionary'
});

connection.connect();

module.exports = connection;
