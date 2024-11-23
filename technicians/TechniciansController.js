const express = require('express');
const router = express.Router();
const Technician = require("./Technician");

router.get("/admin/technicians/new", (req,res) => {
    res.render("admin/technicians/new.ejs");
});

router.post("/technicians/save",(req,res) => {
    var nome = req.body.nome;
    var ativo = req.body.ativo;
    if(ativo==="on"){
        ativo = true;
    } else {
        ativo = false;
    }
    var celular = req.body.celular;
    if(nome != undefined){
        // salvar no bd
        Technician.create({
            nome: nome,
            ativo: ativo,
            celular: celular
        }).then(() => {
            res.redirect("/admin/technicians");
        })

    } else {
        //alert("Não pode ter nome vazio !");
        res.redirect("/admin/technicians/new");
    }
});

// rota para listar tecnicos
router.get("/admin/technicians", (req,res) => {

    Technician.findAll({
        order:['nome']
    }).then(technicians => {
        res.render("admin/technicians/index", { technicians: technicians});
    });
 
});

// rota para excluir-deletar

router.post("/admin/technicians/delete", (req,res) => {

    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {

            Technician.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/technicians")
            });

        } else {
            res.redirect("/admin/technicians")
        }
    } else {
        res.redirect("/admin/technicians")
    }

});

// rota editar

router.get("/admin/technicians/edit/:id", (req,res) => {

    var id = req.params.id;
    
    if(isNaN(id)){
        res.redirect("/admin/technicians");
    }
   
    Technician.findByPk(id).then(technician => {

        if (technician != undefined) {
               res.render("admin/technicians/edit",{technician: technician});
         } else {
            res.redirect("/admin/technicians");
        }


    }).catch( erro => {
        res.redirect("/admin/technicians");
    })

});


// salvando o editar

router.post("/technicians/update", (req,res) => {
    
    var id = req.body.id;
    var nome = req.body.nome;
    var celular = req.body.celular;
    var ativo = req.body.ativo;
    if(ativo==="on") {
        ativo = true;
    } else {
        ativo = false;
    }
    Technician.update({
        nome: nome, 
        celular: celular,
        ativo: ativo
        }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/technicians")
    })
})


module.exports = router;
