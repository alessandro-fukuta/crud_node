const Sequelize = require("sequelize");
const connection = require("../database/database");
const Service = require("../services/services");
const Clientes = require("../clientes/clientes");


const Services = connection.define('services',{
    description: {
        type: Sequelize.STRING(50),
        allowNull:false 
    },identification: {
        type: Sequelize.STRING(30),
        allowNull:false
    },complaint: {
        type: Sequelize.TEXT,
        allowNull:false
    },forecast: {
        type: Sequelize.DATE,
        allowNull:false
    },warranty: {
        type: Sequelize.BOOLEAN,
        allowNull:false
    },labor_value: {
        type: Sequelize.DECIMAL(13,2),
        allowNull:false
    },value_products: {
        type: Sequelize.DECIMAL(13,2),
        allowNull:false
    },discount: {
        type: Sequelize.DECIMAL(13,2),
        allowNull:false
    },total_amount: {
        type: Sequelize.DECIMAL(13,2),
        allowNull:false
    },responsible: {
        type: Sequelize.STRING(30),
        allowNull:false
    }
    
});

// relacionamentos
//Category.hasMany(Clientes);    // 1 categoria tem muitos artigos
//Clientes.belongsTo(Category);  // relacionamento entre 1 artigo e a 1 categoria

Clientes.hasMany(Services);
Services.belongsTo(Clientes); 

//Services.sync({force: true});

module.exports = Services;
