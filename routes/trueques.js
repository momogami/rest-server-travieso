
const { Router } = require('express');
const { check } = require('express-validator');


const { crearTrueque, agregarCliente, agregarPremium } = require('../controllers/trueques');

const router = Router();


router.post('/crearTrueque', crearTrueque );

router.post('/agregarCliente',agregarCliente );

router.post('/agregarPremium', agregarPremium );


module.exports = router;