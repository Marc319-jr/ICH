const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = require('path');

//configuracion de multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname, '../public/images/avatars'))
    },
    filename: (req,file,callback) => {
        const newFileName = 'usuario-' + Date.now() + path.extname(file.originalname);
        callback(null,newFileName);
    }
});
let fileUpload = multer({storage});
//Fin de la configuracion!

const {body} = require('express-validator'); //llmado al validador de una forma equivalente al check
// De aca mandamos las validaciones al formulario y controlador atravez de la funcion body
const validations = [
    body('email').notEmpty().withMessage("Tienes que escribir un email"), //Recibe como argumento el nombre del campo que quiero validar. La funcio usa la estructura body(nombre).funcionde valido
    body('password').notEmpty().withMessage("Tienes que escribir una contraseña"),
    body('passcheck').notEmpty().withMessage("Tienes que verificar la contraseña"), 
    body('usertype').notEmpty().withMessage("Tiennes que seleccionar un tipo de ususario"),
    body('imagen').custom((value, {req}) => {
        let file = req.file;
        let fileExt = path.extname(file.originalname)
        let acceptedExtensions = ['.jpg' , '.png' , '.gif'];
        if(!file) {
            throw new Error('Tienes que subir una imagen')
        }
        if(!acceptedExtensions.includes(fileExt))
        {
            throw new Error('la extension validas son: ' + acceptedExtensions.join(', '))
        }
        return true;
    })
];

//GETS
router.get('/register',  userController.register);
router.get('/login' , userController.login);

//POST
router.post('/create' , fileUpload.single('imagen'), validations , userController.create);


//PUT


//DELETE



module.exports = router;