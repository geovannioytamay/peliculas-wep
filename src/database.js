const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');
const { Console } = require('console');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
    else console.error('Otro error no importante:' + err);
  }
console.log("host:"+connection.config.host);
console.log("user:"+connection.config.user);
console.log("password:"+connection.config.password);
console.log("port:"+connection.config.port);
console.log("database:"+connection.config.database);

  if (connection) {
    connection.release();
    console.log('DB is Connected :)');
  }

  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;
