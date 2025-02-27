const dotenv = require("dotenv");
dotenv.config();

const config = {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'pyroHackathon',
    port: process.env.MYSQL_PORT || 3306,
};

module.exports = config;
