let fs = require('fs');
let bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User')

let controller = {
    register: (req,res) => {
        console.log("Renderizando al register");
        res.render("./user/register")
    },
    login: (req,res) => {
        console.log("Renderizando al login");
        res.render("./user/login")
    },
    profile: (req,res) => {
        console.log(req.cookies.userEmail);
        res.render('./user/profile' , {user: req.session.userLogged})
    },
    create: (req,res) => {
        console.log("creando al ususario");
        //validaciones
        const resultValidation = validationResult(req);
        //return res.send(resultValidation.mapped()) convierto al array de errores a un objeto literal
        if(resultValidation.errors.length > 0) //Si es que hay errores es poeque resultsValidation no esta vacio
        {
            console.log("estoy requriendo de algunas validaciones");
            return res.render("./user/register" , {errors: resultValidation.mapped(), oldData: req.body}) //Redirigo a mi usario a la pagina de creacio de usuario para corregir los errores cometidos
        }
        //mas validaciones
        let userInDB = User.findByField('email' , req.body.email)
        if(userInDB) {
            console.log("estoy requriendo la validacion de un usuario que ya existe");
            return res.render("./user/register" ,{ errors: { email: {msg: "este usuario ya existe"} } , oldData: req.body}) 
        }
        
        //creacion del usuarion
        let userTocreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password , 10),
            avatar: req.file ? req.file.filename : 'default',
        }
        console.log("Ya esta todo validado y voy a crear el usuario antes de guardarlo");
        console.log(userTocreate);
        
        User.create(userTocreate);
        res.redirect('/user/login');
        },

        loginProcess : (req,res) => {
            console.log("estoy chekeando quien entra y quien no");
            let userTologin = User.findByField('email' , req.body.email);
            if(userTologin){
                isOk = bcryptjs.compareSync(req.body.password , userTologin.password);
                if(isOk)
                {   
                    req.session.userLogged = userTologin;
                    if(req.body.recordar){
                        res.cookie('userEmail' , req.body.email , {maxAge: 1000 * 60 * 2});
                    }
                    res.render('./user/profile' , {user: req.session.userLogged})
                }   
                else
                {
                    res.render('./user/login' , {errors: { email: {msg: 'las credenciales son iguales'}}})
                }
            }
            res.render('./user/login' , {errors: { email: {msg: 'No existe tal usuario'}}})

        },

        logout: (req,res) => {
            req.session.destroy();
            console.log("Alguine salio");
            console.log(req.session);
            res.redirect("/")
        }

    
}



module.exports = controller;