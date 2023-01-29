const {Sequelize} = require('sequelize');//Sequelize es un ORM para Nodejs que nos permite manipular varias bases de datos SQL de una manera bastante sencilla,
const db = new Sequelize({
    dialect: process.env.DB_DIALECT,
    host:  process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    logging: false,
  });
  
  module.exports = { db };