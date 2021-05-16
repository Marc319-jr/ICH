let fs = require('fs');
const controller = {
    byCar: (req,res) => {
        console.log("Vista de todos los autos");
        let archivoAutos = fs.readFileSync('autos.JSON' , {encoding: 'utf-8'});
        let autos;
        if(archivoAutos == "")
        {
            console.log("El archivo autos esta vacio");
            autos = [];
        }
        else
        {
            autos = JSON.parse(archivoAutos);
        }
        res.render('./search/carType' , {'autos': autos}); 
    },

    addCar: (req,res) => {
        console.log("Renderizando a crear una marca");
        res.render('./search/addCar')
    },
    createCar: (req,res) =>{
        console.log("Creando un auto!");
        let archivoAutos = fs.readFileSync('autos.JSON' , {encoding: 'utf-8'});
        let autos;
        let idauto
        if(archivoAutos == "")
        {
            console.log("El archivo autos esta vacio");
            autos = [];
            idauto = 0;
        }
        else
        {
            autos = JSON.parse(archivoAutos);
        }
        let auto = {
            id: idauto,
            nombre : req.body.nombre,
            imagen : req.file.filename,
            modelos : []
        }
        autos.push(auto);
        console.log("Agregue el nuevo auto a la base de datos");
        let autosJSON = JSON.stringify(autos);
        fs.writeFileSync('autos.JSON' , autosJSON);
        res.redirect('./byCar');
 
    }
}


module.exports = controller;