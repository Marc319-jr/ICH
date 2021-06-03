const Tables = require('../models/Tables')
const controller = {
    show: (req,res) => {
        let tabla = Tables.findAll(req.query.tableName);
        //res.send("Eligio la tabla de: " + req.query.tableName)
        res.render('./tables/table' , {'tabla' : tabla , 'nombre' : req.query.tableName})
    },

    editView: (req,res) => {
        let data = Tables.findAll(req.query.tableToEdit);
        res.render('./tables/edit' , { data })
    }, 


    update: (req,res) => {
        console.log("Alguien quiere modificar una tabla");
        let hours = Tables.findAll();
        //console.log(hours)
        //aca tengo que trabajar las variables que llegan desde el body para poder insertar cada dato a su posicion correcta
        //console.log("la info que llega es:")
        let array = (Object.values(req.body))
        //console.log(array);
        //console.log("---------------------*------------")
        //array.forEach(element => {console.log(element)})
        let j = hours.length;
        //console.log(j)
        for(let i = 0; i < j;i++)
        {
            for(let k = 0; k<7;k++)
            {
                hours[i].horarios[k] = array[((i*7)+k)]
                //console.log("Insertando: " + array[((i*7)+k)] + " al tech en posicion: " + i + " el horraio del dia: " + k)
            }
        }
        Tables.printFile(hours , 0); //grabando el nuevo contenido
        res.redirect("/tables/techs")

        

        

        
        

        
        
            
    
    }
}


module.exports = controller;