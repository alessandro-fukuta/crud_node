const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Clientes = connection.define('clientes',{
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
    },genero: {
        type: Sequelize.STRING(1),
        allowNull:false
    },nomepai: {
        type: Sequelize.STRING(50),
        allowNull:false
    },nomemae: {
        type: Sequelize.STRING(50),
        allowNull:false
    },melhordia: {
        type: Sequelize.INTEGER,
        allowNull:false
    },credito: {
        type: Sequelize.DECIMAL(13,2),
        allowNull:false
    },nascimento: {
        type: Sequelize.DATE,
        allowNull:false
    },cnh: {
        type: Sequelize.STRING(20),
        allowNull:false
    },cnh_categoria: {
        type: Sequelize.STRING(4),
        allowNull:false
    }
});

// relacionamentos
Category.hasMany(Clientes);    // 1 categoria tem muitos artigos
Clientes.belongsTo(Category);  // relacionamento entre 1 artigo e a 1 categoria

//Clientes.sync({force: true});

module.exports = Clientes;