const Sequelize = require("sequelize");
const connection = require("../database/database");

const Group = connection.define('groupspro',{
    title: {
        type: Sequelize.STRING,
        allowNull:false 
    },insumo: {
        type: Sequelize.BOOLEAN,
        allowNull:true
    }
})


//Group.sync({force: true});

module.exports = Group;