const express = require('express');
const router = express.Router();
const ManPowers = require("./manpowers");


router.get("/admin/manpowers", (req,res) => {
    ManPowers.findAll().then( Manpower => {
        res.render("admin/manpowers/index",{ Manpower: Manpower});
    })
})

router.get("/admin/manpowers/new", (req,res) => {
    res.render("admin/manpowers/new.ejs");
});

router.post("/admin/manpowers/save", (req,res) => {
    var title = req.body.title;
    var valor = req.body.valor.toString();
    valor = valor.replace(".", ""); // transforma valor em numero double
    valor = valor.replace(",", ".");
    if (title != undefined) {
    ManPowers.create({
        title: title,
        valor: valor
    }).then(() => {
        res.redirect("/admin/manpowers");
    }) 
    } else {
        res.redirect("/admin/manpowers");
    }
})

router.get("/admin/manpowers/edit/:id", (req,res) => {

    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/clientes");
    }
   
    ManPowers.findByPk(id).then(manpowers => {

            if (manpowers != undefined) {
                res.render("admin/manpowers/edit",{manpowers: manpowers});
            } else {
                res.redirect("/admin/manpowers");
            }

    }).catch( erro => {
        res.redirect("/admin/manpowers");
    })
})


// salvando o editar

router.post("/admin/manpowers/update", (req,res) => {
    var id = req.body.id;
    var title = req.body.title;
    
    var valor = req.body.valor.toString(); 
    valor = valor.replace(".", ""); // transforma valor em numero double
    valor = valor.replace(",", ".");

    ManPowers.update({
        title: title,
        valor: valor,
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/manpowers")
    })
})


// rota para excluir-deletar

router.post("/admin/manpowers/delete", (req,res) => {

    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {

            ManPowers.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/manpowers")
            });

        } else {
            res.redirect("/admin/manpowers")
        }
    } else {
        res.redirect("/admin/manpowers")
    }

});






module.exports = router;