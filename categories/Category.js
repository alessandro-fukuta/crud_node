const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define('categories',{
    title: {
        type: Sequelize.STRING,
        allowNull:false 
    },mensalidade: {
        type: Sequelize.DECIMAL(13,2),
        allowNull:false
    }
})


//Category.sync({force: true});

module.exports = Category;