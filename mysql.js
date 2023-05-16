const mysql = require('mysql');

var connection = mysql.createConnection({

<<<<<<< HEAD
host: '104.154.91.162',
user: 'root',
password: '963472',
database: 'dictionary'
=======
  /*
  host: '104.154.91.162',
  user: 'root',
  password: '963472',
  database: 'dictionary'
*/
>>>>>>> 49846014361d60cc5bbfda801c6be097f907f88f

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME

});

connection.connect();

module.exports = connection;
