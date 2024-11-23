const express = require('express');
const router = express.Router();
const Clientes = require("../clientes/clientes");
const Groups = require('../groups/Group');
const Suppliers = require("../suppliers/suppliers");
const Brands = require("../brands/brand");
const Products = require("../products/Products");
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








module.exports = router;