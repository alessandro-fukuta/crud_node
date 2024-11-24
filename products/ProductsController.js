const express = require('express');
const router = express.Router();
const Clientes = require("../clientes/clientes");
const Groups = require('../groups/Group');
const Suppliers = require("../suppliers/suppliers");
const Brands = require("../brands/brand");
const Products = require("../products/Products");
const { transforma_valor } = require("../public/js/funcoes");

// index

router.get("/admin/products", (req,res) => {

    Products.findAll({
        include: [{model: Groups}],
        include: [{model: Brands}],
        order:['full_description']
    }).then(products => {
        res.render("admin/products/index.ejs",{products:products});
    })
  
});


// new

router.get("/admin/products/new", (req,res) => {

        Groups.findAll({
            order: ['title']
            }).then( groups => {
                Brands.findAll({
                    order: ['title']
                }).then( brands => {
                    res.render("admin/products/new.ejs", {groups: groups, brands:brands});
                 })
             })

})


// save - salvar o new

router.post("/admin/products/save", (req,res) => {

    var full_description = req.body.full_description;
    var resume_description = req.body.resume_description;
    var codebar = req.body.codebar;
    var unitypro = req.body.unitypro;
    var factory_code = req.body.factory_code;
    var current_cost = transforma_valor(req.body.current_cost);
    var average_cost = 0;
    var last_purchase = "2024-01-01";
    var last_exit = "2024-01-01";
    var last_client = 0;
    var price = transforma_valor(req.body.price);


    if( full_description != undefined ) {

    Products.create({
        full_description: full_description,
        resume_description: resume_description,
        codebar: codebar,
        unitypro: unitypro,
        factory_code: factory_code,
        current_cost: current_cost,
        average_cost: average_cost,
        last_purchase: last_purchase,
        last_exit: last_exit,
        last_client: last_client,
        price: price
    }).then(() => {
        res.redirect("/admin/products");
    })
    
    } else {
        //alert("Não pode ter nome vazio !");
        res.redirect("/admin/products/new");
    }

})








module.exports = router;