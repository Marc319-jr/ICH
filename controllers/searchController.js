let fs = require('fs');
const Search = require('../models/Search');
const { search } = require('../routes/indexRouter');

const controller = {
    byCar: (req,res) => {
        console.log("Vista de todos los autos");
        let autos = Search.findAll();
        res.render('./search/carType' , {'autos': autos}); 
    },

    addCar: (req,res) => {
        console.log("Renderizando a crear una marca");
        res.render('./search/addCar')
    },
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
 
    }
}


module.exports = controller;