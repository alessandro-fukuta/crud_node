// mão de obra

const Sequelize = require("sequelize");
const connection = require("../database/database");

const Brands = connection.define('brands',{
    title: {
        type: Sequelize.STRING(50),
        allowNull:false 
    }, logo: {
        type: Sequelize.BLOB,
        allowNull:true
    }
})


//Brands.sync({force: true});

module.exports = Brands;