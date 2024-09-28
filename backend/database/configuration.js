const mysql = require("mysql2");

const Database = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "digital",
  password: "Kiran@9951",
});
Database.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

module.exports = Database