// const config = require('../helpers/constants');
const knex = require('knex');
require('dotenv').config();

module.exports = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    migrations: {
        directory: '../migrations', // Directory to store migration files
    },
})
// console.log(config.dbconfig);