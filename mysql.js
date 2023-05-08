const mysql = require('mysql');

var connection = mysql.createConnection({
<<<<<<< HEAD
=======
  
>>>>>>> 8cf29c1f2a85a147c5023f431f7e8fcb66353d4d
  host: '104.154.91.162',
  user: 'root',
  password: '963472',
  database: 'dictionary'
<<<<<<< HEAD
=======

  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME

>>>>>>> 8cf29c1f2a85a147c5023f431f7e8fcb66353d4d
});

connection.connect();

module.exports = connection;
