const path = require('path');

const {body} = require('express-validator');
const validations = [
    body('email').notEmpty().withMessage("Tienes que escribir un email"), //Recibe como argumento el nombre del campo que quiero validar. La funcio usa la estructura body(nombre).funcionde valido
    body('password').notEmpty().withMessage("Tienes que escribir una contraseña"),
    body('passcheck').notEmpty().withMessage("Tienes que verificar la contraseña"), 
    body('usertype').notEmpty().withMessage("Tiennes que seleccionar un tipo de ususario"),
    body('imagen').custom((value, {req}) => {
        let file = req.file;
        if(file == undefined)
        {
            throw new Error('Tienes que subir una imagen')
        }
        else{
        let fileExt = path.extname(file.originalname)
        let acceptedExtensions = ['.jpg' , '.png' , '.gif' , '.jpeg'];
        if(!acceptedExtensions.includes(fileExt))
        {
            throw new Error('la extension validas son: ' + acceptedExtensions.join(', '))
        }}
        return true;
    }),
    body('passcheck').custom((value , {req}) => {
        let password = req.body.password;
        let check = req.body.passcheck;
        if(password != check)
        {
            throw new Error('Las contraseñas deben ser iguales')
        }
        return true;
    })
];

module.exports = validations;