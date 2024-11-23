const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const clientesController = require("./clientes/clientesController");
const categoriesController = require("./categories/CategoriesController");
const techniciansController = require("./technicians/TechniciansController");
const brandsController = require("./brands/brandsController");
const manpowersController = require("./manpowers/manpowersController");
const groupsController = require("./groups/GroupsController");
const servicesController = require("./services/servicesController");
const suppliersController = require("./suppliers/suppliersController");
const productsController = require("./products/ProductsController");

const Clientes = require("./clientes/clientes");
const Category = require("./categories/Category");
const Technician = require("./technicians/Technician");
const Brands = require("./brands/brand");
const ManPowers = require("./manpowers/manpowers");
const Groups = require("./groups/Group");
const Services = require("./services/services");
const Suppliers = require("./suppliers/suppliers");
const Products = require("./products/Products");

//const Funcoes = require("./public/js/funcoes");

process.env.TZ = 'America/Sao_Paulo';

// dizendo para o express utilizar ejs como engine (html)
app.set('view engine', 'ejs');

app.use(express.static('public'));

// body parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// banco de dados (conexao)

// database

connection
    .authenticate()
    .then(() => {
        console.log("Banco de dados, conectado com sucesso !");
    }).catch((error) => {
        console.log(error);
    })

    // rotas
    
    
    app.use("/",clientesController);
    app.use("/",categoriesController);
    app.use("/",techniciansController);
    app.use("/",brandsController);
    app.use("/",manpowersController);
    app.use("/",groupsController);
    app.use("/",servicesController);
    app.use("/",suppliersController);
    app.use("/",productsController);


// --------------------- rotas



app.get("/", (req,res) => {
    res.render("index");
})




// escuta

app.listen(3001, () => {
    console.log("o servidor esta rodando na porta 3001.............");
});

