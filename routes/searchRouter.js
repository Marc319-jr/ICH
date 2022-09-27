const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
//configuracion de multer
const path = require('path');
let multer = require('multer');
let storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname, '../public/images/cars/logos'))
    },
    filename: (req,file,callback) => {
        const newFileName = 'logo-' + Date.now() + path.extname(file.originalname);
        callback(null,newFileName);
    }
});
let fileUpload = multer({storage});
//Fin de la configuracion!





//get
router.get('/byCar' , searchController.byCar);
router.get('/addCar' , searchController.addCar);
router.get('/carMake' , searchController.byCarMake);
router.get('/addModel/:id' ,searchController.addModel)

//post
router.post('/createCar', fileUpload.single('logo'),searchController.createCar);
//put
router.put('/:id' , searchController.createModel);

//delete




module.exports = router;