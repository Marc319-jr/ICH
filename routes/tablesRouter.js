const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');


router.get('/techs' , tableController.tech);
router.get('/edit' , tableController.editView);



router.post('/update' , tableController.update);












module.exports = router;