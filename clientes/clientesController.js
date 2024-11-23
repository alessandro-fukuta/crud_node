const express = require('express');
const router = express.Router();
const Clientes = require("./clientes");
const Category = require('../categories/Category');
const { pesquisacep } = require('../public/js/funcoes');

router.get("/admin/clientes", (req,res) => {
    Clientes.findAll({
        include: [{model: Category}],
        order:[
            ['nome']
        ]}).then(clientes => {
        res.render("admin/clientes/index", {clientes: clientes});
    });
});

router.get("/admin/clientes/new", (req,res) => {
        Category.findAll().then(category => {
            res.render("admin/clientes/new.ejs", {category: category});
        })
});

router.post("/clientes/save",(req,res) => {
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
    var genero = req.body.genero;
    var nomepai = req.body.nomepai;
    var nomemae = req.body.nomemae;
    var melhordia = req.body.melhordia;
    var categoryId = req.body.categoryId;
   
    var credito = req.body.credito.toString(); 
    credito = credito.replace(".", ""); // transforma valor em numero double
    credito = credito.replace(",", ".");
    credito = parseFloat(credito);

    var nascimento = req.body.nascimento;
    var cnh = req.body.cnh;
    var cnh_categoria = req.body.cnh_categoria;
    if(nome != undefined){

        // salvar no bd
        Clientes.create({
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
            genero: genero,
            nomepai: nomepai,
            nomemae: nomemae,
            melhordia: melhordia,
            credito: credito,
            nascimento: nascimento,
            cnh:cnh,
            cnh_categoria: cnh_categoria,
            categoryId: categoryId

        }).then(() => {
            res.redirect("/admin/clientes");
        })

    } else {
        //alert("Não pode ter nome vazio !");
        res.redirect("/admin/clientes/new");
    }

    
});


// rota editar

router.get("/admin/clientes/edit/:id", (req,res) => {

    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("/admin/clientes");
    }
   
    Clientes.findByPk(id).then(clientes => {

        Category.findAll().then(category => {

            if (clientes != undefined) {
                res.render("admin/clientes/edit",{clientes: clientes, category: category});
            } else {
                res.redirect("/admin/clientes");
            }
 
        })


    }).catch( erro => {
        res.redirect("/admin/clientes");
    })

});


// salvando o editar

router.post("/clientes/update", (req,res) => {
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
    var genero = req.body.genero;
    var nomepai = req.body.nomepai;
    var nomemae = req.body.nomemae;
    var melhordia = req.body.melhordia;
    
    var credito = req.body.credito.toString(); 
    //console.log(credito);
    credito = credito.replace(".", ""); // transforma valor em numero double
    credito = credito.replace(",", ".");

    var nascimento = "";

    if(req.body.nascimento === "") {

        nascimento = '2024-11-17 10:01:43';
 
    } else {

        nascimento = req.body.nascimento;

    }

    console.log("Hoje....:" + Date.now());
 
    var cnh = req.body.cnh;
    var cnh_categoria = req.body.cnh_categoria;
    var categoryId = req.body.categoryId;
    
    Clientes.update({
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
        genero: genero,
        nomepai: nomepai,
        nomemae: nomemae,
        melhordia: melhordia,
        credito: credito,
        nascimento: nascimento,
        cnh:cnh,
        cnh_categoria: cnh_categoria,
        categoryId: categoryId
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/clientes")
    })
})



module.exports = router;