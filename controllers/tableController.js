const Tables = require('../models/Tables')
const controller = {
    tech: (req,res) => {
        let techs = Tables.findAll();
        res.render('./tables/table' , {'tabla' : techs})
    },
    editView: (req,res) => {
        let data = Tables.findAll();
        res.render('./tables/edit' , { data })
    }, 


    update: (req,res) => {
        console.log("Alguien quiere modificar una tabla");
        let hours = Tables.findAll();
        //aca tengo que trabajar las variables que llegan desde el body para poder insertar cada dato a su posicion correcta
        
        console.log(req.body);
    }
}


module.exports = controller;