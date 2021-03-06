const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = require('path');
const guestMiddleware = require('../validators/guestMiddleware');
const authMiddleware = require('../validators/authMiddleware');

//configuracion de multer
let multer = require('multer');
let storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname, '../public/images/avatars'))
    },
    filename: (req,file,callback) => {
        const newFileName = 'user-' + Date.now() + path.extname(file.originalname);
        callback(null,newFileName);
    }
});
let fileUpload = multer({storage});
//Fin de la configuracion!

//llmado al validador de una forma equivalente al check
// De aca mandamos las validaciones al formulario y controlador atravez de la funcion body
const validation = require('../validators/userValidator')
//GETS
router.get('/register',guestMiddleware , userController.register);
router.get('/login' , guestMiddleware,userController.login);
router.get('/profile',authMiddleware, userController.profile);
router.get('/logout' , authMiddleware , userController.logout);

//POST
router.post('/create' , fileUpload.single('imagen'), validation , userController.create);
router.post('/login' , userController.loginProcess);


//PUT


//DELETE



module.exports = router;