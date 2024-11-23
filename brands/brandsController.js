const express = require('express');
const router = express.Router();
const Brands = require("./brand");

// rota para listar categorias
router.get("/admin/brands", (req,res) => {

    Brands.findAll({
        order: [
            ['title']
        ]
    }).then(brands => {
        res.render("admin/brands/index", { brands: brands});
    });

});

router.get("/admin/brands/new", (req,res) => {
    res.render("admin/brands/new");
})


router.post("/brands/save", (req,res) => {
    var title = req.body.title;
    if(title != undefined) {
        Brands.create({
            title: title
        }).then(() => {
            res.redirect("/admin/brands");
        })
    } else {
        res.redirect("/admin/brands/new");
    }
})


// rota para excluir-deletar

router.post("/admin/brands/delete", (req,res) => {

    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {

            Brands.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/brands")
            });

        } else {
            res.redirect("/admin/brands")
        }
    } else {
        res.redirect("/admin/brands")
    }

});

// rota editar

router.get("/admin/brands/edit/:id", (req,res) => {

    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("/admin/brands");
    }
   
    Brands.findByPk(id).then(brands => {

            if (brands != undefined) {
                res.render("admin/brands/edit",{brands: brands});
            } else {
                res.redirect("/admin/brands");
            }

    }).catch( erro => {
        res.redirect("/admin/brands");
    })

});


// rota update

router.post("/brands/update", (req, res) => {

    var id=req.body.id;
    var title = req.body.title;

    if(title != undefined) {

        Brands.update({
            title:title
        }, {
            where: {
                id: id
            }
        }).then(() => {
        res.redirect("/admin/brands");
        })
    }
})

module.exports = router;
