const mysql = require('mysql');

var connection = mysql.createConnection({
<<<<<<< HEAD
  /*
=======
  
>>>>>>> 1acca4ae9793bb7b7743cca28b6743ef520b60a5
  host: '104.154.91.162',
  user: 'root',
  password: '963472',
  database: 'dictionary'
*/

  /*
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
*/
});

connection.connect();

module.exports = connection;
