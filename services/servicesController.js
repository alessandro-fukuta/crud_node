const express = require('express');
const router = express.Router();
const Clientes = require("../clientes/clientes");
const Services = require('../services/services');


router.get("/admin/services/new",(req,res) => {
    res.render("admin/services/new");
})


module.exports = router;