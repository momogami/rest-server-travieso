
const { Router } = require('express');
const { check } = require('express-validator');


const { crearTrueque, agregarCliente } = require('../controllers/trueques');

const router = Router();


router.post('/crearTrueque', crearTrueque );

router.post('/agregarCliente',agregarCliente );




module.exports = router;