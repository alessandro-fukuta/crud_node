// mão de obra

const Sequelize = require("sequelize");
const connection = require("../database/database");

const Manpowers = connection.define('manpowers',{
    title: {
        type: Sequelize.STRING(50),
        allowNull:false 
    },valor: {
        type: Sequelize.DECIMAL(13,2),
        allowNull:false
    }
})


//Manpowers.sync({force: true});

module.exports = Manpowers;