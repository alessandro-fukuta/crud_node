const Sequelize = require("sequelize");
const connection = require("../database/database");
const Clientes = require("../clientes/clientes");
const Grupos = require("../groups/Group");
const Brands = require("../brands/brand");
const Group = require("../groups/Group");


const Products = connection.define('products',{
    full_description: {
        type: Sequelize.STRING(50),
        allowNull:false 
    },resume_description: {
        type: Sequelize.STRING(20),
        allowNull:true
    },codebar: {
        type: Sequelize.STRING(30),
        allowNull:true
    },unitypro: {
        type: Sequelize.STRING(2),
        allowNull:false
    },factory_code: {
        type: Sequelize.STRING(30),
        allowNull:true
    },current_cost: {
        type: Sequelize.DECIMAL(13,2),
        allowNull:false
    },average_cost: {
        type: Sequelize.DECIMAL(13,2),
        allowNull:false
    },last_purchase: {  // ultima compra
        type: Sequelize.DATE(),
        allowNull:true
    },last_exit: {      // ultima saida
        type: Sequelize.DATE(),
        allowNull:true
    },last_client: {      // ultima saida
        type: Sequelize.INTEGER,
        allowNull:true
    },price: {
        type: Sequelize.DECIMAL(13,2),
        allowNull:true
    }
});

// relacionamentos
Clientes.hasMany(Products);    
Products.belongsTo(Clientes);  

Brands.hasMany(Products);
Products.belongsTo(Brands);

Group.hasMany(Products);
Products.belongsTo(Group);

// cria a tabela do banco de dados

//Products.sync({force: true});


// exporta o modulo products

module.exports = Products;