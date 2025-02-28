const mysql = require("mysql2");
const config = require("./mysqlConfig");

const connectDB = async () => {
  const pool = mysql.createPool(config);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      return; 
    }

    console.log("Connected to MySQL database");

    if (connection) {
      connection.release();
    }
  });
};

module.exports = connectDB;
