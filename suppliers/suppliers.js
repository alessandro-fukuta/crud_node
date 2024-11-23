const Sequelize = require("sequelize");
const connection = require("../database/database");

const Suppliers = connection.define('suppliers',{
    nome: {
        type: Sequelize.STRING(50),
        allowNull:false 
    },endereco: {
        type: Sequelize.STRING,
        allowNull:false
    },bairro: {
        type: Sequelize.STRING(50),
        allowNull:false
    },cidade: {
        type: Sequelize.STRING(50),
        allowNull:false
    },estado: {
        type: Sequelize.STRING(2),
        allowNull:false
    },cep: {
        type: Sequelize.STRING(10),
        allowNull:false
    },celular: {
        type: Sequelize.STRING(20),
        allowNull:false
    },telefone: {
        type: Sequelize.STRING(20),
        allowNull:false
    },email: {
        type: Sequelize.STRING(100),
        allowNull:false
    },cpf_cnpj: {
        type: Sequelize.STRING(20),
        allowNull:false
    },rg_ie: {
        type: Sequelize.STRING(20),
        allowNull:false
    }
})


//Suppliers.sync({force: true});

module.exports = Suppliers;