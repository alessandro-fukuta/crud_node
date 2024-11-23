const Sequelize = require("sequelize");

const connection = new Sequelize('crud','fukuta','fpc250272#', {
    host: '192.168.1.8',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;




