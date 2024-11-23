const express = require('express');
const router = express.Router();
const Suppliers = require("./suppliers");
const { pesquisacep } = require('../public/js/funcoes');

router.get("/admin/suppliers", (req,res) => {
   
        Suppliers.findAll(
            {
                order: ['nome']
            }
        ).then(suppliers => {

            res.render("admin/suppliers/index", {suppliers: suppliers});
   
        })

});

router.get("/admin/suppliers/new", (req,res) => {
        
            res.render("admin/suppliers/new.ejs" );
       
});

router.post("/suppliers/save",(req,res) => {
    var nome = req.body.nome; 
    var endereco = req.body.endereco;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var estado = req.body.estado;
    var cep = req.body.cep;
    var telefone = req.body.telefone;
    var celular = req.body.celular;
    var email = req.body.email;
    var cpf_cnpj = req.body.cpf_cnpj;
    var rg_ie = req.body.rg_ie;
    
    if(nome != undefined){

        // salvar no bd
        Suppliers.create({
            nome: nome,
            endereco: endereco,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            cep: cep,
            telefone: telefone,
            celular: celular,
            email: email,
            cpf_cnpj: cpf_cnpj,
            rg_ie: rg_ie,
    
        }).then(() => {
            res.redirect("/admin/suppliers");
        })

    } else {
        //alert("Não pode ter nome vazio !");
        res.redirect("/admin/suppliers/new");
    }

    
});


// rota editar

router.get("/admin/suppliers/edit/:id", (req,res) => {

    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("/admin/suppliers");
    }
   
    Suppliers.findByPk(id).then(suppliers => {

            if (suppliers != undefined) {
                res.render("admin/suppliers/edit",{suppliers: suppliers});
            } else {
                res.redirect("/admin/suppliers");
            }
 
    }).catch( erro => {
        res.redirect("/admin/suppliers");
    })

});


// salvando o editar

router.post("/suppliers/update", (req,res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var cpf_cnpj = req.body.cpf_cnpj;
    var rg_ie =  req.body.rg_ie;
    var endereco = req.body.endereco;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var estado = req.body.estado;
    var cep = req.body.cep;
    var telefone = req.body.telefone;
    var celular = req.body.celular;
    var email = req.body.email;
    
    Suppliers.update({
        nome: nome,
        cpf_cnpj: cpf_cnpj,
        rg_ie: rg_ie,
        endereco: endereco,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        cep: cep,
        telefone: telefone,
        celular: celular,
        email: email,
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/suppliers")
    })
})



module.exports = router;