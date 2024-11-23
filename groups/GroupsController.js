const express = require('express');
const router = express.Router();
const Group = require("./Group");


router.get("/admin/groups/new", (req,res) => {
    res.render("admin/groups/new.ejs");
});

router.post("/groups/save",(req,res) => {
    var title = req.body.title;
    var insumo = req.body.insumo;
    if(insumo=='on') {
        insumo=true;
    } else {
        insumo=false;
    }
    if(title != undefined){

        // salvar no bd
        Group.create({
            title: title,
            insumo: insumo
        }).then(() => {
            res.redirect("/admin/groups");
        })

    } else {
        //alert("Não pode ter nome vazio !");
        res.redirect("/admin/groups/new");
    }
});

// rota para listar categorias
router.get("/admin/groups", (req,res) => {

    Group.findAll({
        order:['title']
    }).then(groups => {
        res.render("admin/groups/index", { groups: groups});
    });
 
});

// rota para excluir-deletar

router.post("/admin/groups/delete", (req,res) => {

    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {

            Group.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/groups")
            });

        } else {
            res.redirect("/admin/groups")
        }
    } else {
        res.redirect("/admin/groups")
    }

});

// rota editar

router.get("/admin/groups/edit/:id", (req,res) => {

    var id = req.params.id;
    
    if(isNaN(id)){
        res.redirect("/admin/groups");
    }
   
    Group.findByPk(id).then(group => {

        if (group != undefined) {
               res.render("admin/groups/edit",{group: group});
         } else {
            res.redirect("/admin/groups");
        }


    }).catch( erro => {
        res.redirect("/admin/groups");
    })

});


// salvando o editar

router.post("/groups/update", (req,res) => {
    
    var id = req.body.id;
    var title = req.body.title;
    var insumo = req.body.insumo;

    console.log(insumo);

    if(insumo==='on') {
        insumo=true;
    } else {
        insumo=false;
    }

    Group.update({
        title: title,
        insumo: insumo 
        }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/groups")
    })
})


module.exports = router;
