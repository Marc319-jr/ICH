let fs = require('fs');
const { findByPk, findAll } = require('../models/Search');
const Search = require('../models/Search');
const { search } = require('../routes/indexRouter');

const controller = {
    //Rendericacios a vistas generales (GET)
    byCar: (req,res) => {
        console.log("Vista de todos los autos");
        let autos = Search.findAll();
        res.render('./search/carType' , {'autos': autos}); 
    },

    byCarMake: (req,res) => {
        console.log("Vista de todos los modelo");
        let id = req.query.id;
        let auto = Search.findByPk(id);
        res.render("./search/carMake" , {'auto':auto});
    },

    //Rederizacion a vistas de adicion (GET)
    addCar: (req,res) => {
        console.log("Renderizando a crear una marca");
        res.render('./search/addCar')
    },

    addModel: (req,res) => {
        console.log("Renderizando a crear un modelo");
        let id = req.params.id;
        let autos = Search.findAll();
        let auto = autos[(id-1)]
        res.render("./search/addModel" , {'auto' : auto} );
    },

    //Creacio de cosas (POST)
    createCar: (req,res) =>{
        console.log("Creando un auto!");
        let autos = Search.findAll();
        let auto = {
            id: autos.pop().id +1,
            nombre : req.body.nombre,
            imagen : req.file.filename,
            modelos : []
        }
        Search.create(auto);
        res.redirect('./byCar');
    },

    createModel: (req,res) => {
        console.log("creando modelos");
        let id = req.params.id;
        console.log(id);
        let autos = Search.findAll();
        console.log(autos);
        console.log("ahora a lee el body");
        let modelos = req.body.modelos.split(',');
        autos[(id-1)].modelos = modelos;
        console.log(autos);
        Search.writeFile(autos);
        res.redirect('/')



        
    }

  

 
    
 
}


module.exports = controller;