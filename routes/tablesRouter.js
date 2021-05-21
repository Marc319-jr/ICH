const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');


router.get('/techs' , tableController.tech);












module.exports = router;