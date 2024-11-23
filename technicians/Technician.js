const Sequelize = require("sequelize");
const connection = require("../database/database");

const Technician = connection.define('technicians',{
    nome: {
        type: Sequelize.STRING,
        allowNull:false 
    },celular: {
        type: Sequelize.STRING(20),
        allowNull:false
    },ativo: {
        type: Sequelize.BOOLEAN,
        allowNull:true
    }
})


//Technician.sync({force: true});

module.exports = Technician;