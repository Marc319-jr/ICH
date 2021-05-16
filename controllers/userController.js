let fs = require('fs');
const { validationResult } = require('express-validator');
let controller = {
    register: (req,res) => {
        console.log("Renderizando al register");
        res.render("./user/register")
    },
    login: (req,res) => {
        console.log("Renderizando al login");
        res.render("./user/login")
    },
    create: (req,res) => {
        console.log("creando al ususario");
        console.log(req.body);
        const resultValidation = validationResult(req);
        //return res.send(resultValidation.mapped()) convierto al array de errores a un objeto literal
        if(resultValidation.errors.length > 0) //Si es que hay errores es poeque resultsValidation no esta vacio
        {
            return res.render("./user/register" , {errors: resultValidation.mapped(), oldData: req.body}) //Redirigo a mi usario a la pagina de creacio de usuario para corregir los errores cometidos
        }
        
        //res.send(resultValidation) // => Pasa todo el body.req hacia la ruta dodne recibiran sus reglas de validacion
        let users;
        let archivoUsuario = fs.readFileSync('usuarios.JSON' , {encoding: 'utf-8'});
        if(archivoUsuario == "")
        {
            users = [];
        }
        else
        {
            users = JSON.parse(archivoUsuario);
        }
        let user = {
            id: users.length,
            email : req.body.email,
            password : req.body.password,
            usertyper : req.body.usertype,
            image: req.file ? req.file.filename : '',                 
        }
        console.log(user);
        users.push(user);
        let archivoJSON = JSON.stringify(users)
        fs.writeFileSync('usuarios.JSON' , archivoJSON);
        res.redirect("/")
    
    
    
    
    }
    
}



module.exports = controller;