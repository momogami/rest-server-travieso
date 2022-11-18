
const { Router } = require('express');
const { check } = require('express-validator');


const { crearTrueque } = require('../controllers/trueques');

const router = Router();


router.post('/crearTrueque', crearTrueque );




module.exports = router;